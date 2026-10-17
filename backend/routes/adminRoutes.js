import express from "express";
import { prisma } from "../prisma/client.js";

const router = express.Router();

// Admin Authentication Middleware
function requireAdminToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const expectedToken = process.env.ADMIN_TOKEN || "flux-admin-secret-2026";

  if (!token || token !== expectedToken) {
    return res.status(401).json({
      error: "Unauthorized. Missing or invalid Bearer ADMIN_TOKEN.",
    });
  }

  next();
}

/**
 * Helper to escape CSV values
 */
function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * GET /api/admin/registrations
 * Returns JSON list of all registrations
 */
router.get("/registrations", requireAdminToken, async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          orderBy: { role: "asc" },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    console.error("Error fetching admin registrations:", error.message || error);
    return res.status(500).json({ error: "Failed to retrieve registrations" });
  }
});

/**
 * GET /api/admin/registrations.csv
 * Exports CSV format of all registrations & participants
 */
router.get("/registrations.csv", requireAdminToken, async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        participants: {
          orderBy: { role: "asc" },
        },
      },
    });

    const headers = [
      "Registration ID",
      "Event Slug",
      "Registration Type",
      "Team Name",
      "Status",
      "Registration Date",
      "Participant Role",
      "Full Name",
      "Roll Number",
      "Branch",
      "Year",
      "Mobile",
      "Email",
    ];

    const rows = [headers.join(",")];

    for (const reg of registrations) {
      if (reg.participants.length === 0) {
        rows.push(
          [
            escapeCsv(reg.registrationId),
            escapeCsv(reg.eventSlug),
            escapeCsv(reg.type),
            escapeCsv(reg.teamName || ""),
            escapeCsv(reg.status),
            escapeCsv(reg.createdAt.toISOString()),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
            escapeCsv("N/A"),
          ].join(",")
        );
      } else {
        for (const p of reg.participants) {
          rows.push(
            [
              escapeCsv(reg.registrationId),
              escapeCsv(reg.eventSlug),
              escapeCsv(reg.type),
              escapeCsv(reg.teamName || ""),
              escapeCsv(reg.status),
              escapeCsv(reg.createdAt.toISOString()),
              escapeCsv(p.role),
              escapeCsv(p.fullName),
              escapeCsv(p.rollNumber),
              escapeCsv(p.branch),
              escapeCsv(p.year),
              escapeCsv(p.mobile),
              escapeCsv(p.email),
            ].join(",")
          );
        }
      }
    }

    const csvContent = rows.join("\r\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="bytebrawl_registrations_${new Date().toISOString().slice(0, 10)}.csv"`
    );
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error("Error exporting registrations CSV:", error.message || error);
    return res.status(500).json({ error: "Failed to export CSV" });
  }
});

export default router;

