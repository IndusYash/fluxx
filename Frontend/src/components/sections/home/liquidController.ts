import { LiquidShaderRenderer } from "./LiquidShader";
import { setLiquidProgress } from "@/hooks/useLightSectionObserver";

let rendererInstance: LiquidShaderRenderer | null = null;
let currentVal = 0;

export const liquidController = {
  register(renderer: LiquidShaderRenderer) {
    rendererInstance = renderer;
    renderer.render(currentVal);
  },

  unregister(renderer: LiquidShaderRenderer) {
    if (rendererInstance === renderer) {
      rendererInstance = null;
    }
  },

  setProgress(progress: number) {
    currentVal = progress;
    if (rendererInstance) {
      rendererInstance.render(progress);
    }
    setLiquidProgress(progress);
  },

  forceState(state: 0 | 1) {
    currentVal = state;
    if (rendererInstance) {
      rendererInstance.render(state);
    }
    setLiquidProgress(state);
  },

  getProgress(): number {
    return currentVal;
  },
};

