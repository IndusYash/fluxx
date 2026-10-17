import crypto from "node:crypto";
import { prisma } from "../prisma/client.js";

// Crockford / unambiguous charset: excludes 0, O, 1, I, L to avoid confusing letters
const CHARSET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export function generateRandomCode(length = 6) {
  const bytes = crypto.randomBytes(length);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARSET[bytes[i] % CHARSET.length];
  }
  return result;
}

export async function generateUniqueRegistrationId(maxRetries = 10) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const candidateId = `BBH26-${generateRandomCode(6)}`;
    const existing = await prisma.registration.findUnique({
      where: { registrationId: candidateId },
      select: { id: true },
    });
    if (!existing) {
      return candidateId;
    }
  }
  throw new Error("Failed to generate a unique registration ID after multiple attempts");
}

