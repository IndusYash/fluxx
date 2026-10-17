// Event facts and backend constraints for ByteBrawl x Hacktoberfest

export const BYTEBRAWL_CONFIG = {
  slug: "bytebrawl-hacktoberfest",
  name: "ByteBrawl x Hacktoberfest",
  // Default deadline: October 31, 2026 23:59:59 IST (TODO: Update if official deadline differs)
  deadline: process.env.BYTEBRAWL_DEADLINE || "2026-10-31T23:59:59+05:30",
  // Default capacity limit (TODO: Update with venue capacity)
  capacity: process.env.BYTEBRAWL_CAPACITY
    ? Number.parseInt(process.env.BYTEBRAWL_CAPACITY, 10)
    : 100,
};

export async function getEventStatus(prisma) {
  const now = new Date();
  const deadlineDate = new Date(BYTEBRAWL_CONFIG.deadline);
  const isPastDeadline = !isNaN(deadlineDate.getTime()) && now > deadlineDate;

  const registeredCount = await prisma.registration.count({
    where: {
      eventSlug: BYTEBRAWL_CONFIG.slug,
      status: "CONFIRMED",
    },
  });

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

