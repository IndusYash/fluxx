/**
 * Temporary FPS & Long Task Performance Probe
 * Measures frame times and PerformanceObserver longtask entries
 */

interface FPSReport {
  avgFps: number;
  onePercentLow: number;
  longTaskCount: number;
  maxLongTaskMs: number;
}

let frameTimes: number[] = [];
let lastFrameTime = performance.now();
let longTasks: PerformanceEntry[] = [];
let isMeasuring = false;

export function initFPSProbe() {
  if (typeof window === "undefined") return;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (isMeasuring) {
          longTasks.push(entry);
        }
      }
    });
    observer.observe({ entryTypes: ["longtask"] });
  } catch {
    // PerformanceObserver longtask may not be supported in all environments
  }

  const loop = () => {
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;

    if (isMeasuring && delta > 0) {
      frameTimes.push(1000 / delta);
    }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  (window as any).__startFPSMeasure = () => {
    frameTimes = [];
    longTasks = [];
    isMeasuring = true;
    lastFrameTime = performance.now();
  };

  (window as any).__stopFPSMeasure = (): FPSReport => {
    isMeasuring = false;
    if (frameTimes.length === 0) {
      return { avgFps: 60, onePercentLow: 60, longTaskCount: 0, maxLongTaskMs: 0 };
    }

    const sorted = [...frameTimes].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, v) => acc + v, 0);
    const avgFps = Math.round((sum / sorted.length) * 10) / 10;

    // 1% low
    const p1Idx = Math.max(0, Math.floor(sorted.length * 0.01));
    const onePercentLow = Math.round(sorted[p1Idx] * 10) / 10;

    const maxLongTaskMs = longTasks.reduce((max, t) => Math.max(max, t.duration), 0);

    return {
      avgFps,
      onePercentLow,
      longTaskCount: longTasks.length,
      maxLongTaskMs: Math.round(maxLongTaskMs * 10) / 10,
    };
  };
}

