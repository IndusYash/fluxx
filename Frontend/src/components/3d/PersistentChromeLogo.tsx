import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introManager } from "@/lib/introState";

interface PersistentChromeLogoProps {
  isMobile?: boolean;
}

export default function PersistentChromeLogo({ isMobile: propIsMobile }: PersistentChromeLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isMobile = propIsMobile !== undefined ? propIsMobile : width < 768;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─────────────────────────────────────────────────────────────
    // 1. THREE.JS SCENE, CAMERA, RENDERER
    // ─────────────────────────────────────────────────────────────
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
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // ─────────────────────────────────────────────────────────────
    // 2. MONOCHROME STUDIO ENVIRONMENT MAP
    // ─────────────────────────────────────────────────────────────
    const envCanvas = document.createElement("canvas");
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext("2d");
    if (envCtx) {
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

    // ─────────────────────────────────────────────────────────────
    // 3. CHROME MATERIAL (supports transparency for fade out)
    // ─────────────────────────────────────────────────────────────
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbfbff,
      metalness: 0.96,
      roughness: 0.05,
      clearcoat: 0.9,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
      envMapIntensity: 2.8,
      transparent: true,
      opacity: 1.0,
    });

    // ─────────────────────────────────────────────────────────────
    // 4. BEVELED 5X5 FLUX LOGO MODEL WITH CENTERED ROTATION PIVOT
    // ─────────────────────────────────────────────────────────────
    const logoOuterGroup = new THREE.Group(); // Handles world position, scale, and rotation
    const logoInnerGroup = new THREE.Group(); // Holds block meshes, centered precisely at (0,0,0)

    const createBeveledBlock = (
      w: number,
      h: number,
      x: number,
      y: number,
      bevelR: number = 0.05
    ) => {
      const shape = new THREE.Shape();
      const hw = w / 2;
      const hh = h / 2;
      const r = Math.min(bevelR, hw * 0.4, hh * 0.4);

      shape.moveTo(-hw + r, -hh);
      shape.lineTo(hw - r, -hh);
      shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
      shape.lineTo(hw, hh - r);
      shape.quadraticCurveTo(hw, hh, hw - r, hh);
      shape.lineTo(-hw + r, hh);
      shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
      shape.lineTo(-hw, -hh + r);
      shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

      const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: 0.52,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.055,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geometry.center();

      const mesh = new THREE.Mesh(geometry, chromeMaterial);
      mesh.position.set(x, y, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    const u = 0.64;

    // Row 2 (top)
    logoInnerGroup.add(createBeveledBlock(u * 0.96, u * 0.96, -u * 1.5, u * 1.5));
    logoInnerGroup.add(createBeveledBlock(u * 2.85, u * 0.96, u * 0.6, u * 1.5));

    // Row 1
    logoInnerGroup.add(createBeveledBlock(u * 0.96, u * 0.96, -u * 0.5, u * 0.5));

    // Row 0 (middle crossbar)
    logoInnerGroup.add(createBeveledBlock(u * 0.96, u * 0.96, -u * 1.5, -u * 0.5));
    logoInnerGroup.add(createBeveledBlock(u * 1.9, u * 0.96, u * 0.95, -u * 0.5));

    // Row -1
    logoInnerGroup.add(createBeveledBlock(u * 0.96, u * 0.96, u * 0.5, -u * 1.5));

    // Row -2 (bottom foot)
    logoInnerGroup.add(createBeveledBlock(u * 1.9, u * 0.96, -u * 1.05, -u * 2.0));

    // Center the logo model geometry: Box3 center placed at (0,0,0)
    const logoBox = new THREE.Box3().setFromObject(logoInnerGroup);
    const logoCenter = new THREE.Vector3();
    logoBox.getCenter(logoCenter);
    logoInnerGroup.position.set(-logoCenter.x, -logoCenter.y, -logoCenter.z);

    // Save assembled rest transforms for each block cube
    const originalTransforms: { x: number; y: number; z: number; rx: number; ry: number; rz: number }[] = [];
    logoInnerGroup.children.forEach((c) => {
      originalTransforms.push({
        x: c.position.x,
        y: c.position.y,
        z: c.position.z,
        rx: c.rotation.x,
        ry: c.rotation.y,
        rz: c.rotation.z,
      });
    });

    const isIntroPending = !introManager.isSeenInSession() && !prefersReducedMotion;
    if (isIntroPending) {
      // Scatter blocks off-screen left and right with depth and random rotation
      logoInnerGroup.children.forEach((c, idx) => {
        const sign = idx % 2 === 0 ? -1 : 1;
        const xOffset = sign * (14 + idx * 2.2);
        const yOffset = ((idx % 3) - 1) * 4.2;
        const zOffset = 3.5 + (idx % 3) * 1.8;
        c.position.set(c.position.x + xOffset, c.position.y + yOffset, zOffset);
        c.rotation.set(
          (Math.random() - 0.5) * 4.0,
          (Math.random() - 0.5) * 6.0,
          (Math.random() - 0.5) * 3.0
        );
      });
      logoOuterGroup.position.set(0, 0, 0);
      logoOuterGroup.scale.set(1.15, 1.15, 1.15);
      chromeMaterial.opacity = 0;
      logoOuterGroup.visible = false;
    }

    logoOuterGroup.add(logoInnerGroup);
    scene.add(logoOuterGroup);

    // Keep alias for backward compatibility throughout component
    const logoGroup = logoOuterGroup;

    // ─────────────────────────────────────────────────────────────
    // 5. LIGHTING
    // ─────────────────────────────────────────────────────────────
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

    // ─────────────────────────────────────────────────────────────
    // 6. ANCHOR & COORDINATE HELPERS
    // ─────────────────────────────────────────────────────────────
    const getVisibleBounds = () => {
      const vH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * 2;
      const vW = vH * (width / height);
      return { halfW: vW / 2, halfH: vH / 2, vH, vW };
    };

    // Convert 2D screen coordinate to 3D world coordinate on a target Z-plane (default z=0)
    const screenToWorldOnZ = (screenX: number, screenY: number, targetZ: number = 0): THREE.Vector3 => {
      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;
      const rayTarget = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const dir = rayTarget.sub(camera.position).normalize();
      const t = (targetZ - camera.position.z) / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(t));
    };

    // Convert 3D world coordinate to 2D screen coordinates
    const worldToScreen = (worldPos: THREE.Vector3): { x: number; y: number } => {
      const v = worldPos.clone().project(camera);
      return {
        x: (v.x * 0.5 + 0.5) * window.innerWidth,
        y: (-v.y * 0.5 + 0.5) * window.innerHeight,
      };
    };

    // Read real light beam screen center X from live DOM element
    const getBeamScreenCenterX = (): number => {
      const beam =
        document.querySelector("#beam-light") ||
        document.querySelector("[data-beam]") ||
        document.querySelector("#beam-section .w-\\[3px\\]");
      if (beam) {
        const rect = beam.getBoundingClientRect();
        return rect.left + rect.width / 2;
      }
      return window.innerWidth / 2;
    };

    // Compute the 2D projected screen bounding box of the logo model
    const getLogoProjectedBox = (
      object: THREE.Object3D,
      cam: THREE.Camera
    ): {
      top: number;
      bottom: number;
      left: number;
      right: number;
      width: number;
      height: number;
      centerX: number;
      centerY: number;
    } => {
      const box = new THREE.Box3().setFromObject(object);
      const corners = [
        new THREE.Vector3(box.min.x, box.min.y, box.min.z),
        new THREE.Vector3(box.min.x, box.min.y, box.max.z),
        new THREE.Vector3(box.min.x, box.max.y, box.min.z),
        new THREE.Vector3(box.min.x, box.max.y, box.max.z),
        new THREE.Vector3(box.max.x, box.min.y, box.min.z),
        new THREE.Vector3(box.max.x, box.min.y, box.max.z),
        new THREE.Vector3(box.max.x, box.max.y, box.min.z),
        new THREE.Vector3(box.max.x, box.max.y, box.max.z),
      ];

      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;

      for (const corner of corners) {
        corner.project(cam);
        const sx = (corner.x * 0.5 + 0.5) * window.innerWidth;
        const sy = (-corner.y * 0.5 + 0.5) * window.innerHeight;
        if (sx < minX) minX = sx;
        if (sx > maxX) maxX = sx;
        if (sy < minY) minY = sy;
        if (sy > maxY) maxY = sy;
      }

      return {
        top: minY,
        bottom: maxY,
        left: minX,
        right: maxX,
        width: maxX - minX,
        height: maxY - minY,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2,
      };
    };

    // Calculate world target from DOM anchor bounding rect
    const calculateAnchorWorldPos = (
      anchorSelector: string,
      fallbackNormX: number,
      fallbackNormY: number
    ) => {
      const { halfW, halfH } = getVisibleBounds();
      const el = document.querySelector(anchorSelector) as HTMLElement | null;

      if (!el) {
        return {
          x: (fallbackNormX * 2 - 1) * halfW,
          y: -(fallbackNormY * 2 - 1) * halfH,
        };
      }

      const rect = el.getBoundingClientRect();
      const normX = (rect.left + rect.width / 2) / window.innerWidth;

      const section = el.closest("section") || el.parentElement;
      let normY = fallbackNormY;
      if (section) {
        const sRect = section.getBoundingClientRect();
        // If section is pinned / extended (height > 2*innerHeight), use viewport height for normalization
        const effectiveHeight = sRect.height > 2 * window.innerHeight ? window.innerHeight : sRect.height;
        if (effectiveHeight > 0) {
          normY = (rect.top - sRect.top + rect.height / 2) / effectiveHeight;
        }
      } else {
        normY = (rect.top + rect.height / 2) / window.innerHeight;
      }

      const clampedX = Math.max(0.08, Math.min(0.92, normX));
      const clampedY = Math.max(0.24, Math.min(0.85, normY));

      return {
        x: (clampedX * 2 - 1) * halfW,
        y: -(clampedY * 2 - 1) * halfH,
      };
    };

    // Targets for each anchor stage
    type AnchorStage = "hero" | "statement" | "stats" | "about" | "events" | "faculty" | "achievements" | "footer";

    interface LogoAnchorTarget {
      x: number;
      y: number;
      scale: number;
      opacity: number;
    }

    const computeFacultyAnchorTarget = (isMob: boolean): LogoAnchorTarget => {
      const beamCenterX = getBeamScreenCenterX();
      const facultyWorldX = screenToWorldOnZ(beamCenterX, 0, 0).x;

      // Real navbar height & bounding rect
      const navEl = document.querySelector("header") || document.querySelector("nav");
      const navRect = navEl ? navEl.getBoundingClientRect() : null;
      const navBottom = navRect ? Math.max(navRect.bottom, 60) : 74;
      const minScreenYTop = navBottom + 28; // Logo top at least navbar height + 28px below viewport top

      // Read real heading and cards bounding rects (section-relative to remain constant regardless of initial scroll)
      const beamSec = document.querySelector("#beam-section");
      const beamSecRect = beamSec ? beamSec.getBoundingClientRect() : null;
      const headingEl =
        document.querySelector("#research-mentorship-heading") ||
        document.querySelector("#beam-section h3");
      const cardsEl =
        document.querySelector("#faculty-cards-container") ||
        document.querySelector("#beam-section .grid");

      let headingSecTop = 616;
      let cardsSecTop = 684;
      if (beamSecRect) {
        if (headingEl) {
          headingSecTop = headingEl.getBoundingClientRect().top - beamSecRect.top;
        }
        if (cardsEl) {
          cardsSecTop = cardsEl.getBoundingClientRect().top - beamSecRect.top;
        }
      }

      // Middle card can start raised by 180px (50px on mobile)
      const middleCardOffset = isMob ? 50 : 180;
      const maxScreenYBottom = Math.min(headingSecTop, cardsSecTop - middleCardOffset) - 36;

      // Place target center in the safe upper vertical zone
      const targetScreenCenterY = (minScreenYTop + maxScreenYBottom) / 2;
      const facultyWorldY = screenToWorldOnZ(beamCenterX, targetScreenCenterY, 0).y;

      // Calculate scale to guarantee logo's projected bounding box stays strictly inside the safe zone
      const availableHeight = Math.max(160, maxScreenYBottom - minScreenYTop);
      const vH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * 2;
      const pxPerWorldUnit = height / vH;
      const modelWorldHeight = 2.944; // full unscaled height of 5x5 beveled logo model
      const safeLogoHeightPx = availableHeight * 0.74; // generous clearance margin (top and bottom)
      const calculatedScale = safeLogoHeightPx / (modelWorldHeight * pxPerWorldUnit);
      const facultyScale = Math.min(isMob ? 0.55 : 0.68, Math.max(0.35, calculatedScale));

      return {
        x: facultyWorldX,
        y: facultyWorldY,
        scale: facultyScale,
        opacity: 1.0,
      };
    };

    const computeAllTargets = (): Record<AnchorStage, LogoAnchorTarget> => {
      const mob = window.innerWidth < 768;
      const facultyTarget = computeFacultyAnchorTarget(mob);

      if (mob) {
        // Mobile Simplified Anchors: Hero, Faculty, Footer only
        const heroPos = calculateAnchorWorldPos('[data-logo-anchor="hero"]', 0.5, 0.46);
        const footerPos = calculateAnchorWorldPos('[data-logo-anchor="footer"]', 0.5, 0.20);

        return {
          hero: { x: 0, y: heroPos.y, scale: 0.72, opacity: 1.0 },
          statement: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
          stats: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
          about: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
          events: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
          faculty: facultyTarget,
          achievements: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
          footer: { x: 0, y: footerPos.y, scale: 0.60, opacity: 1.0 },
        };
      }

      // Desktop / Tablet Anchors
      const heroFallbackNormX = width >= 1600 ? 0.75 : width >= 1280 ? 0.76 : 0.74;
      const heroPos = calculateAnchorWorldPos('[data-logo-anchor="hero"]', heroFallbackNormX, 0.48);
      const stmtPos = calculateAnchorWorldPos('[data-logo-anchor="statement"]', 0.86, 0.50);
      const aboutPos = calculateAnchorWorldPos('[data-logo-anchor="about"]', 0.88, 0.22);
      const eventsPos = calculateAnchorWorldPos('[data-logo-anchor="events"]', 0.90, 0.38);
      const footerPos = calculateAnchorWorldPos('[data-logo-anchor="footer"]', 0.5, 0.20);

      const heroScale = width >= 1600 ? 1.05 : width >= 1280 ? 0.98 : 0.92;
      const footerScale = width >= 1600 ? 0.84 : width >= 1280 ? 0.78 : 0.72;

      return {
        hero: { x: heroPos.x, y: heroPos.y, scale: heroScale, opacity: 1.0 },
        statement: { x: stmtPos.x, y: stmtPos.y, scale: 0.70, opacity: 0.95 },
        stats: { x: 0, y: 0, scale: 0.45, opacity: 0.0 },
        about: { x: aboutPos.x, y: aboutPos.y, scale: 0.38, opacity: 0.26 },
        events: { x: eventsPos.x, y: eventsPos.y, scale: 0.26, opacity: 0.15 },
        faculty: facultyTarget,
        achievements: { x: 0, y: 0, scale: 0.5, opacity: 0.0 },
        footer: { x: 0, y: footerPos.y, scale: footerScale, opacity: 1.0 },
      };
    };

    let targets = computeAllTargets();

    // ─────────────────────────────────────────────────────────────
    // 7. CURRENT ANIMATION STATE PROXY & INTRO HOOKS
    // ─────────────────────────────────────────────────────────────
    const currentLogoState = {
      x: isIntroPending ? 0 : targets.hero.x,
      y: isIntroPending ? 0 : targets.hero.y,
      scale: isIntroPending ? 1.15 : targets.hero.scale,
      opacity: isIntroPending ? 0.0 : targets.hero.opacity,
    };

    // The animated mesh proxy
    logoGroup.position.set(currentLogoState.x, currentLogoState.y, 0);
    logoGroup.scale.set(currentLogoState.scale, currentLogoState.scale, currentLogoState.scale);
    chromeMaterial.opacity = currentLogoState.opacity;

    // Register Intro Orchestration Hooks
    introManager.registerHooks({
      onAssemble: (tl: gsap.core.Timeline, startTime: number) => {
        logoGroup.position.set(0, 0, 0);
        logoGroup.scale.set(1.15, 1.15, 1.15);
        chromeMaterial.opacity = 1.0;
        currentLogoState.x = 0;
        currentLogoState.y = 0;
        currentLogoState.scale = 1.15;
        currentLogoState.opacity = 1.0;
        lerpPos.x = 0;
        lerpPos.y = 0;
        lerpPos.scale = 1.15;
        lerpPos.opacity = 1.0;
        logoGroup.visible = true;

        logoInnerGroup.children.forEach((c, idx) => {
          const orig = originalTransforms[idx];
          if (!orig) return;
          tl.to(
            c.position,
            {
              x: orig.x,
              y: orig.y,
              z: orig.z,
              duration: 1.25,
              ease: "power3.out",
            },
            startTime + idx * 0.04
          );
          tl.to(
            c.rotation,
            {
              x: orig.rx,
              y: orig.ry,
              z: orig.rz,
              duration: 1.25,
              ease: "power3.out",
            },
            startTime + idx * 0.04
          );
        });
      },

      shakeCamera: () => {
        const shakeTl = gsap.timeline();
        shakeTl
          .to(camera.position, { x: 0.12, y: -0.09, duration: 0.05, ease: "power1.inOut" })
          .to(camera.position, { x: -0.10, y: 0.08, duration: 0.05, ease: "power1.inOut" })
          .to(camera.position, { x: 0.06, y: -0.05, duration: 0.05, ease: "power1.inOut" })
          .to(camera.position, { x: 0, y: 0, z: 8.8, duration: 0.08, ease: "power2.out" });
      },

      onGlideToHero: (tl: gsap.core.Timeline, startTime: number) => {
        targets = computeAllTargets();
        tl.to(
          logoGroup.position,
          {
            x: targets.hero.x,
            y: targets.hero.y,
            z: 0,
            duration: 1.4,
            ease: "power3.inOut",
            onUpdate: () => {
              currentLogoState.x = logoGroup.position.x;
              currentLogoState.y = logoGroup.position.y;
              lerpPos.x = logoGroup.position.x;
              lerpPos.y = logoGroup.position.y;
            },
          },
          startTime
        );
        tl.to(
          logoGroup.scale,
          {
            x: targets.hero.scale,
            y: targets.hero.scale,
            z: targets.hero.scale,
            duration: 1.4,
            ease: "power3.inOut",
            onUpdate: () => {
              currentLogoState.scale = logoGroup.scale.x;
              lerpPos.scale = logoGroup.scale.x;
            },
            onComplete: () => {
              currentLogoState.x = targets.hero.x;
              currentLogoState.y = targets.hero.y;
              currentLogoState.scale = targets.hero.scale;
              currentLogoState.opacity = targets.hero.opacity;
              lerpPos.x = targets.hero.x;
              lerpPos.y = targets.hero.y;
              lerpPos.scale = targets.hero.scale;
              lerpPos.opacity = targets.hero.opacity;
            },
          },
          startTime
        );
      },

      snapToHero: () => {
        targets = computeAllTargets();
        logoInnerGroup.children.forEach((c, idx) => {
          const orig = originalTransforms[idx];
          if (orig) {
            c.position.set(orig.x, orig.y, orig.z);
            c.rotation.set(orig.rx, orig.ry, orig.rz);
          }
        });
        logoGroup.position.set(targets.hero.x, targets.hero.y, 0);
        logoGroup.scale.set(targets.hero.scale, targets.hero.scale, targets.hero.scale);
        currentLogoState.x = targets.hero.x;
        currentLogoState.y = targets.hero.y;
        currentLogoState.scale = targets.hero.scale;
        currentLogoState.opacity = targets.hero.opacity;
        lerpPos.x = targets.hero.x;
        lerpPos.y = targets.hero.y;
        lerpPos.scale = targets.hero.scale;
        lerpPos.opacity = targets.hero.opacity;
        chromeMaterial.opacity = targets.hero.opacity;
        logoGroup.visible = true;
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 8. GSAP SCROLLTRIGGER TIMELINE JOURNEY
    // ─────────────────────────────────────────────────────────────
    let isFacultyActive = false;
    const triggers: ScrollTrigger[] = [];

    const initScrollTriggers = () => {
      // Clean up previous triggers
      triggers.forEach((t) => t.kill());
      triggers.length = 0;
      isFacultyActive = false;

      targets = computeAllTargets();
      const mob = window.innerWidth < 768;

      if (mob) {
        // MOBILE JOURNEY: Hero -> Faded -> Faculty -> Faded -> Footer
        // 1. Leave Hero -> Fade out
        const t1 = ScrollTrigger.create({
          trigger: "#scroll-text-section",
          start: "top 95%",
          end: "top 65%",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            currentLogoState.opacity = gsap.utils.interpolate(1.0, 0.0, p);
          },
        });
        triggers.push(t1);

        // 2. Approach Faculty -> Glides in smoothly to anchor
        const t2 = ScrollTrigger.create({
          trigger: "#beam-section",
          start: "top 85%",
          end: "top 25%",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            const easeP = gsap.parseEase("power2.out")(p);
            currentLogoState.x = targets.faculty.x;
            currentLogoState.y = targets.faculty.y;
            currentLogoState.scale = gsap.utils.interpolate(0.5, targets.faculty.scale, easeP);
            currentLogoState.opacity = gsap.utils.interpolate(0.0, 1.0, easeP);
          },
        });
        triggers.push(t2);

        // 2b. Faculty Active Lock & Fade Out before cards overlap
        const t2b = ScrollTrigger.create({
          trigger: "#beam-section",
          start: "top 25%",
          end: "top -50px",
          onToggle: (self) => {
            isFacultyActive = self.isActive;
          },
          onUpdate: (self) => {
            const beamSec = document.querySelector("#beam-section");
            const beamTop = beamSec ? beamSec.getBoundingClientRect().top : 0;
            if (beamTop <= 20) {
              const fadeP = Math.min(1, Math.max(0, (20 - beamTop) / 60));
              currentLogoState.opacity = gsap.utils.interpolate(1.0, 0.0, fadeP);
            } else if (self.isActive) {
              currentLogoState.opacity = 1.0;
            }
          },
        });
        triggers.push(t2b);

        // 3. Leave Faculty -> Fade out
        const t3 = ScrollTrigger.create({
          trigger: "#achievement-scene-wrapper",
          start: "top 95%",
          end: "top 60%",
          scrub: 0.5,
          onUpdate: (self) => {
            if (!self.isActive) return;
            const p = self.progress;
            currentLogoState.opacity = gsap.utils.interpolate(1.0, 0.0, p);
          },
          onLeave: () => {
            currentLogoState.opacity = 0.0;
            chromeMaterial.opacity = 0.0;
            logoGroup.visible = false;
          },
          onLeaveBack: () => {
            currentLogoState.opacity = 1.0;
          },
        });
        triggers.push(t3);

        // 3b. Strictly keep logo invisible throughout Achievements & Objectives
        const t3b = ScrollTrigger.create({
          trigger: "#achievement-scene-wrapper",
          start: "top 60%",
          endTrigger: "#footer-showcase-section",
          end: "top 85%",
          onEnter: () => {
            currentLogoState.opacity = 0.0;
            chromeMaterial.opacity = 0.0;
            logoGroup.visible = false;
          },
          onEnterBack: () => {
            currentLogoState.opacity = 0.0;
            chromeMaterial.opacity = 0.0;
            logoGroup.visible = false;
          },
          onUpdate: () => {
            currentLogoState.opacity = 0.0;
          },
        });
        triggers.push(t3b);

        // 4. Approach Footer -> Glides in
        const t4 = ScrollTrigger.create({
          trigger: "#footer-showcase-section",
          start: "top 85%",
          end: "top 30%",
          scrub: 0.8,
          onEnter: () => {
            logoGroup.visible = true;
          },
          onUpdate: (self) => {
            const p = self.progress;
            currentLogoState.x = 0;
            currentLogoState.y = targets.footer.y;
            currentLogoState.scale = gsap.utils.interpolate(0.5, targets.footer.scale, p);
            currentLogoState.opacity = gsap.utils.interpolate(0.0, 1.0, p);
          },
          onLeaveBack: () => {
            currentLogoState.opacity = 0.0;
            chromeMaterial.opacity = 0.0;
            logoGroup.visible = false;
          },
        });
        triggers.push(t4);

        // 5. Leave Footer Showcase -> Fade out immediately as Site Footer enters
        const t5 = ScrollTrigger.create({
          trigger: "#site-footer",
          start: "top bottom+=40",
          end: "top 95%",
          scrub: 0.2,
          onUpdate: (self) => {
            const p = self.progress;
            currentLogoState.opacity = gsap.utils.interpolate(1.0, 0.0, p);
            currentLogoState.y = targets.footer.y + p * 2.5;
          },
          onLeave: () => {
            currentLogoState.opacity = 0.0;
          },
          onLeaveBack: () => {
            currentLogoState.opacity = 1.0;
          },
        });
        triggers.push(t5);

        return;
      }

      // DESKTOP / TABLET JOURNEY:
      // Stage 1: Hero -> Statement
      const st1 = ScrollTrigger.create({
        trigger: "#scroll-text-section",
        start: "top bottom",
        end: "top top",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.x = gsap.utils.interpolate(targets.hero.x, targets.statement.x, p);
          currentLogoState.y = gsap.utils.interpolate(targets.hero.y, targets.statement.y, p);
          currentLogoState.scale = gsap.utils.interpolate(targets.hero.scale, targets.statement.scale, p);
          currentLogoState.opacity = gsap.utils.interpolate(targets.hero.opacity, targets.statement.opacity, p);
        },
      });
      triggers.push(st1);

      // Stage 1b: Statement Pin Hold (firmly locks logo on right while ScrollTextSection is pinned)
      const st1b = ScrollTrigger.create({
        trigger: "#scroll-text-section",
        start: "top top",
        end: "+=120%",
        onEnter: () => {
          currentLogoState.x = targets.statement.x;
          currentLogoState.y = targets.statement.y;
          currentLogoState.scale = targets.statement.scale;
          currentLogoState.opacity = targets.statement.opacity;
        },
        onEnterBack: () => {
          currentLogoState.x = targets.statement.x;
          currentLogoState.y = targets.statement.y;
          currentLogoState.scale = targets.statement.scale;
          currentLogoState.opacity = targets.statement.opacity;
        },
        onUpdate: (self) => {
          if (self.isActive) {
            currentLogoState.x = targets.statement.x;
            currentLogoState.y = targets.statement.y;
            currentLogoState.scale = targets.statement.scale;
            currentLogoState.opacity = targets.statement.opacity;
          }
        },
      });
      triggers.push(st1b);

      // Stage 2: Statement -> Stats (Fade out)
      const st2 = ScrollTrigger.create({
        trigger: "#liquid-transition-section",
        start: "top bottom",
        end: "top 70%",
        scrub: 0.6,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.opacity = gsap.utils.interpolate(targets.statement.opacity, 0.0, p);
        },
      });
      triggers.push(st2);

      // Stage 3: Stats -> About (Corner parked)
      const st3 = ScrollTrigger.create({
        trigger: "#legacy-section",
        start: "top 85%",
        end: "top 35%",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.x = targets.about.x;
          currentLogoState.y = targets.about.y;
          currentLogoState.scale = gsap.utils.interpolate(0.3, targets.about.scale, p);
          currentLogoState.opacity = gsap.utils.interpolate(0.0, targets.about.opacity, p);
        },
      });
      triggers.push(st3);

      // Stage 3b: About -> Events Showcase (Glides to far-right parked position, small scale, 15% opacity)
      const stEvents = ScrollTrigger.create({
        trigger: "#events-showcase-section",
        start: "top 85%",
        end: "top 25%",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.x = gsap.utils.interpolate(targets.about.x, targets.events.x, p);
          currentLogoState.y = gsap.utils.interpolate(targets.about.y, targets.events.y, p);
          currentLogoState.scale = gsap.utils.interpolate(targets.about.scale, targets.events.scale, p);
          currentLogoState.opacity = gsap.utils.interpolate(targets.about.opacity, targets.events.opacity, p);
        },
      });
      triggers.push(stEvents);

      // Stage 4: Events -> Faculty (Glides from far right to center beam)
      const st4 = ScrollTrigger.create({
        trigger: "#beam-section",
        start: "top 85%",
        end: "top 20%",
        scrub: 0.8,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          const easeP = gsap.parseEase("power2.out")(p);
          currentLogoState.x = gsap.utils.interpolate(targets.events.x, targets.faculty.x, easeP);
          currentLogoState.y = gsap.utils.interpolate(targets.events.y, targets.faculty.y, easeP);
          currentLogoState.scale = gsap.utils.interpolate(targets.events.scale, targets.faculty.scale, easeP);
          currentLogoState.opacity = gsap.utils.interpolate(targets.events.opacity, targets.faculty.opacity, easeP);
        },
      });
      triggers.push(st4);

      // Stage 4b: Faculty Active Lock & Fade Out before heading/cards approach
      const st4b = ScrollTrigger.create({
        trigger: "#beam-section",
        start: "top 20%",
        end: "top -50px",
        onToggle: (self) => {
          isFacultyActive = self.isActive;
        },
        onUpdate: (self) => {
          const beamSec = document.querySelector("#beam-section");
          const beamTop = beamSec ? beamSec.getBoundingClientRect().top : 0;
          if (beamTop <= 20) {
            const fadeP = Math.min(1, Math.max(0, (20 - beamTop) / 60));
            currentLogoState.opacity = gsap.utils.interpolate(1.0, 0.0, fadeP);
          } else if (self.isActive) {
            currentLogoState.opacity = 1.0;
          }
        },
      });
      triggers.push(st4b);

      // Stage 5: Faculty -> Achievements (Fade out cleanly as Achievements approaches)
      const st5 = ScrollTrigger.create({
        trigger: "#achievement-scene-wrapper",
        start: "top 95%",
        end: "top 60%",
        scrub: 0.5,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.opacity = gsap.utils.interpolate(targets.faculty.opacity, 0.0, p);
        },
        onLeave: () => {
          currentLogoState.opacity = 0.0;
          chromeMaterial.opacity = 0.0;
          logoGroup.visible = false;
        },
        onLeaveBack: () => {
          currentLogoState.opacity = targets.faculty.opacity;
        },
      });
      triggers.push(st5);

      // Stage 5b: Strictly keep logo invisible throughout Achievements & Objectives until Footer Showcase
      const st5b = ScrollTrigger.create({
        trigger: "#achievement-scene-wrapper",
        start: "top 60%",
        endTrigger: "#footer-showcase-section",
        end: "top 85%",
        onEnter: () => {
          currentLogoState.opacity = 0.0;
          chromeMaterial.opacity = 0.0;
          logoGroup.visible = false;
        },
        onEnterBack: () => {
          currentLogoState.opacity = 0.0;
          chromeMaterial.opacity = 0.0;
          logoGroup.visible = false;
        },
        onUpdate: () => {
          currentLogoState.opacity = 0.0;
        },
      });
      triggers.push(st5b);

      // Stage 6: Gallery -> Footer (Glides to center large above CTA)
      const st6 = ScrollTrigger.create({
        trigger: "#footer-showcase-section",
        start: "top 85%",
        end: "top 25%",
        scrub: 0.8,
        onEnter: () => {
          logoGroup.visible = true;
        },
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.x = targets.footer.x;
          currentLogoState.y = targets.footer.y;
          currentLogoState.scale = gsap.utils.interpolate(0.65, targets.footer.scale, p);
          currentLogoState.opacity = gsap.utils.interpolate(0.0, targets.footer.opacity, p);
        },
        onLeaveBack: () => {
          currentLogoState.opacity = 0.0;
          chromeMaterial.opacity = 0.0;
          logoGroup.visible = false;
        },
      });
      triggers.push(st6);

      // Stage 7: Footer Showcase -> Site Footer (Fade out & lift off so logo never moves into site footer)
      const st7 = ScrollTrigger.create({
        trigger: "#site-footer",
        start: "top bottom+=40",
        end: "top 95%",
        scrub: 0.2,
        onUpdate: (self) => {
          if (!self.isActive) return;
          const p = self.progress;
          currentLogoState.opacity = gsap.utils.interpolate(targets.footer.opacity, 0.0, p);
          currentLogoState.y = targets.footer.y + p * 2.5;
        },
        onLeave: () => {
          currentLogoState.opacity = 0.0;
        },
        onLeaveBack: () => {
          currentLogoState.opacity = targets.footer.opacity;
        },
      });
      triggers.push(st7);

      // Sync active trigger state to currentLogoState on init only when intro is done
      if (introManager.isDone()) {
        ScrollTrigger.refresh();
        triggers.forEach((t) => {
          if (t.isActive && t.vars.onUpdate) {
            t.vars.onUpdate(t);
          }
        });
      }
    };

    // Recompute on ScrollTrigger.refresh()
    const handleScrollTriggerRefresh = () => {
      targets = computeAllTargets();
    };
    ScrollTrigger.addEventListener("refresh", handleScrollTriggerRefresh);

    // Subscribe to intro manager so triggers are initialized cleanly once intro completes
    const unsubscribeIntro = introManager.subscribe((state) => {
      if (state === "done") {
        initScrollTriggers();
      }
    });

    // Small timeout to allow layout to settle before calculating bounding rects
    const initTimer = setTimeout(() => {
      if (introManager.isDone()) {
        initScrollTriggers();
      }
    }, 120);

    // ─────────────────────────────────────────────────────────────
    // 9. MOUSE TILT & SCROLL VELOCITY SPIN
    // ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -((e.clientY / window.innerHeight) * 2 - 1);
      mouse.targetX = normX;
      mouse.targetY = normY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollVelocity = 0;

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      const dy = window.scrollY - lastScrollY;
      scrollVelocity = (dy / dt) * 1000;
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ─────────────────────────────────────────────────────────────
    // 10. ANIMATION LOOP & GPU RENDER PAUSING
    // ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let accumulatedRotationY = 0;

    const lerpPos = {
      x: currentLogoState.x,
      y: currentLogoState.y,
      scale: currentLogoState.scale,
      opacity: currentLogoState.opacity,
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth position & scale lerp
      if (isFacultyActive) {
        // While faculty section is active: lock x directly to the beam anchor (damp only y and scale)
        const liveBeamWorldX = screenToWorldOnZ(getBeamScreenCenterX(), 0, 0).x;
        currentLogoState.x = liveBeamWorldX;
        lerpPos.x = liveBeamWorldX;

        lerpPos.y += (currentLogoState.y - lerpPos.y) * 0.12;
        lerpPos.scale += (currentLogoState.scale - lerpPos.scale) * 0.12;
      } else {
        lerpPos.x += (currentLogoState.x - lerpPos.x) * 0.12;
        lerpPos.y += (currentLogoState.y - lerpPos.y) * 0.12;
        lerpPos.scale += (currentLogoState.scale - lerpPos.scale) * 0.12;
      }
      lerpPos.opacity += (currentLogoState.opacity - lerpPos.opacity) * 0.12;

      // Update material transparency
      chromeMaterial.opacity = Math.max(0, Math.min(1, lerpPos.opacity));

      // PAUSE RENDERING when fully transparent to eliminate GPU usage & clear canvas buffer
      if (lerpPos.opacity <= 0.003) {
        if (logoGroup.visible) {
          logoGroup.visible = false;
          chromeMaterial.opacity = 0;
          renderer.render(scene, camera);
        }
        return;
      }

      if (!logoGroup.visible) {
        logoGroup.visible = true;
      }

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      // Spin with scroll velocity + base idle drift
      const idleSpin = (isMobile ? 0.3 : 0.42) * delta;
      const velocitySpin = scrollVelocity * 0.000045;
      accumulatedRotationY += idleSpin + velocitySpin;

      logoGroup.position.set(lerpPos.x, lerpPos.y, 0);
      logoGroup.scale.set(lerpPos.scale, lerpPos.scale, lerpPos.scale);

      if (!prefersReducedMotion) {
        // Float y only (damped inside faculty section for stability)
        const floatY = Math.sin(time * 1.3) * (isFacultyActive ? 0.02 : 0.08);
        logoGroup.position.y += floatY;

        if (!isMobile) {
          // Desktop: smooth mouse tilt ONLY rotates, NEVER translates
          mouse.x += (mouse.targetX - mouse.x) * 0.06;
          mouse.y += (mouse.targetY - mouse.y) * 0.06;

          logoGroup.rotation.y = accumulatedRotationY + mouse.x * 0.45;
          logoGroup.rotation.x = -mouse.y * 0.35 + Math.sin(time * 0.8) * 0.05;
          logoGroup.rotation.z = mouse.x * 0.12;
        } else {
          // Mobile: cursor tilt disabled
          logoGroup.rotation.y = accumulatedRotationY;
          logoGroup.rotation.x = Math.sin(time * 0.8) * 0.05;
          logoGroup.rotation.z = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Expose QA inspection data on window
    (window as any).__getLogoQAData = () => {
      const beamCenterX = getBeamScreenCenterX();
      const logoScreenPos = worldToScreen(logoGroup.position);
      const projectedBox = getLogoProjectedBox(logoGroup, camera);
      const navEl = document.querySelector("header") || document.querySelector("nav");
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 74;
      const headingEl = document.querySelector("#research-mentorship-heading");
      const headingTop = headingEl ? headingEl.getBoundingClientRect().top : 9999;
      const cardsEl = document.querySelector("#faculty-cards-container");
      const cardsTop = cardsEl ? cardsEl.getBoundingClientRect().top : 9999;

      return {
        isFacultyActive,
        beamCenterX,
        logoScreenCenterX: logoScreenPos.x,
        diffX: Math.abs(beamCenterX - logoScreenPos.x),
        navBottom,
        logoTop: projectedBox.top,
        logoBottom: projectedBox.bottom,
        clearanceNav: projectedBox.top - navBottom,
        clearanceHeading: headingTop - projectedBox.bottom,
        clearanceCards: cardsTop - projectedBox.bottom,
        opacity: chromeMaterial.opacity,
        scale: logoGroup.scale.x,
        scrollY: window.scrollY,
      };
    };

    // ─────────────────────────────────────────────────────────────
    // 11. RESIZE & CLEANUP
    // ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = propIsMobile !== undefined ? propIsMobile : width < 768;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      initScrollTriggers();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animId);
      unsubscribeIntro();
      triggers.forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", handleScrollTriggerRefresh);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", onScroll);
      delete (window as any).__getLogoQAData;

      // Clean Three.js resources
      logoInnerGroup.children.forEach((c) => {
        const mesh = c as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      chromeMaterial.dispose();
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [propIsMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[15] overflow-visible w-full h-full"
      aria-hidden="true"
    />
  );
}

