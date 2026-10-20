import crypto from "node:crypto";
import { sendOtpEmail } from "./mailer.js";

// In-memory store for OTPs:
// Key: email (lowercased) -> { code, expiresAt, attempts, sendTimestamps: number[], locked: boolean }
export const otpStore = new Map();

// In-memory test helper: stores last OTPs generated
export const lastGeneratedOtps = new Map();

function getSecret() {
  return process.env.OTP_SECRET || process.env.JWT_SECRET || "flux-otp-signing-secret-2026";
}

/**
 * Generate a random 6-digit numeric string
 */
function generate6DigitCode() {
  return String(crypto.randomInt(100000, 999999));
}

/**
 * Sign an email verification token with HMAC-SHA256
 * @param {string} email
 * @returns {string} token
 */
export function createVerificationToken(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const payload = {
    email: normalizedEmail,
    exp: Date.now() + 30 * 60 * 1000, // 30 minutes
    iat: Date.now(),
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payloadStr)
    .digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Verify HMAC verification token bound to an email
 * @param {string} email
 * @param {string} token
 * @returns {{ valid: boolean, error?: string }}
 */
export function verifyEmailToken(email, token) {
  if (!token || typeof token !== "string") {
    return { valid: false, error: "Missing email verification token" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, error: "Malformed verification token" };
  }

  const [payloadStr, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadStr)
    .digest("base64url");

  if (signature !== expectedSig) {
    return { valid: false, error: "Invalid verification token signature" };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    const normalizedEmail = email.trim().toLowerCase();

    if (payload.email !== normalizedEmail) {
      return { valid: false, error: "Verification token does not match email" };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, error: "Verification token has expired (30m limit)" };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: "Failed to decode verification token" };
  }
}

/**
 * Sends or generates an OTP for an email
 * @param {string} email
 * @returns {Promise<{ success: boolean, message?: string, error?: string, remainingAttempts?: number }>}
 */
export async function sendEmailOtp(email) {
  const normalized = email.trim().toLowerCase();
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  let record = otpStore.get(normalized);
  if (!record) {
    record = {
      code: "",
      expiresAt: 0,
      attempts: 0,
      sendTimestamps: [],
      locked: false,
    };
    otpStore.set(normalized, record);
  }

  // Filter timestamps from the last 1 hour
  record.sendTimestamps = record.sendTimestamps.filter((t) => t > oneHourAgo);

  // Check rate limit: max 3 sends per hour per email
  if (record.sendTimestamps.length >= 3) {
    return {
      success: false,
      error: "Rate limit exceeded. Maximum 3 verification codes per hour for this email.",
    };
  }

  // Generate new 6-digit code
  const code = generate6DigitCode();
  record.code = code;
  record.expiresAt = now + 10 * 60 * 1000; // valid for 10 minutes
  record.attempts = 0;
  record.locked = false;
  record.sendTimestamps.push(now);

  // Store in test helper map
  lastGeneratedOtps.set(normalized, code);

  console.log(`[OTP] Generated 6-digit OTP for ${normalized}: ${code} (expires in 10m)`);

  // Dispatch via email
  try {
    const mailResult = await sendOtpEmail({
      recipientEmail: normalized,
      otpCode: code,
    });
    if (mailResult && mailResult.success === false) {
      console.warn(`[OTP] Mailer dispatch failed for ${normalized}: ${mailResult.error}`);
      const errStr = (mailResult.error || "").toLowerCase();
      const isAuthOrConfigError =
        errStr.includes("535") ||
        errStr.includes("badcredentials") ||
        errStr.includes("username and password not accepted") ||
        errStr.includes("eauth") ||
        errStr.includes("econnrefused") ||
        errStr.includes("etimedout") ||
        errStr.includes("timeout") ||
        errStr.includes("connection closed");

      if (isAuthOrConfigError) {
        return {
          success: false,
          isServerError: true,
          error: "Verification email service is temporarily unavailable. Please try again shortly or contact support.",
        };
      }

      return {
        success: false,
        isEmailError: true,
        error: `Could not send verification email to this address (${mailResult.error || "delivery failed"}). Please check the email address.`,
      };
    }
  } catch (err) {
    console.warn(`[OTP] Mailer dispatch exception for ${normalized}: ${err.message}`);
    return {
      success: false,
      isServerError: true,
      error: "Verification email service is temporarily unavailable. Please try again shortly.",
    };
  }

  return {
    success: true,
    code,
    message: "A 6-digit verification code has been sent to your email.",
  };
}

/**
 * Verifies the 6-digit OTP for an email and returns the signed token
 * @param {string} email
 * @param {string} code
 * @returns {{ success: boolean, token?: string, error?: string, locked?: boolean }}
 */
export function verifyEmailOtp(email, code) {
  const normalized = email.trim().toLowerCase();
  const record = otpStore.get(normalized);

  if (!record || !record.code) {
    return { success: false, error: "No OTP was requested for this email. Please request a new code." };
  }

  if (record.locked) {
    return {
      success: false,
      locked: true,
      error: "This code is locked due to 5 incorrect attempts. Please request a new verification code.",
    };
  }

  if (Date.now() > record.expiresAt) {
    return { success: false, error: "The verification code has expired. Please request a new one." };
  }

  const cleanCode = String(code).trim();
  if (cleanCode !== record.code) {
    record.attempts += 1;
    const remaining = 5 - record.attempts;
    if (record.attempts >= 5) {
      record.locked = true;
      return {
        success: false,
        locked: true,
        error: "Too many incorrect attempts. Code is locked. Please request a new verification code.",
      };
    }
    return {
      success: false,
      error: `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
    };
  }

  // Success! Invalidate OTP to prevent replay
  record.code = "";
  record.expiresAt = 0;
  record.attempts = 0;

  // Create HMAC signed 30-minute token
  const token = createVerificationToken(normalized);
  return {
    success: true,
    token,
  };
}

