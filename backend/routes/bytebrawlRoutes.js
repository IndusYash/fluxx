import express from "express";
import rateLimit from "express-rate-limit";
import ByteBrawlRegistration from "../models/bytebrawlModel.js";
import { bytebrawlRegistrationSchema } from "../validation/bytebrawlSchema.js";
import { generateUniqueRegistrationId } from "../utils/idGenerator.js";
import { BYTEBRAWL_CONFIG, getEventStatus } from "../config/bytebrawlConfig.js";
import { sendPersonalizedSuccessEmail, lastSentEmails } from "../utils/mailer.js";
import { validateEmail } from "../utils/emailValidator.js";
import { validateIndianPhone } from "../utils/phoneValidator.js";
import { sendEmailOtp, verifyEmailOtp, verifyEmailToken, lastGeneratedOtps, otpStore } from "../utils/otpService.js";

const router = express.Router();

// Strict rate limiter for registration endpoint (~10 requests per minute per IP in production)
const registerRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 30 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many registration attempts from this IP. Please try again after 1 minute.",
  },
  statusCode: 429,
});

// Rate limiter for sending OTP (max 10 requests per 10 minutes per IP in production)
const otpSendRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 30 : 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many verification requests from this network. Please wait a few minutes.",
  },
  statusCode: 429,
});

// Development-only test helpers (strictly disabled in production)
if (process.env.NODE_ENV !== "production") {
  router.get("/dev-otp", (req, res) => {
    const email = String(req.query.email || "").trim().toLowerCase();
    const code = lastGeneratedOtps.get(email);
    return res.json({ code: code || null });
  });

  router.get("/dev-emails", (req, res) => {
    return res.json({ emails: lastSentEmails });
  });

  router.post("/dev-reset", (req, res) => {
    lastGeneratedOtps.clear();
    otpStore.clear();
    lastSentEmails.length = 0;
    return res.json({ reset: true });
  });
}

/**
 * GET /api/events/bytebrawl-hacktoberfest/status
 * Returns registration status: open, closesAt, capacity, registeredCount
 */
router.get("/status", async (req, res) => {
  try {
    const status = await getEventStatus();
    return res.status(200).json(status);
  } catch (error) {
    console.error("Error fetching event status:", error.message || error);
    return res.status(500).json({
      error: "Failed to determine registration status",
    });
  }
});

/**
 * GET /api/events/bytebrawl-hacktoberfest/check-team-name?name=...
 * Live check whether a team name is already taken
 */
router.get("/check-team-name", async (req, res) => {
  try {
    const name = String(req.query.name || "").trim();
    if (!name || name.length < 2) {
      return res.status(400).json({ available: false, error: "Team name must be at least 2 characters" });
    }

    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const existingTeam = await ByteBrawlRegistration.findOne({
      eventSlug: BYTEBRAWL_CONFIG.slug,
      teamName: { $regex: new RegExp(`^${escapedName}$`, "i") },
    }).select("_id");

    if (existingTeam) {
      return res.status(200).json({ available: false, message: "Team name is already taken" });
    }

    return res.status(200).json({ available: true, message: "Team name is available" });
  } catch (error) {
    console.error("Error checking team name:", error.message || error);
    return res.status(500).json({ error: "Failed to check team name availability" });
  }
});

/**
 * POST /api/events/bytebrawl-hacktoberfest/check-email
 * Validates email format, disposable domain, MX records, and returns typo hints
 */
router.post("/check-email", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim();
    const result = await validateEmail(email);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error checking email:", error.message || error);
    return res.status(500).json({ valid: false, error: "Failed to validate email address" });
  }
});

/**
 * POST /api/events/bytebrawl-hacktoberfest/send-otp
 * Sends 6-digit verification code to email (max 3/hour per email)
 */
router.post("/send-otp", otpSendRateLimiter, async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    // First validate email format, MX and disposable check
    const validation = await validateEmail(email);
    if (!validation.valid) {
      return res.status(422).json({
        error: validation.error,
        typoHint: validation.typoHint,
        email,
      });
    }

    const sendResult = await sendEmailOtp(email);
    if (!sendResult.success) {
      if (sendResult.isServerError) {
        return res.status(503).json({
          error: sendResult.error,
          isServerError: true,
          email,
        });
      }
      const isRateLimit = sendResult.error?.toLowerCase().includes("rate limit");
      return res.status(isRateLimit ? 429 : 422).json({
        error: sendResult.error,
        email,
        typoHint: validation.typoHint,
      });
    }

    const smtpConfigured = Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    );

    return res.status(200).json({
      success: true,
      message: smtpConfigured
        ? sendResult.message
        : "SMTP credentials not configured in backend/.env. Simulated OTP logged to server terminal.",
      typoHint: validation.typoHint,
      smtpConfigured,
      ...(process.env.NODE_ENV !== "production" && !smtpConfigured
        ? { devOtp: sendResult.code }
        : {}),
    });
  } catch (error) {
    console.error("Error sending OTP:", error.message || error);
    return res.status(500).json({ error: "Failed to send verification code" });
  }
});

/**
 * POST /api/events/bytebrawl-hacktoberfest/verify-otp
 * Verifies 6-digit OTP code and returns a 30-minute HMAC signed token bound to that email
 */
router.post("/verify-otp", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const code = String(req.body?.code || "").trim();

    if (!email || !code) {
      return res.status(400).json({ error: "Email and verification code are required" });
    }

    const result = verifyEmailOtp(email, code);
    if (!result.success) {
      return res.status(400).json({
        error: result.error,
        locked: result.locked || false,
      });
    }

    return res.status(200).json({
      success: true,
      token: result.token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error.message || error);
    return res.status(500).json({ error: "Failed to verify code" });
  }
});

/**
 * POST /api/events/bytebrawl-hacktoberfest/register
 * Single transaction registration for Team or Individual with verified emails
 */
router.post("/register", registerRateLimiter, async (req, res) => {
  // Prevent caching of personal data responses
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  try {
    // 1. Check if event registration is still open (deadline / capacity)
    const status = await getEventStatus();
    if (!status.open) {
      return res.status(410).json({
        error: status.message || "Registrations are closed for this event",
        open: false,
        closesAt: status.closesAt,
      });
    }

    // 2. Honeypot check (hidden field)
    if (req.body?.hp_website) {
      return res.status(422).json({
        error: "Bot activity detected",
      });
    }

    // 3. Schema validation with Zod
    const parseResult = bytebrawlRegistrationSchema.safeParse(req.body);
    if (!parseResult.success) {
      const fieldErrors = {};
      parseResult.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      return res.status(422).json({
        error: "Validation failed",
        fieldErrors,
        details: parseResult.error.format(),
      });
    }

    const data = parseResult.data;
    const isTeam = data.type === "TEAM";

    // 4. Verify email ownership tokens (HMAC verification)
    const p1TokenResult = verifyEmailToken(data.participant1.email, data.participant1.verificationToken);
    if (!p1TokenResult.valid) {
      return res.status(422).json({
        error: "Email verification failed",
        fieldErrors: {
          "participant1.email": "Email must be verified via OTP before registration",
        },
      });
    }

    if (isTeam && data.participant2) {
      const p2TokenResult = verifyEmailToken(data.participant2.email, data.participant2.verificationToken);
      if (!p2TokenResult.valid) {
        return res.status(422).json({
          error: "Teammate email verification failed",
          fieldErrors: {
            "participant2.email": "Teammate email must be verified via OTP before registration",
          },
        });
      }
    }

    // 5. Additional Server-side strict phone checks
    const p1PhoneVal = validateIndianPhone(data.participant1.mobile);
    if (!p1PhoneVal.valid) {
      return res.status(422).json({
        error: "Invalid phone number",
        fieldErrors: { "participant1.mobile": p1PhoneVal.error },
      });
    }

    if (isTeam && data.participant2) {
      const p2PhoneVal = validateIndianPhone(data.participant2.mobile);
      if (!p2PhoneVal.valid) {
        return res.status(422).json({
          error: "Invalid teammate phone number",
          fieldErrors: { "participant2.mobile": p2PhoneVal.error },
        });
      }
    }

    // 6. Duplicate checks - privacy safe: error says ONLY "already registered"
    // 6. Duplicate checks - privacy safe: error says ONLY "already registered"
    if (data.teamName) {
      const cleanTeamName = data.teamName.trim();
      const escapedTeam = cleanTeamName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const existingTeam = await ByteBrawlRegistration.findOne({
        eventSlug: BYTEBRAWL_CONFIG.slug,
        teamName: { $regex: new RegExp(`^${escapedTeam}$`, "i") },
      }).select("_id");

      if (existingTeam) {
        return res.status(409).json({
          error: "Duplicate registration",
          fieldErrors: {
            teamName: "This team name is already registered",
          },
        });
      }
    }

    const p1Roll = data.participant1.rollNumber.toUpperCase();
    const p1Email = data.participant1.email.toLowerCase();
    const p2Roll = isTeam && data.participant2 ? data.participant2.rollNumber.toUpperCase() : null;
    const p2Email = isTeam && data.participant2 ? data.participant2.email.toLowerCase() : null;

    // Check P1 roll
    const existingP1Roll = await ByteBrawlRegistration.findOne({
      eventSlug: BYTEBRAWL_CONFIG.slug,
      "participants.rollNumber": p1Roll,
    }).select("_id");
    if (existingP1Roll) {
      return res.status(409).json({
        error: "Duplicate registration",
        fieldErrors: {
          "participant1.rollNumber": "This roll number is already registered",
        },
      });
    }

    // Check P1 email
    const existingP1Email = await ByteBrawlRegistration.findOne({
      eventSlug: BYTEBRAWL_CONFIG.slug,
      "participants.email": p1Email,
    }).select("_id");
    if (existingP1Email) {
      return res.status(409).json({
        error: "Duplicate registration",
        fieldErrors: {
          "participant1.email": "This email address is already registered",
        },
      });
    }

    // Check P2 if Team
    if (isTeam && p2Roll && p2Email) {
      const existingP2Roll = await ByteBrawlRegistration.findOne({
        eventSlug: BYTEBRAWL_CONFIG.slug,
        "participants.rollNumber": p2Roll,
      }).select("_id");
      if (existingP2Roll) {
        return res.status(409).json({
          error: "Duplicate registration",
          fieldErrors: {
            "participant2.rollNumber": "This roll number is already registered",
          },
        });
      }

      const existingP2Email = await ByteBrawlRegistration.findOne({
        eventSlug: BYTEBRAWL_CONFIG.slug,
        "participants.email": p2Email,
      }).select("_id");
      if (existingP2Email) {
        return res.status(409).json({
          error: "Duplicate registration",
          fieldErrors: {
            "participant2.email": "This email address is already registered",
          },
        });
      }
    }

    // 7. Generate Unique Registration ID with collision retry
    const registrationId = await generateUniqueRegistrationId();

    // 8. Assemble participants data
    const participantsToCreate = [
      {
        role: isTeam ? "LEADER" : "INDIVIDUAL",
        fullName: data.participant1.fullName.trim(),
        rollNumber: p1Roll,
        branch: data.participant1.branch,
        year: data.participant1.year,
        mobile: p1PhoneVal.normalized,
        email: p1Email,
      },
    ];

    if (isTeam && data.participant2) {
      const p2PhoneVal = validateIndianPhone(data.participant2.mobile);
      participantsToCreate.push({
        role: "MEMBER",
        fullName: data.participant2.fullName.trim(),
        rollNumber: p2Roll,
        branch: data.participant2.branch,
        year: data.participant2.year,
        mobile: p2PhoneVal.normalized,
        email: p2Email,
      });
    }

    // 9. Execute creation in MongoDB
    const newRegistration = await ByteBrawlRegistration.create({
      registrationId,
      eventSlug: BYTEBRAWL_CONFIG.slug,
      type: data.type,
      teamName: data.teamName ? data.teamName.trim() : null,
      agreedRules: data.agreedRules,
      confirmedDetails: data.confirmedDetails,
      status: "CONFIRMED",
      participants: participantsToCreate,
    });

    // 10. Send personalized success email to EACH participant
    await Promise.allSettled(
      newRegistration.participants.map(async (participant) => {
        try {
          const sendResult = await sendPersonalizedSuccessEmail({
            participantName: participant.fullName,
            recipientEmail: participant.email,
            registrationId: newRegistration.registrationId,
            type: newRegistration.type,
            teamName: newRegistration.teamName,
            allParticipants: newRegistration.participants,
          });
          if (sendResult && !sendResult.success) {
            console.error(
              `[Mailer] Confirmation email failed for ${participant.email}:`,
              sendResult.error
            );
          } else {
            console.log(
              `[Mailer] Confirmation email delivered to ${participant.email} for ${newRegistration.registrationId}`
            );
          }
          return sendResult;
        } catch (err) {
          console.error(
            `[Mailer] Background confirmation mail error for ${participant.email}:`,
            err.message || err
          );
          return { success: false, error: err.message };
        }
      })
    );

    // 11. Return 201 Created (never leak internal sensitive fields)
    return res.status(201).json({
      success: true,
      registrationId: newRegistration.registrationId,
      type: newRegistration.type,
      teamName: newRegistration.teamName,
      participants: newRegistration.participants.map((p) => ({
        fullName: p.fullName,
        role: p.role,
        branch: p.branch,
        year: p.year,
        rollNumber: p.rollNumber,
      })),
      message: "Registration completed successfully",
    });
  } catch (error) {
    if (error.code === 11000 || error.code === "P2002") {
      return res.status(409).json({
        error: "Duplicate registration",
        fieldErrors: {
          details: "A registration with these details is already registered",
        },
      });
    }

    console.error("Registration error occurred:", error.message || error);
    return res.status(500).json({
      error: "An internal server error occurred while processing registration",
    });
  }
});

export default router;
