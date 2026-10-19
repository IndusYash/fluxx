/// <reference types="vite/client" />

interface Window {
  __lenis?: {
    scrollTo: (target: number | string | HTMLElement, options?: { immediate?: boolean; duration?: number }) => void;
    stop: () => void;
    start: () => void;
    resize?: () => void;
  };
  __getLogoQAData?: () => unknown;
  __renderLogoFrontOn?: (options?: { flatLighting?: boolean }) => unknown;
  __restoreLogoNormal?: () => void;
  __getLogoGridData?: () => unknown;
}
