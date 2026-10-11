import type gsap from "gsap";

export type IntroState =
  | "loading"
  | "ready"
  | "dissolving"
  | "assembling"
  | "revealing"
  | "done";

export interface IntroAnimationHooks {
  onAssemble?: (tl: gsap.core.Timeline, startTime: number) => void;
  onGlideToHero?: (tl: gsap.core.Timeline, startTime: number) => void;
  shakeCamera?: () => void;
  snapToHero?: () => void;
}

const STORAGE_KEY = "flux_intro_seen_v1";

let currentState: IntroState = (() => {
  if (typeof window === "undefined") return "done";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return "done";
  return window.sessionStorage.getItem(STORAGE_KEY) === "1" ? "done" : "loading";
})();

if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-intro", currentState);
  if (currentState !== "done") {
    document.body.style.overflow = "hidden";
  }
}

const listeners = new Set<(state: IntroState) => void>();
let registeredHooks: IntroAnimationHooks = {};

export const introManager = {
  getState(): IntroState {
    return currentState;
  },

  isDone(): boolean {
    return currentState === "done";
  },

  isSeenInSession(): boolean {
    if (typeof window === "undefined") return true;
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  },

  registerHooks(hooks: IntroAnimationHooks) {
    registeredHooks = { ...registeredHooks, ...hooks };
  },

  getHooks(): IntroAnimationHooks {
    return registeredHooks;
  },

  setState(nextState: IntroState) {
    if (currentState === nextState) return;
    currentState = nextState;

    if (typeof document !== "undefined") {
      if (nextState === "done") {
        document.documentElement.setAttribute("data-intro", "done");
        document.body.style.overflow = "";
      } else {
        document.documentElement.setAttribute("data-intro", nextState);
        document.body.style.overflow = "hidden";
      }
    }

    if (nextState === "done") {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore storage errors
      }
    }

    listeners.forEach((fn) => fn(nextState));
  },

  subscribe(listener: (state: IntroState) => void): () => void {
    listeners.add(listener);
    listener(currentState);
    return () => {
      listeners.delete(listener);
    };
  },

  skip() {
    if (registeredHooks.snapToHero) {
      registeredHooks.snapToHero();
    }
    this.setState("done");
    if ((window as any).__lenis) {
      (window as any).__lenis.start();
    }
  },

  activate() {
    if (currentState === "ready") {
      this.setState("dissolving");
    }
  },
};

