import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Normalizes and strictly validates Indian mobile numbers
 * @param {string} phone
 * @returns {{ valid: boolean, normalized?: string, error?: string }}
 */
export function validateIndianPhone(phone) {
  if (!phone || typeof phone !== "string") {
    return { valid: false, error: "Mobile number is required" };
  }

  // Strip spaces, dashes, dots, parentheses
  let clean = phone.trim().replace(/[\s\-().]/g, "");

  // Remove leading 0 or +91 / 91 if present
  if (clean.startsWith("+91")) {
    clean = clean.slice(3);
  } else if (clean.startsWith("91") && clean.length === 12) {
    clean = clean.slice(2);
  } else if (clean.startsWith("0") && clean.length === 11) {
    clean = clean.slice(1);
  }

  // Must be exactly 10 digits
  if (!/^\d{10}$/.test(clean)) {
    return { valid: false, error: "Mobile number must be a 10-digit Indian number" };
  }

  // Must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(clean)) {
    return { valid: false, error: "Indian mobile numbers must start with 6, 7, 8, or 9" };
  }

  // Validate with libphonenumber-js
  const parsed = parsePhoneNumberFromString(clean, "IN");
  if (!parsed || !parsed.isValid()) {
    return { valid: false, error: "Please provide a valid Indian mobile number" };
  }

  // Detect fake patterns:
  // 1. All same digits (e.g. 9999999999, 8888888888)
  if (/^(\d)\1{9}$/.test(clean)) {
    return { valid: false, error: "Fake or test phone number detected (all same digits)" };
  }

  // 2. Sequential numbers forward / backward
  const sequentialPatterns = [
    "1234567890",
    "0123456789",
    "9876543210",
    "8765432109",
    "6789012345",
  ];
  if (sequentialPatterns.includes(clean)) {
    return { valid: false, error: "Fake or test phone number detected (sequential digits)" };
  }

  // 3. Repeated 2-digit pairs (e.g. 9898989898, 9191919191, 7878787878)
  const pair = clean.slice(0, 2);
  if (clean === pair.repeat(5)) {
    return { valid: false, error: "Fake phone number detected (repeated pattern)" };
  }

  // 4. Repeated 5-digit halves (e.g. 9876598765)
  if (clean.slice(0, 5) === clean.slice(5, 10)) {
    return { valid: false, error: "Fake phone number detected (repeated halves)" };
  }

  // 5. Excessive repeated trailing digits (e.g. 9800000000 or 9999999900)
  if (/^(\d)\1{7,}/.test(clean) || /(\d)\1{7,}$/.test(clean)) {
    return { valid: false, error: "Invalid mobile number (too many repeated digits)" };
  }

  return { valid: true, normalized: clean };
}

