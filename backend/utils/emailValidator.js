import dns from "node:dns/promises";
import disposableDomainsArray from "disposable-email-domains" with { type: "json" };

const disposableSet = new Set(disposableDomainsArray);

const COMMON_TYPOS = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmaill.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "mmut.ac.in": "mmmut.ac.in",
};

/**
 * Validates email format, disposable check, allowed domains, typo check, and MX lookup
 * @param {string} email
 * @param {object} options
 * @param {boolean} [options.skipMx] Skip MX check (useful for mock testing)
 * @returns {Promise<{ valid: boolean, error?: string, typoHint?: string, domain?: string }>}
 */
export async function validateEmail(email, { skipMx = false } = {}) {
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email is required" };
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: "Invalid email format" };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { valid: false, error: "Invalid email structure" };
  }

  const domain = parts[1];

  // 1. Check Typo Hint
  let typoHint = null;
  if (COMMON_TYPOS[domain]) {
    typoHint = `Did you mean ${parts[0]}@${COMMON_TYPOS[domain]}?`;
  }

  // 2. Check Disposable Email
  if (disposableSet.has(domain)) {
    return {
      valid: false,
      error: "Disposable email addresses are not permitted",
      domain,
    };
  }

  // 3. Check Allowed Domains from Env
  const allowedEnv = process.env.ALLOWED_EMAIL_DOMAINS;
  if (allowedEnv && allowedEnv.trim()) {
    const allowedList = allowedEnv
      .split(",")
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);
    if (allowedList.length > 0 && !allowedList.includes(domain)) {
      return {
        valid: false,
        error: `Only emails from allowed domains (${allowedList.join(", ")}) are permitted`,
        domain,
      };
    }
  }

  // 4. MX DNS Lookup
  if (!skipMx && process.env.NODE_ENV !== "test-skip-mx") {
    // If it's a test domain like test.local or localhost, allow in test
    if (domain === "test.local" || domain === "example.com" || domain.endsWith(".test")) {
      return { valid: true, domain, typoHint };
    }

    try {
      const records = await dns.resolveMx(domain);
      if (!records || records.length === 0) {
        return {
          valid: false,
          error: typoHint || "Domain does not have valid mail exchange (MX) servers",
          domain,
          typoHint,
        };
      }
    } catch (err) {
      return {
        valid: false,
        error: typoHint || "Unable to verify mail exchange records for this domain (no MX records)",
        domain,
        typoHint,
      };
    }
  }

  return { valid: true, domain, typoHint };
}

/**
 * Returns typo suggestion if common typo found
 */
export function checkEmailTypo(email) {
  if (!email || !email.includes("@")) return null;
  const parts = email.trim().toLowerCase().split("@");
  const domain = parts[1];
  if (COMMON_TYPOS[domain]) {
    return `Did you mean ${parts[0]}@${COMMON_TYPOS[domain]}?`;
  }
  return null;
}

