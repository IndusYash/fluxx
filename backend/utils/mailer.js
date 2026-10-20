import nodemailer from "nodemailer";

let transporter = null;
let cachedCredentials = null;

// Test helper: stores sent emails in memory for test inspections
export const lastSentEmails = [];

export function getTransporter() {
  const host = (process.env.SMTP_HOST || "").trim();
  const user = (process.env.SMTP_USER || "").trim();
  const rawPass = (process.env.SMTP_PASS || "").trim();
  const pass = rawPass.replace(/^["']|["']$/g, "");
  const port = Number.parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  const credKey = `${host}:${user}:${pass}:${port}:${secure}`;
  if (!transporter || cachedCredentials !== credKey) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user,
        pass,
      },
    });
    cachedCredentials = credKey;
  }

  return transporter;
}

/**
 * Sends a 6-digit verification code email
 */
export async function sendOtpEmail({ recipientEmail, otpCode }) {
  const user = process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || (user ? `FLUX MMMUT <${user}>` : 'FLUX <no-reply@flux.mmmut.ac.in>');
  const subject = `Your verification code: ${otpCode} - ByteBrawl x Hacktoberfest`;

  const textBody = `Hello,\n\nYour 6-digit email verification code for ByteBrawl x Hacktoberfest registration is:\n\n${otpCode}\n\nThis code will expire in 10 minutes. If you did not request this, please ignore this email.\n\nBest regards,\nFLUX Team\nDepartment of CSE, MMMUT Gorakhpur`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background-color: #0d0d0d; color: #f0f0f0; border: 1px solid #262626; border-radius: 12px;">
      <h2 style="color: #ffffff; margin-top: 0; font-size: 20px;">Email Verification</h2>
      <p style="color: #a3a3a3; font-size: 14px; line-height: 1.5;">Your 6-digit verification code for ByteBrawl x Hacktoberfest is:</p>
      <div style="background-color: #1a1a1a; border: 1px solid #333333; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
        <span style="font-family: monospace; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #ffffff;">${otpCode}</span>
      </div>
      <p style="color: #737373; font-size: 12px; margin-bottom: 8px;">This code is valid for 10 minutes. Do not share it with anyone.</p>
      <p style="color: #525252; font-size: 11px; margin: 0; border-top: 1px solid #262626; padding-top: 12px;">FLUX · Department of CSE, MMMUT Gorakhpur</p>
    </div>
  `;

  // Record email in test log
  lastSentEmails.push({
    to: recipientEmail,
    subject,
    text: textBody,
    html: htmlBody,
    type: "OTP",
    sentAt: new Date().toISOString(),
  });

  // 1. If BREVO_API_KEY is configured, send via Brevo HTTPS REST API (Port 443 - no domain required, 300 free emails/day to any recipient)
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY.trim(),
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "FLUX MMMUT",
            email: process.env.BREVO_SENDER || process.env.SMTP_USER || "fluxmmmut@gmail.com",
          },
          to: [{ email: recipientEmail }],
          subject,
          htmlContent: htmlBody,
          textContent: textBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("[Mailer] Brevo API error:", data);
        return { success: false, error: data.message || "Brevo email delivery failed" };
      }
      console.log(`[Mailer] OTP email dispatched via Brevo to ${recipientEmail} (ID: ${data.messageId})`);
      return { success: true, messageId: data.messageId };
    } catch (err) {
      console.error("[Mailer] Brevo fetch exception:", err);
      return { success: false, error: err.message };
    }
  }

  // 2. If RESEND_API_KEY is configured, send via Resend HTTPS REST API (Port 443)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "FLUX ByteBrawl <onboarding@resend.dev>",
          to: [recipientEmail],
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`[Mailer] Resend API error:`, data);
        return { success: false, error: data.message || "Resend email delivery failed" };
      }
      console.log(`[Mailer] OTP email dispatched via Resend to ${recipientEmail} (ID: ${data.id})`);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error(`[Mailer] Resend fetch exception:`, err);
      return { success: false, error: err.message };
    }
  }

  const mailClient = getTransporter();
  if (!mailClient) {
    console.log(`[Mailer] SMTP not configured. OTP email recorded in memory for ${recipientEmail}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailClient.sendMail({
      from,
      to: recipientEmail,
      replyTo: user || from,
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
      },
    });
    console.log(`[Mailer] OTP email dispatched successfully to ${recipientEmail} (ID: ${info?.messageId || "ok"})`);
    return { success: true, messageId: info?.messageId };
  } catch (err) {
    console.error(`[Mailer] Failed to send OTP to ${recipientEmail}:`, err.message || err);
    return { success: false, error: err.message || "Failed to send email" };
  }
}

/**
 * Sends personalized confirmation email to EACH participant
 */
export async function sendPersonalizedSuccessEmail({
  participantName,
  recipientEmail,
  registrationId,
  type,
  teamName,
  allParticipants,
}) {
  const eventName = "ByteBrawl x Hacktoberfest";
  const societyName = "FLUX";
  const user = process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || (user ? `FLUX MMMUT <${user}>` : 'FLUX <no-reply@flux.mmmut.ac.in>');
  const subject = `Registration confirmed: ${eventName} (${registrationId})`;

  const participantsString = allParticipants.map((p) => p.fullName).join(", ");
  const isTeam = type === "TEAM";

  const detailsLineText = isTeam
    ? `- Team Name: ${teamName}\n- Participants: ${participantsString}`
    : `- Team Name: ${teamName || "Individual"}\n- Registration Type: Individual\n- Participant: ${participantName}`;

  const textBody = `Hi ${participantName},

Congratulations! Your registration for ${eventName} has been completed successfully.

Registration Details:
${detailsLineText}
- Registration ID: ${registrationId}

Thank you for registering. We look forward to seeing you at the event!

Best regards,
${societyName} Team`;

  const detailsLineHtml = isTeam
    ? `<tr><td style="color: #888888; padding: 4px 12px 4px 0;">Team Name:</td><td style="color: #ffffff; font-weight: bold;">${teamName}</td></tr>
       <tr><td style="color: #888888; padding: 4px 12px 4px 0;">Participants:</td><td style="color: #ffffff;">${participantsString}</td></tr>`
    : `<tr><td style="color: #888888; padding: 4px 12px 4px 0;">Team Name:</td><td style="color: #ffffff; font-weight: bold;">${teamName || "Individual"}</td></tr>
       <tr><td style="color: #888888; padding: 4px 12px 4px 0;">Registration Type:</td><td style="color: #ffffff;">Individual</td></tr>
       <tr><td style="color: #888888; padding: 4px 12px 4px 0;">Participant:</td><td style="color: #ffffff;">${participantName}</td></tr>`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 28px; background-color: #0a0a0a; color: #e5e5e5; border: 1px solid #262626; border-radius: 12px;">
      <h2 style="color: #ffffff; margin-top: 0; font-size: 22px; border-bottom: 1px solid #262626; padding-bottom: 12px;">${eventName}</h2>
      <p style="font-size: 15px; color: #cccccc; line-height: 1.5;">Hi <strong>${participantName}</strong>,</p>
      <p style="font-size: 14px; color: #a3a3a3; line-height: 1.5;">Congratulations! Your registration for <strong>${eventName}</strong> has been completed successfully.</p>
      
      <div style="background-color: #141414; border: 1px solid #262626; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #737373; font-family: monospace;">Registration Details</p>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          ${detailsLineHtml}
          <tr>
            <td style="color: #888888; padding: 4px 12px 4px 0;">Registration ID:</td>
            <td style="color: #ffffff; font-family: monospace; font-size: 16px; font-weight: bold;">${registrationId}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 14px; color: #a3a3a3; line-height: 1.5;">Thank you for registering. We look forward to seeing you at the event!</p>
      <p style="font-size: 14px; color: #737373; margin-top: 24px; border-top: 1px solid #262626; padding-top: 16px;">
        Best regards,<br>
        <strong style="color: #e5e5e5;">${societyName} Team</strong>
      </p>
    </div>
  `;

  // Log in memory for inspection/tests
  lastSentEmails.push({
    to: recipientEmail,
    participantName,
    subject,
    text: textBody,
    html: htmlBody,
    type: "CONFIRMATION",
    registrationId,
    sentAt: new Date().toISOString(),
  });

  // 1. If BREVO_API_KEY is configured, send via Brevo HTTPS REST API (Port 443 - no domain required, 300 free emails/day to any recipient)
  if (process.env.BREVO_API_KEY) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY.trim(),
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "FLUX MMMUT",
            email: process.env.BREVO_SENDER || process.env.SMTP_USER || "fluxmmmut@gmail.com",
          },
          to: [{ email: recipientEmail }],
          subject,
          htmlContent: htmlBody,
          textContent: textBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("[Mailer] Brevo API error:", data);
        return { success: false, error: data.message || "Brevo email delivery failed" };
      }
      console.log(`[Mailer] OTP email dispatched via Brevo to ${recipientEmail} (ID: ${data.messageId})`);
      return { success: true, messageId: data.messageId };
    } catch (err) {
      console.error("[Mailer] Brevo fetch exception:", err);
      return { success: false, error: err.message };
    }
  }

  // 2. If RESEND_API_KEY is configured, send via Resend HTTPS REST API (Port 443)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "FLUX ByteBrawl <onboarding@resend.dev>",
          to: [recipientEmail],
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(`[Mailer] Resend API error:`, data);
        return { success: false, error: data.message || "Resend email delivery failed" };
      }
      console.log(`[Mailer] OTP email dispatched via Resend to ${recipientEmail} (ID: ${data.id})`);
      return { success: true, messageId: data.id };
    } catch (err) {
      console.error(`[Mailer] Resend fetch exception:`, err);
      return { success: false, error: err.message };
    }
  }

  const mailClient = getTransporter();
  if (!mailClient) {
    console.log(`[Mailer] Confirmation email recorded in test memory for ${recipientEmail}`);
    return { success: true, simulated: true };
  }

  try {
    const info = await mailClient.sendMail({
      from,
      to: recipientEmail,
      replyTo: user || from,
      subject,
      text: textBody,
      html: htmlBody,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
      },
    });
    console.log(`[Mailer] Confirmation email dispatched successfully to ${recipientEmail} (ID: ${info?.messageId || "ok"})`);
    return { success: true, messageId: info?.messageId };
  } catch (err) {
    console.error(`[Mailer] Failed to dispatch confirmation email to ${recipientEmail}:`, err.message || err);
    return { success: false, error: err.message || "Failed to dispatch email" };
  }
}
