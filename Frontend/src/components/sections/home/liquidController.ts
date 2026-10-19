import { LiquidShaderRenderer } from "./LiquidShader";
import { setLiquidProgress } from "@/hooks/useLightSectionObserver";

let rendererInstance: LiquidShaderRenderer | null = null;
let currentVal = 0;
let currentDissolve = 0;

export const liquidController = {
  register(renderer: LiquidShaderRenderer) {
    rendererInstance = renderer;
    renderer.render(currentVal, currentDissolve);
  },

  unregister(renderer: LiquidShaderRenderer) {
    if (rendererInstance === renderer) {
      rendererInstance = null;
    }
  },

  setProgress(progress: number, dissolve: number = 0) {
    currentVal = progress;
    currentDissolve = dissolve;
    if (rendererInstance) {
      rendererInstance.render(progress, dissolve);
    }
    setLiquidProgress(progress, dissolve);
  },

  forceState(state: 0 | 1) {
    currentVal = state;
    currentDissolve = 0;
    if (rendererInstance) {
      rendererInstance.render(state, 0);
    }
    setLiquidProgress(state, 0);
  },

  getProgress(): number {
    return currentVal;
  },

  getDissolve(): number {
    return currentDissolve;
  },
};

