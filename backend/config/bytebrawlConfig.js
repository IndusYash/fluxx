import ByteBrawlRegistration from "../models/bytebrawlModel.js";

// Event facts and backend constraints for ByteBrawl x Hacktoberfest

export const BYTEBRAWL_CONFIG = {
  slug: "bytebrawl-hacktoberfest",
  name: "ByteBrawl x Hacktoberfest",
  whatsappGroupLink: "https://chat.whatsapp.com/CEQxUE7IS485dCgckzTNjm",
  instagramLink: "https://www.instagram.com/flux.mmmut?srtk=cWNvcmV4ZDcxdXZq",
  // Default deadline: October 31, 2026 23:59:59 IST (TODO: Update if official deadline differs)
  deadline: process.env.BYTEBRAWL_DEADLINE || "2026-10-31T23:59:59+05:30",
  // Default capacity limit (TODO: Update with venue capacity)
  capacity: process.env.BYTEBRAWL_CAPACITY
    ? Number.parseInt(process.env.BYTEBRAWL_CAPACITY, 10)
    : 500,
};

export async function getEventStatus() {
  const now = new Date();
  const deadlineDate = new Date(BYTEBRAWL_CONFIG.deadline);
  const isPastDeadline = !isNaN(deadlineDate.getTime()) && now > deadlineDate;

  let registeredCount = 0;
  try {
    registeredCount = await ByteBrawlRegistration.countDocuments({
      eventSlug: BYTEBRAWL_CONFIG.slug,
      status: "CONFIRMED",
    });
  } catch (err) {
    console.error("Error counting ByteBrawl registrations:", err.message || err);
  }


  const isFull =
    BYTEBRAWL_CONFIG.capacity > 0 &&
    registeredCount >= BYTEBRAWL_CONFIG.capacity;

  const isOpen = !isPastDeadline && !isFull;

  return {
    open: isOpen,
    closesAt: BYTEBRAWL_CONFIG.deadline,
    capacity: BYTEBRAWL_CONFIG.capacity,
    registeredCount,
    isPastDeadline,
    isFull,
    message: !isOpen
      ? isPastDeadline
        ? "Registrations are closed (deadline reached)"
        : "Registrations are closed (capacity reached)"
      : "Registrations open",
  };
}

