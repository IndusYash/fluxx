import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { RobotMood } from './types';

interface RobotVisorCanvasProps {
  mood?: RobotMood;
  className?: string;
  onHoverChange?: (isHovered: boolean) => void;
}

/**
 * Generates an offscreen canvas texture for the glowing visor eyes
 */
function createEyesTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  function render(mood: RobotMood, blink: boolean, time: number) {
    ctx.clearRect(0, 0, 512, 256);

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const lx = 175;
    const rx = 337;
    const cy = 130;

    if (blink) {
      // 1. Broad cyan outer glow
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 30;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 24;
      ctx.beginPath();
      ctx.moveTo(lx - 44, cy);
      ctx.lineTo(lx + 44, cy);
      ctx.moveTo(rx - 44, cy);
      ctx.lineTo(rx + 44, cy);
      ctx.stroke();

      // 2. High-intensity white core
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(lx - 44, cy);
      ctx.lineTo(lx + 44, cy);
      ctx.moveTo(rx - 44, cy);
      ctx.lineTo(rx + 44, cy);
      ctx.stroke();
    } else if (mood === 'typing') {
      // 1. Broad cyan glow
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 36;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(lx, cy, 44, 54, 0, 0, Math.PI * 2);
      ctx.ellipse(rx, cy, 44, 54, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Pure white core
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(lx, cy, 36, 46, 0, 0, Math.PI * 2);
      ctx.ellipse(rx, cy, 36, 46, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Inner dark pupil
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#05070a';
      ctx.beginPath();
      ctx.arc(lx, cy, 16, 0, Math.PI * 2);
      ctx.arc(rx, cy, 16, 0, Math.PI * 2);
      ctx.fill();
    } else if (mood === 'thinking') {
      // Animated wave / scanning dots
      const offset = (time * 8) % (Math.PI * 2);
      for (let i = -1; i <= 1; i++) {
        const pulseL = Math.sin(offset + i * 1.5) * 0.5 + 0.5;
        const pulseR = Math.sin(offset + (i + 1) * 1.5) * 0.5 + 0.5;

        // Left eye scanning dot
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = 0.5 + pulseL * 0.5;
        ctx.beginPath();
        ctx.arc(lx + i * 34, cy, 14 + pulseL * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lx + i * 34, cy, 9 + pulseL * 3, 0, Math.PI * 2);
        ctx.fill();

        // Right eye scanning dot
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = 0.5 + pulseR * 0.5;
        ctx.beginPath();
        ctx.arc(rx + i * 34, cy, 14 + pulseR * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(rx + i * 34, cy, 9 + pulseR * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else {
      // Default / Happy glowing ^ ^ arcs
      const r = mood === 'happy' ? 44 : 38;
      const arcY = cy + (mood === 'happy' ? 18 : 12);
      const startAngle = Math.PI * 1.14;
      const endAngle = Math.PI * 1.86;

      // Pass 1: Broad electric cyan glow
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 34;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 26;
      ctx.beginPath();
      ctx.arc(lx, arcY, r, startAngle, endAngle);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, arcY, r, startAngle, endAngle);
      ctx.stroke();

      // Pass 2: High-luminance crisp white core
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(lx, arcY, r, startAngle, endAngle);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rx, arcY, r, startAngle, endAngle);
      ctx.stroke();

      if (mood === 'happy') {
        // Extra sparkles
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 16;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(lx + 46, cy - 20, 6, 0, Math.PI * 2);
        ctx.arc(rx - 46, cy - 20, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
    texture.needsUpdate = true;
  }

  return { texture, render, dispose: () => texture.dispose() };
}

/**
 * Generates an offscreen canvas texture for the FLUX geometric mark on the forehead
 */
function createLogoBadgeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 250;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 250, 250);
  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#67e8f9';
  ctx.shadowBlur = 15;

  const rects = [
    [0, 0, 50, 50],
    [100, 0, 150, 50],
    [50, 50, 50, 50],
    [0, 100, 50, 50],
    [150, 100, 100, 50],
    [100, 150, 50, 50],
    [0, 200, 100, 50],
  ];

  for (const [x, y, w, h] of rects) {
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(x, y, w, h, 4) : ctx.rect(x, y, w, h);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
}

/**
 * 3D Robot Scene component
 */
function RobotModel({ mood = 'idle', isHovered = false }: { mood: RobotMood; isHovered: boolean }) {
  const headGroupRef = useRef<THREE.Group>(null);
  const orbitRingRef = useRef<THREE.Mesh>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const blinkTimer = useRef({ nextBlink: 3.5, blinking: false, blinkDuration: 0.14 });
  const happyTimer = useRef({ active: false, time: 0 });

  const eyesManager = useMemo(() => createEyesTexture(), []);
  const logoTexture = useMemo(() => createLogoBadgeTexture(), []);

  // Dispose textures on unmount
  useEffect(() => {
    return () => {
      eyesManager.dispose();
      logoTexture.dispose();
    };
  }, [eyesManager, logoTexture]);

  // Window mouse move listener for smooth head tracking without React re-renders
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseCoords.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  const prevEyesState = useRef({ mood: '', blinking: false, lastThinkRender: 0 });

  // Initial render of eyes texture on mount or mood change
  useEffect(() => {
    eyesManager.render(mood, false, 0);
    prevEyesState.current.mood = mood;
    prevEyesState.current.blinking = false;
  }, [eyesManager, mood]);

  // Frame update loop
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Blink logic every 3 to 5 seconds
    blinkTimer.current.nextBlink -= delta;
    if (blinkTimer.current.nextBlink <= 0) {
      blinkTimer.current.blinking = true;
      if (blinkTimer.current.nextBlink <= -blinkTimer.current.blinkDuration) {
        blinkTimer.current.blinking = false;
        blinkTimer.current.nextBlink = 3 + Math.random() * 2.5;
      }
    }

    // Only update canvas texture when state changes or throttled while thinking
    const isBlink = blinkTimer.current.blinking;
    let shouldUpdateEyes = false;
    if (prevEyesState.current.mood !== mood || prevEyesState.current.blinking !== isBlink) {
      shouldUpdateEyes = true;
      prevEyesState.current.mood = mood;
      prevEyesState.current.blinking = isBlink;
    } else if (mood === 'thinking' && time - prevEyesState.current.lastThinkRender > 0.08) {
      shouldUpdateEyes = true;
      prevEyesState.current.lastThinkRender = time;
    }

    if (shouldUpdateEyes) {
      eyesManager.render(mood, isBlink, time);
    }

    if (headGroupRef.current) {
      // Smooth cursor head-following: max ~12 deg (0.21 rad) yaw, ~8 deg (0.14 rad) pitch
      const targetYaw = mouseCoords.current.x * 0.21;
      const targetPitch = -mouseCoords.current.y * 0.14;

      headGroupRef.current.rotation.y = THREE.MathUtils.damp(
        headGroupRef.current.rotation.y,
        targetYaw,
        4.5,
        delta
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.damp(
        headGroupRef.current.rotation.x,
        targetPitch,
        4.5,
        delta
      );

      // Idle float (about +/-4px)
      const idleFloat = Math.sin(time * 2.2) * 0.055;

      // Happy bounce
      let bounce = 0;
      if (mood === 'happy') {
        happyTimer.current.time += delta * 6;
        bounce = Math.abs(Math.sin(happyTimer.current.time)) * 0.1;
      } else {
        happyTimer.current.time = 0;
      }

      headGroupRef.current.position.y = idleFloat + bounce;

      // Hover wave/tilt
      const targetTilt = isHovered ? Math.sin(time * 7) * 0.14 : 0;
      headGroupRef.current.rotation.z = THREE.MathUtils.damp(
        headGroupRef.current.rotation.z,
        targetTilt,
        5.0,
        delta
      );
    }

    // Orbit ring rotation (accelerates when thinking)
    if (orbitRingRef.current) {
      const speed = mood === 'thinking' ? 4.2 : 0.85;
      orbitRingRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <group position={[0, 0.25, 0]}>
      {/* Robot Head Group */}
      <group ref={headGroupRef}>
        {/* Glossy White-Silver Helmet Sphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.0, 36, 36]} />
          <meshPhysicalMaterial
            color="#e2e8f0"
            roughness={0.12}
            metalness={0.22}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.92}
          />
        </mesh>

        {/* Black Glossy Visor */}
        <mesh position={[0, -0.04, 0.32]} scale={[0.88, 0.76, 0.82]}>
          <sphereGeometry args={[1.0, 32, 28, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          <meshPhysicalMaterial
            color="#030508"
            roughness={0.05}
            metalness={0.92}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
          />
        </mesh>

        {/* Visor Eyes Texture Display */}
        <mesh position={[0, -0.02, 1.145]} renderOrder={10}>
          <planeGeometry args={[1.05, 0.52]} />
          <meshBasicMaterial
            map={eyesManager.texture}
            transparent
            opacity={1.0}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>

        {/* Forehead FLUX Mark Badge */}
        <mesh position={[0, 0.66, 0.77]} rotation={[-0.45, 0, 0]} renderOrder={10}>
          <planeGeometry args={[0.26, 0.26]} />
          <meshBasicMaterial
            map={logoTexture}
            transparent
            opacity={1.0}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>

        {/* Left Earcup / Headphone */}
        <group position={[-1.02, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.36, 0.4, 0.15, 32]} />
            <meshPhysicalMaterial
              color="#1e2430"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.24, 0.032, 16, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#67e8f9"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Right Earcup / Headphone */}
        <group position={[1.02, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.36, 0.4, 0.15, 32]} />
            <meshPhysicalMaterial
              color="#1e2430"
              roughness={0.2}
              metalness={0.8}
              clearcoat={0.5}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.24, 0.032, 16, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#67e8f9"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>

        {/* Tilted Floating Orbit Ring */}
        <mesh
          ref={orbitRingRef}
          rotation={[0.45, 0.18, 0.1]}
        >
          <torusGeometry args={[1.48, 0.026, 16, 64]} />
          <meshStandardMaterial
            color="#d8e8f8"
            metalness={0.85}
            roughness={0.15}
            emissive="#a5f3fc"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Pedestal Structure (at bottom edge of canvas, anchoring to panel) */}
      <group position={[0, -1.25, 0]}>
        {/* Metallic Base Disc */}
        <mesh>
          <cylinderGeometry args={[0.92, 1.08, 0.15, 36]} />
          <meshPhysicalMaterial
            color="#111620"
            metalness={0.88}
            roughness={0.2}
            clearcoat={0.6}
          />
        </mesh>
        {/* Glowing Concentric Ring 1 */}
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.042, 16, 48]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#67e8f9"
            emissiveIntensity={3.0}
          />
        </mesh>
        {/* Glowing Concentric Ring 2 */}
        <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.028, 16, 36]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#a5f3fc"
            emissiveIntensity={2.0}
          />
        </mesh>
      </group>

      {/* Lighting Rig */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={2.2} color="#a5f3fc" />
      <pointLight position={[0, -1.0, 0.6]} intensity={1.6} color="#67e8f9" distance={3} />
      <pointLight position={[0, 0.4, 2.0]} intensity={0.8} color="#ffffff" distance={4} />
    </group>
  );
}

export default function RobotVisorCanvas({
  mood = 'idle',
  className = '',
  onHoverChange,
}: RobotVisorCanvasProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      {/* 3D R3F Canvas */}
      <Canvas
        className="pointer-events-none w-full h-full"
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        camera={{ position: [0, 0.22, 4.0], fov: 42 }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      >
        <RobotModel mood={mood} isHovered={isHovered} />
      </Canvas>

      {/* Transparent Hover Zone over Robot Head to trigger hover wave/tilt */}
      <div
        className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full pointer-events-auto cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="FLUX AI Robot Avatar"
        role="img"
      />
    </div>
  );
}
