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

const KNOWN_VALID_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "icloud.com",
  "mmmut.ac.in",
]);

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

  // 1. Check Typo Hint & Reject common typos
  if (COMMON_TYPOS[domain]) {
    const typoHint = `Did you mean ${parts[0]}@${COMMON_TYPOS[domain]}?`;
    return {
      valid: false,
      error: `Wrong email domain "@${domain}". ${typoHint}`,
      domain,
      typoHint,
    };
  }

  // 2. Check Disposable Email
  if (disposableSet.has(domain)) {
    return {
      valid: false,
      error: `Wrong email: disposable email addresses are not permitted`,
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

  // 4. Known major email domains skip external DNS check
  if (KNOWN_VALID_DOMAINS.has(domain)) {
    return { valid: true, domain };
  }

  // 5. MX DNS Lookup with OS resolver fallback
  if (!skipMx && process.env.NODE_ENV !== "test-skip-mx") {
    // If it's a test domain like test.local or localhost, allow in test
    if (domain === "test.local" || domain === "example.com" || domain.endsWith(".test")) {
      return { valid: true, domain };
    }

    try {
      const records = await dns.resolveMx(domain);
      if (records && records.length > 0) {
        return { valid: true, domain };
      }
      return {
        valid: false,
        error: `Domain "@${domain}" does not have valid mail exchange (MX) servers`,
        domain,
      };
    } catch (err) {
      if (err.code === "ENOTFOUND" || err.code === "NODATA") {
        return {
          valid: false,
          error: `Domain "@${domain}" does not exist or has no mail servers`,
          domain,
        };
      }
      // If resolveMx encountered connection refused (e.g. UDP port 53 restricted on host), fallback to OS resolver
      try {
        await dns.lookup(domain);
        return { valid: true, domain };
      } catch (lookupErr) {
        if (lookupErr.code === "ENOTFOUND") {
          return {
            valid: false,
            error: `Domain "@${domain}" does not exist`,
            domain,
          };
        }
        return {
          valid: false,
          error: `Unable to verify domain "@${domain}"`,
          domain,
        };
      }
    }
  }

  return { valid: true, domain };
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

