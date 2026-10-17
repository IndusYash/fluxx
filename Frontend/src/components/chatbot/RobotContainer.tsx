import React, { Suspense, lazy, useState, useEffect } from 'react';
import type { RobotMood } from './types';
import RobotFallbackSvg from './RobotFallbackSvg';

const RobotVisorCanvas = lazy(() => import('./RobotVisorCanvas'));

function hasWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface RobotContainerProps {
  mood?: RobotMood;
  className?: string;
}

export default function RobotContainer({ mood = 'idle', className = '' }: RobotContainerProps) {
  const [canRender3D, setCanRender3D] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const webglOk = hasWebGLSupport();
    setCanRender3D(webglOk && !prefersReduced);
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div className={`w-[115px] h-[115px] sm:w-[130px] sm:h-[130px] ${className}`} />;
  }

  return (
    <div className={`relative w-[115px] h-[115px] sm:w-[130px] sm:h-[130px] pointer-events-none ${className}`}>
      {/* Pedestal Outer Glow Ring */}
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 rounded-full bg-cyan-400/20 blur-md pointer-events-none"
        aria-hidden="true"
      />
      
      {canRender3D ? (
        <Suspense fallback={<RobotFallbackSvg mood={mood} />}>
          <RobotVisorCanvas mood={mood} />
        </Suspense>
      ) : (
        <RobotFallbackSvg mood={mood} />
      )}
    </div>
  );
}
