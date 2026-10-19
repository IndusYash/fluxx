import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildLogoInnerGroup, LOGO_UNIT_SIZE } from "./logoConfig";

interface ChromeLogo3DProps {
  className?: string;
  enableMouseFollow?: boolean;
  enableAutoRotate?: boolean;
  scrollRotateSpeed?: number;
  scale?: number;
  interactive?: boolean;
  positionMode?: "right" | "center";
}

export default function ChromeLogo3D({
  className = "w-full h-full",
  enableMouseFollow = true,
  enableAutoRotate = true,
  scrollRotateSpeed = 1.0,
  scale = 1.0,
  interactive = true,
  positionMode = "right",
}: ChromeLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isVisible = true;
    let width = container.clientWidth || window.innerWidth || 300;
    let height = container.clientHeight || window.innerHeight || 300;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Scene, Camera, Renderer
    // Wide frustum with near: 0.1, far: 100 to eliminate any clipping
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.overflow = "visible";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // 2. Generate Photorealistic Monochrome Studio Environment Map
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext("2d");
    if (envCtx) {
      // Balanced studio gradient background for silver reflections
      const bgGrad = envCtx.createLinearGradient(0, 0, 0, 512);
      bgGrad.addColorStop(0, "#16161c");
      bgGrad.addColorStop(0.5, "#0d0d12");
      bgGrad.addColorStop(1, "#181820");
      envCtx.fillStyle = bgGrad;
      envCtx.fillRect(0, 0, 1024, 512);

      // Overhead softbox light
      const topLight = envCtx.createRadialGradient(512, 120, 0, 512, 120, 320);
      topLight.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      topLight.addColorStop(0.4, "rgba(240, 240, 245, 0.9)");
      topLight.addColorStop(1, "rgba(0, 0, 0, 0)");
      envCtx.fillStyle = topLight;
      envCtx.fillRect(100, 0, 824, 280);

      // Left specular strip
      const leftLight = envCtx.createLinearGradient(120, 0, 280, 0);
      leftLight.addColorStop(0, "rgba(255, 255, 255, 0)");
      leftLight.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
      leftLight.addColorStop(1, "rgba(255, 255, 255, 0)");
      envCtx.fillStyle = leftLight;
      envCtx.fillRect(120, 100, 160, 350);

      // Right rim strip
      const rightLight = envCtx.createLinearGradient(740, 0, 900, 0);
      rightLight.addColorStop(0, "rgba(255, 255, 255, 0)");
      rightLight.addColorStop(0.5, "rgba(240, 245, 255, 0.95)");
      rightLight.addColorStop(1, "rgba(255, 255, 255, 0)");
      envCtx.fillStyle = rightLight;
      envCtx.fillRect(740, 80, 160, 370);

      // Bottom bounce glow
      const btmLight = envCtx.createRadialGradient(512, 480, 0, 512, 480, 220);
      btmLight.addColorStop(0, "rgba(210, 215, 230, 0.6)");
      btmLight.addColorStop(1, "rgba(0, 0, 0, 0)");
      envCtx.fillStyle = btmLight;
      envCtx.fillRect(200, 360, 624, 150);
    }

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envTexture;

    // 3. Chrome Material (Reflective silver with subtle clearcoat)
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbfbff,
      metalness: 0.96,
      roughness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
    });

    // 4. Construct 3D Beveled Flux Logo Model
    const logoGroup = new THREE.Group();
    const u = LOGO_UNIT_SIZE;
    const { logoInnerGroup } = buildLogoInnerGroup(u, chromeMaterial);
    logoGroup.add(logoInnerGroup);

    const getScale = (w: number) => {
      if (positionMode === "center") return scale * 0.88;
      if (w >= 1600) return scale * 1.05;
      if (w >= 1280) return scale * 0.98;
      return scale * 0.92;
    };

    const calcPosition = (w: number, h: number) => {
      const isTabletOrMob = w < 1024 || positionMode === "center";
      if (isTabletOrMob) {
        return { x: 0, y: 0.05 };
      }
      const aspect = w / h;
      const visibleHalfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visibleHalfWidth = visibleHalfHeight * aspect;

      // Position center of right column in 12-col grid
      const targetNormX = w >= 1600 ? 0.75 : w >= 1280 ? 0.76 : 0.74;
      const worldX = (targetNormX - 0.5) * 2 * visibleHalfWidth;
      const worldY = 0.06;

      return { x: worldX, y: worldY };
    };

    const initialScale = getScale(width);
    logoGroup.scale.set(initialScale, initialScale, initialScale);

    let currentPos = calcPosition(width, height);
    logoGroup.position.set(currentPos.x, currentPos.y, 0);

    scene.add(logoGroup);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 4.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xdde5ff, 2.6);
    fillLight.position.set(-4, -4, 4);
    scene.add(fillLight);

    const topRim = new THREE.DirectionalLight(0xffffff, 3.2);
    topRim.position.set(0, 7, -2);
    scene.add(topRim);

    // 6. Mouse and Scroll Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseFollow) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.targetX = normX;
      mouse.targetY = normY;
    };

    if (interactive && enableMouseFollow) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // 7. Visibility Observer to pause off-screen rendering
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    let scrollRotationOffset = 0;

    const onScroll = () => {
      scrollRotationOffset = window.scrollY * 0.0018 * scrollRotateSpeed;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      if (!prefersReducedMotion) {
        // Base auto drift + precession
        const autoSpin = enableAutoRotate ? time * 0.35 : 0;
        const floatY = Math.sin(time * 1.4) * 0.12;

        logoGroup.position.x = currentPos.x;
        logoGroup.position.y = currentPos.y + floatY;

        // Combined rotations
        logoGroup.rotation.y = autoSpin + scrollRotationOffset + mouse.x * 0.55;
        logoGroup.rotation.x = -mouse.y * 0.45 + Math.sin(time * 0.8) * 0.08;
        logoGroup.rotation.z = mouse.x * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const s = getScale(width);
      logoGroup.scale.set(s, s, s);

      currentPos = calcPosition(width, height);
      logoGroup.position.x = currentPos.x;
      logoGroup.position.y = currentPos.y;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      if (interactive && enableMouseFollow) {
        window.removeEventListener("mousemove", handleMouseMove);
      }

      // Dispose resources
      logoGroup.traverse((c) => {
        const mesh = c as THREE.Mesh;
        if (mesh.isMesh && mesh.geometry) mesh.geometry.dispose();
      });
      chromeMaterial.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [enableMouseFollow, enableAutoRotate, scrollRotateSpeed, scale, interactive, positionMode]);

  return <div ref={containerRef} className={`relative overflow-visible ${className}`} />;
}

