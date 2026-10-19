export interface LenisInstance {
  start: () => void;
  stop: () => void;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { immediate?: boolean }
  ) => void;
}

declare global {
  interface Window {
    __lenis?: LenisInstance;
  }
}

export const ROUTE_LABELS: Record<string, string> = {
  "/": "INITIALIZING FLUX CORE",
  "/about": "ACCESSING ARCHITECTURAL LEGACY",
  "/events": "SYNCHRONIZING FLUX EVENTS & CONCLAVES",
  "/events/bytebrawl-hacktoberfest": "LOADING BYTEBRAWL X HACKTOBERFEST",
  "/events/bytebrawl-hacktoberfest/register": "CONNECTING REGISTRATION PORTAL",
  "/events/fdp": "LOADING ATAL FDP RESEARCH",
  "/ideathon": "LOADING IDEATHON PROTOCOL",
  "/she-leads": "LOADING SHE LEADS CONCLAVE",
  "/sheleads": "LOADING SHE LEADS CONCLAVE",
  "/team": "LOADING FLUX TALENT CELL",
  "/faculty": "LOADING FACULTY ADVISORY",
  "/gallery": "LOADING PHOTO & MEDIA ARCHIVES",
  "/contact": "CONNECTING SECURE COMMUNICATION MATRIX",
};

/**
 * Returns a clean, high-tech cyber status label for any given pathname.
 */
export function getRouteLabel(pathname: string): string {
  if (!pathname) return "INITIALIZING FLUX CORE";
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (ROUTE_LABELS[clean]) return ROUTE_LABELS[clean];

  // Check prefix matches for nested routes
  for (const [key, label] of Object.entries(ROUTE_LABELS)) {
    if (key !== "/" && clean.startsWith(key)) {
      return label;
    }
  }

  const formatted = clean
    .replace(/^\//, "")
    .replace(/[-_/]/g, " ")
    .toUpperCase();
  return `LOADING ${formatted || "SYSTEM CORE"}`;
}

/**
 * Helper to trigger a cyber page transition from anywhere in the application.
 */
export function triggerRouteTransition(targetPath: string, customLabel?: string, duration = 460) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("flux:start-transition", {
      detail: { path: targetPath, label: customLabel, duration },
    })
  );
}

/**
 * Helper to smoothly return to the homepage top with cyber animation.
 */
export function triggerHomeNavigation() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("flux:navigate-home"));
}

