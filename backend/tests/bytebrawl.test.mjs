import assert from "node:assert/strict";
import http from "node:http";
import ByteBrawlRegistration from "../models/bytebrawlModel.js";
import { bytebrawlRegistrationSchema } from "../validation/bytebrawlSchema.js";
import { createVerificationToken } from "../utils/otpService.js";
import app, { connectDB } from "../brain.js";
import { BYTEBRAWL_CONFIG } from "../config/bytebrawlConfig.js";

async function runTests() {
  console.log("=== STARTING BYTEBRAWL AUTOMATED TEST SUITE ===\n");
  let passedCount = 0;
  let failedCount = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  PASS: ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`  FAIL: ${name}`);
      console.error("   ", err.message || err);
      failedCount++;
    }
  }

  // Clear test data for clean slate
  try {
    await connectDB();
    await ByteBrawlRegistration.deleteMany({
      eventSlug: BYTEBRAWL_CONFIG.slug,
    });
  } catch (err) {
    console.warn("Notice: Test cleanup skipped:", err.message);
  }

  // ─────────────────────────────────────────────────────────────
  // 1. VALIDATION SCHEMA UNIT TESTS
  // ─────────────────────────────────────────────────────────────
  console.log("Section 1: Validation Schema Tests");

  await test("Valid Team Registration Schema passes", () => {
    const payload = {
      type: "TEAM",
      teamName: "Kernel Panic",
      participant1: {
        fullName: "Aarav Sharma",
        rollNumber: "2024CSE001",
        branch: "CSE",
        year: "3rd Year",
        mobile: "9876512345",
        email: "aarav@mmmut.ac.in",
        verificationToken: createVerificationToken("aarav@mmmut.ac.in"),
      },
      participant2: {
        fullName: "Ananya Gupta",
        rollNumber: "2024CSE002",
        branch: "IT",
        year: "3rd Year",
        mobile: "+91 9876543211",
        email: "ananya@mmmut.ac.in",
        verificationToken: createVerificationToken("ananya@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, true, "Schema should accept valid team");
  });

  await test("Valid Individual Registration Schema passes", () => {
    const payload = {
      type: "INDIVIDUAL",
      teamName: "Rohan Verma (Individual)",
      participant1: {
        fullName: "Rohan Verma",
        rollNumber: "2024ECE045",
        branch: "ECE",
        year: "2nd Year",
        mobile: "8765412345",
        email: "rohan@mmmut.ac.in",
        verificationToken: createVerificationToken("rohan@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, true, "Schema should accept valid individual");
  });

  await test("Branch validation accepts CHE and BBA", () => {
    const payloadChe = {
      type: "INDIVIDUAL",
      teamName: "Che Individual",
      participant1: {
        fullName: "Karan Singh",
        rollNumber: "2024CHE011",
        branch: "CHE",
        year: "2nd Year",
        mobile: "9123456789",
        email: "karan@mmmut.ac.in",
        verificationToken: createVerificationToken("karan@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const resChe = bytebrawlRegistrationSchema.safeParse(payloadChe);
    assert.strictEqual(resChe.success, true, "Schema should accept CHE branch");

    const payloadBba = {
      type: "INDIVIDUAL",
      teamName: "BBA Individual",
      participant1: {
        fullName: "Sneha Patel",
        rollNumber: "2024BBA022",
        branch: "BBA",
        year: "1st Year",
        mobile: "9123456780",
        email: "sneha@mmmut.ac.in",
        verificationToken: createVerificationToken("sneha@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const resBba = bytebrawlRegistrationSchema.safeParse(payloadBba);
    assert.strictEqual(resBba.success, true, "Schema should accept BBA branch");
  });

  await test("Team Registration without teamName fails validation (422)", () => {
    const payload = {
      type: "TEAM",
      participant1: {
        fullName: "Aarav Sharma",
        rollNumber: "2024CSE001",
        branch: "CSE",
        year: "3rd Year",
        mobile: "9876512345",
        email: "aarav@mmmut.ac.in",
        verificationToken: createVerificationToken("aarav@mmmut.ac.in"),
      },
      participant2: {
        fullName: "Ananya Gupta",
        rollNumber: "2024CSE002",
        branch: "IT",
        year: "3rd Year",
        mobile: "9876543211",
        email: "ananya@mmmut.ac.in",
        verificationToken: createVerificationToken("ananya@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
    const hasTeamNameIssue = res.error.issues.some((i) =>
      i.path.includes("teamName")
    );
    assert.strictEqual(hasTeamNameIssue, true);
  });

  await test("Same roll number twice in one team fails validation", () => {
    const payload = {
      type: "TEAM",
      teamName: "Dupe Duo",
      participant1: {
        fullName: "Aarav Sharma",
        rollNumber: "2024CSE001",
        branch: "CSE",
        year: "3rd Year",
        mobile: "9876512345",
        email: "aarav1@mmmut.ac.in",
        verificationToken: createVerificationToken("aarav1@mmmut.ac.in"),
      },
      participant2: {
        fullName: "Clone Sharma",
        rollNumber: "2024CSE001",
        branch: "CSE",
        year: "3rd Year",
        mobile: "9876543211",
        email: "aarav2@mmmut.ac.in",
        verificationToken: createVerificationToken("aarav2@mmmut.ac.in"),
      },
      agreedRules: true,
      confirmedDetails: true,
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
    const hasRollIssue = res.error.issues.some(
      (i) => i.path.includes("participant2") && i.path.includes("rollNumber")
    );
    assert.strictEqual(hasRollIssue, true);
  });

  await test("Missing agreements fails validation", () => {
    const payload = {
      type: "INDIVIDUAL",
      participant1: {
        fullName: "Rohan Verma",
        rollNumber: "2024ECE045",
        branch: "ECE",
        year: "2nd Year",
        mobile: "8765412345",
        email: "rohan@mmmut.ac.in",
      },
      agreedRules: false, // Not agreed
      confirmedDetails: true,
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
  });

  await test("Honeypot field triggers rejection", () => {
    const payload = {
      type: "INDIVIDUAL",
      participant1: {
        fullName: "Spam Bot",
        rollNumber: "2024CSE999",
        branch: "CSE",
        year: "1st Year",
        mobile: "9876512345",
        email: "bot@spam.com",
      },
      agreedRules: true,
      confirmedDetails: true,
      hp_website: "https://spamsite.com",
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
  });

  await test("Unknown fields rejected (strict schema)", () => {
    const payload = {
      type: "INDIVIDUAL",
      participant1: {
        fullName: "Rohan Verma",
        rollNumber: "2024ECE045",
        branch: "ECE",
        year: "2nd Year",
        mobile: "8765412345",
        email: "rohan@mmmut.ac.in",
      },
      agreedRules: true,
      confirmedDetails: true,
      maliciousField: "attack_payload",
    };
    const res = bytebrawlRegistrationSchema.safeParse(payload);
    assert.strictEqual(res.success, false);
  });

  // ─────────────────────────────────────────────────────────────
  // 2. HTTP API END-TO-END TESTS
  // ─────────────────────────────────────────────────────────────
  console.log("\nSection 2: HTTP API End-to-End Tests");

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  try {
    let teamRegId = "";

    await test("POST /api/events/bytebrawl-hacktoberfest/send-otp rejects invalid email with 422", async () => {
      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "notanemail" }),
      });
      assert.strictEqual(res.status, 422);
      const json = await res.json();
      assert.strictEqual(json.error, "Invalid email format");
    });

    await test("POST /api/events/bytebrawl-hacktoberfest/send-otp rejects typo domain with 422 and typo suggestion", async () => {
      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@gmial.com" }),
      });
      assert.strictEqual(res.status, 422);
      const json = await res.json();
      assert.match(json.error, /Did you mean user@gmail.com/);
      assert.strictEqual(json.typoHint, "Did you mean user@gmail.com?");
    });

    await test("POST /api/events/bytebrawl-hacktoberfest/send-otp rejects nonexistent domain with 422", async () => {
      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@domainthatdefinitelydoesnotexist123987.org" }),
      });
      assert.strictEqual(res.status, 422);
      const json = await res.json();
      assert.match(json.error, /does not exist/);
    });

    await test("POST /api/events/bytebrawl-hacktoberfest/send-otp succeeds with 200 for valid email", async () => {
      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "vikas.patel@mmmut.ac.in" }),
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
    });

    await test("GET /api/events/bytebrawl-hacktoberfest/status returns open state", async () => {
      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/status`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.open, true);
      assert.strictEqual(typeof json.registeredCount, "number");
    });

    await test("POST /api/events/bytebrawl-hacktoberfest/register creates Team registration (201)", async () => {
      const payload = {
        type: "TEAM",
        teamName: "Syntax Warriors",
        participant1: {
          fullName: "Vikas Patel",
          rollNumber: "2024CSE101",
          branch: "CSE",
          year: "3rd Year",
          mobile: "9876512345",
          email: "vikas.patel@mmmut.ac.in",
          verificationToken: createVerificationToken("vikas.patel@mmmut.ac.in"),
        },
        participant2: {
          fullName: "Pooja Singh",
          rollNumber: "2024IT102",
          branch: "IT",
          year: "3rd Year",
          mobile: "+91 9876543211",
          email: "pooja.singh@mmmut.ac.in",
          verificationToken: createVerificationToken("pooja.singh@mmmut.ac.in"),
        },
        agreedRules: true,
        confirmedDetails: true,
      };

      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      assert.strictEqual(res.status, 201);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.match(json.registrationId, /^BBH26-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/);
      assert.strictEqual(json.type, "TEAM");
      assert.strictEqual(json.teamName, "Syntax Warriors");
      assert.strictEqual(json.participants.length, 2);
      teamRegId = json.registrationId;
    });

    await test("POST /api/events/bytebrawl-hacktoberfest/register creates Individual registration (201)", async () => {
      const payload = {
        type: "INDIVIDUAL",
        teamName: "Siddharth Rao (Individual)",
        participant1: {
          fullName: "Siddharth Rao",
          rollNumber: "2024ECE201",
          branch: "ECE",
          year: "2nd Year",
          mobile: "9123456789",
          email: "siddharth.rao@mmmut.ac.in",
          verificationToken: createVerificationToken("siddharth.rao@mmmut.ac.in"),
        },
        agreedRules: true,
        confirmedDetails: true,
      };

      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      assert.strictEqual(res.status, 201);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.match(json.registrationId, /^BBH26-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/);
      assert.strictEqual(json.type, "INDIVIDUAL");
      assert.strictEqual(json.participants.length, 1);
    });

    await test("Duplicate roll number returns 409 Conflict with masked ID error", async () => {
      const payload = {
        type: "INDIVIDUAL",
        teamName: "Imposter Vikas (Individual)",
        participant1: {
          fullName: "Imposter Vikas",
          rollNumber: "2024CSE101", // Already registered above
          branch: "CSE",
          year: "3rd Year",
          mobile: "9988776655",
          email: "different.email@mmmut.ac.in",
          verificationToken: createVerificationToken("different.email@mmmut.ac.in"),
        },
        agreedRules: true,
        confirmedDetails: true,
      };

      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      assert.strictEqual(res.status, 409);
      const json = await res.json();
      assert.strictEqual(json.error, "Duplicate registration");
      assert.strictEqual(
        typeof json.fieldErrors["participant1.rollNumber"],
        "string"
      );
      assert.match(
        json.fieldErrors["participant1.rollNumber"],
        /This roll number is already registered/
      );
    });

    await test("Duplicate email returns 409 Conflict with masked ID error", async () => {
      const payload = {
        type: "INDIVIDUAL",
        teamName: "Another Person (Individual)",
        participant1: {
          fullName: "Another Person",
          rollNumber: "2024ME999",
          branch: "ME",
          year: "1st Year",
          mobile: "9988776644",
          email: "pooja.singh@mmmut.ac.in", // Already registered above
          verificationToken: createVerificationToken("pooja.singh@mmmut.ac.in"),
        },
        agreedRules: true,
        confirmedDetails: true,
      };

      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      assert.strictEqual(res.status, 409);
      const json = await res.json();
      assert.strictEqual(json.error, "Duplicate registration");
      assert.match(
        json.fieldErrors["participant1.email"],
        /This email( address)? is already registered/
      );
    });

    await test("Duplicate team name returns 409 Conflict", async () => {
      const payload = {
        type: "TEAM",
        teamName: "Syntax Warriors", // Already used
        participant1: {
          fullName: "New Leader",
          rollNumber: "2024EE501",
          branch: "EE",
          year: "2nd Year",
          mobile: "9456123456",
          email: "new.leader@mmmut.ac.in",
          verificationToken: createVerificationToken("new.leader@mmmut.ac.in"),
        },
        participant2: {
          fullName: "New Member",
          rollNumber: "2024EE502",
          branch: "EE",
          year: "2nd Year",
          mobile: "9456123457",
          email: "new.member@mmmut.ac.in",
          verificationToken: createVerificationToken("new.member@mmmut.ac.in"),
        },
        agreedRules: true,
        confirmedDetails: true,
      };

      const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      assert.strictEqual(res.status, 409);
      const json = await res.json();
      assert.strictEqual(json.error, "Duplicate registration");
      assert.match(json.fieldErrors["teamName"], /This team name is already (taken|registered)/);
    });

    await test("Admin routes require Bearer ADMIN_TOKEN (401)", async () => {
      const res = await fetch(`${baseUrl}/api/admin/registrations`);
      assert.strictEqual(res.status, 401);
    });

    await test("Admin routes return JSON data when authorized (200)", async () => {
      const res = await fetch(`${baseUrl}/api/admin/registrations`, {
        headers: { Authorization: "Bearer flux-admin-secret-2026" },
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.strictEqual(json.count >= 2, true);
    });

    await test("Admin CSV export returns text/csv (200)", async () => {
      const res = await fetch(`${baseUrl}/api/admin/registrations.csv`, {
        headers: { Authorization: "Bearer flux-admin-secret-2026" },
      });
      assert.strictEqual(res.status, 200);
      const contentType = res.headers.get("content-type");
      assert.strictEqual(contentType?.includes("text/csv"), true);
      const csv = await res.text();
      assert.strictEqual(csv.includes("Registration ID,Event Slug"), true);
      assert.strictEqual(csv.includes("Syntax Warriors"), true);
    });

    await test("Closed state returns 410 Gone when capacity is reached", async () => {
      const originalCapacity = BYTEBRAWL_CONFIG.capacity;
      try {
        // Temporarily set capacity to current count to simulate full event
        BYTEBRAWL_CONFIG.capacity = 2; // We already have 2 registrations saved

        const payload = {
          type: "INDIVIDUAL",
          teamName: "Late Comers (Individual)",
          participant1: {
            fullName: "Late Comers",
            rollNumber: "2024CE303",
            branch: "CE",
            year: "4th Year",
            mobile: "9112233445",
            email: "late@mmmut.ac.in",
            verificationToken: createVerificationToken("late@mmmut.ac.in"),
          },
          agreedRules: true,
          confirmedDetails: true,
        };

        const res = await fetch(`${baseUrl}/api/events/bytebrawl-hacktoberfest/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        assert.strictEqual(res.status, 410);
        const json = await res.json();
        assert.strictEqual(json.open, false);
      } finally {
        BYTEBRAWL_CONFIG.capacity = originalCapacity;
      }
    });

  } finally {
    server.close();
  }

  console.log(`\n=== TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED ===\n`);
  if (failedCount > 0) {
    process.exit(1);
  }
  process.exit(0);
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

