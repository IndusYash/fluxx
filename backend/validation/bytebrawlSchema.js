import { z } from "zod";
import { validateIndianPhone } from "../utils/phoneValidator.js";

// Check if domain is allowed when ALLOWED_EMAIL_DOMAINS is defined
const isAllowedEmailDomain = (email) => {
  const allowed = process.env.ALLOWED_EMAIL_DOMAINS;
  if (!allowed || !allowed.trim()) return true;
  const domains = allowed
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  if (domains.length === 0) return true;
  const domain = email.split("@")[1]?.toLowerCase();
  return domains.includes(domain);
};

export const VALID_BRANCHES = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "CE",
  "CHE",
  "BBA",
  "Other",
];

export const VALID_YEARS = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

const nameRegex = /^[a-zA-Z\s.-]{2,60}$/;
const rollNumberRegex = /^[A-Za-z0-9]{6,14}$/;

// Participant Sub-schema
export const participantSchema = z
  .object({
    fullName: z
      .string({ required_error: "Full name is required" })
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(60, "Full name cannot exceed 60 characters")
      .regex(nameRegex, "Full name can only contain letters, spaces, dots, and hyphens"),
    rollNumber: z
      .string({ required_error: "Roll number is required" })
      .trim()
      .transform((val) => val.toUpperCase())
      .pipe(
        z
          .string()
          .regex(rollNumberRegex, "Roll number must be 6-14 alphanumeric characters")
      ),
    branch: z
      .string({ required_error: "Branch is required" })
      .trim()
      .transform((val) => {
        const upper = val.toUpperCase();
        if (upper === "CHEMICAL" || upper === "CHE") return "CHE";
        if (upper === "BIOTECH" || upper === "BIOTECHNOLOGY" || upper === "BBA") return "BBA";
        return val;
      })
      .refine((b) => VALID_BRANCHES.includes(b), {
        message: "Please select a valid branch",
      }),
    year: z
      .string({ required_error: "Year of study is required" })
      .refine(
        (y) =>
          VALID_YEARS.includes(y) ||
          ["1st", "2nd", "3rd", "4th"].includes(y),
        {
          message: "Please select a valid year of study",
        }
      )
      .transform((y) => (y.endsWith("Year") ? y : `${y} Year`)),
    mobile: z
      .string({ required_error: "Mobile number is required" })
      .trim()
      .superRefine((val, ctx) => {
        const result = validateIndianPhone(val);
        if (!result.valid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: result.error || "Please enter a valid 10-digit Indian mobile number",
          });
        }
      }),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .refine(isAllowedEmailDomain, {
        message: "Email domain is not authorized for this event",
      }),
    collegeName: z
      .string()
      .trim()
      .max(120, "College name cannot exceed 120 characters")
      .optional()
      .or(z.literal("")),
    address: z
      .string()
      .trim()
      .max(250, "Address cannot exceed 250 characters")
      .optional()
      .or(z.literal("")),
    verificationToken: z
      .string({ required_error: "Email verification is required. Please click Verify to receive an OTP." })
      .min(10, "Email must be verified with OTP before submitting"),
  })
  .strict();

export const bytebrawlRegistrationSchema = z
  .object({
    type: z.enum(["TEAM", "INDIVIDUAL"], {
      required_error: "Registration type is required",
    }),
    teamName: z
      .string({ required_error: "Team name is required" })
      .trim()
      .min(2, "Team name must be at least 2 characters")
      .max(40, "Team name cannot exceed 40 characters"),
    participant1: participantSchema,
    participant2: participantSchema.optional().nullable(),
    agreedRules: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the event rules and regulations",
      }),
    }),
    confirmedDetails: z.boolean().optional().default(true),
    hp_website: z
      .string()
      .max(0, "Bot submission detected")
      .optional()
      .nullable(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (!data.teamName || data.teamName.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["teamName"],
        message: "Team name is required (2-40 characters)",
      });
    }

    if (data.type === "TEAM") {
      if (!data.participant2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["participant2"],
          message: "Participant 2 details are required for team registration",
        });
      } else {
        // Within-team uniqueness checks
        if (
          data.participant1.rollNumber.toUpperCase() ===
          data.participant2.rollNumber.toUpperCase()
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant2", "rollNumber"],
            message: "Teammate cannot have the same roll number as Team Leader",
          });
        }

        if (
          data.participant1.email.toLowerCase() ===
          data.participant2.email.toLowerCase()
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant2", "email"],
            message: "Teammate cannot have the same email address as Team Leader",
          });
        }

        const p1Mobile = data.participant1.mobile.replace(/\D/g, "").slice(-10);
        const p2Mobile = data.participant2.mobile.replace(/\D/g, "").slice(-10);
        if (p1Mobile === p2Mobile) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["participant2", "mobile"],
            message: "Teammate cannot have the same mobile number as Team Leader",
          });
        }
      }
    } else {
      // INDIVIDUAL registration: participant2 must NOT be provided
      if (data.participant2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["participant2"],
          message: "Individual registrations cannot include a second participant",
        });
      }
    }
  });
