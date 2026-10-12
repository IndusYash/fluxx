import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { introManager } from "@/lib/introState";
import {
  buildLogoInnerGroup,
  LOGO_UNIT_SIZE,
  LOGO_BLOCK_TABLE,
  getLogoBlockLayout,
} from "./logoConfig";

interface PersistentChromeLogoProps {
  isMobile?: boolean;
}

declare global {
  interface Window {
    __heroPose?: { x: number; y: number; z: number };
    __getLogoQAData?: () => Record<string, unknown>;
    __renderLogoFrontOn?: () => void;
    __restoreLogoNormal?: () => void;
    __getLogoGridData?: () => {
      table: typeof LOGO_BLOCK_TABLE;
      layout: ReturnType<typeof getLogoBlockLayout>;
      unitSize: number;
    };
  }
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
    let isQaFrontOnMode = false;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ─────────────────────────────────────────────────────────────
    // 1. THREE.JS SCENE, CAMERA, RENDERER
    // ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);
    camera.updateMatrixWorld(true);
    camera.updateProjectionMatrix();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.id = "persistent-chrome-logo-canvas";
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
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.0,
    });

    // ─────────────────────────────────────────────────────────────
    // 4. BEVELED 5X5 FLUX LOGO MODEL WITH CENTERED ROTATION PIVOT
    // ─────────────────────────────────────────────────────────────
    const logoOuterGroup = new THREE.Group(); // Handles world position, scale, and rotation
    const u = LOGO_UNIT_SIZE;
    const { logoInnerGroup } = buildLogoInnerGroup(u, chromeMaterial);

    // Upright front-facing hero pose (0 deg yaw, 0 deg pitch, 0 deg roll - straight without rightward tilt)
    const heroPose = {
      x: 0.0,
      y: 0.0,
      z: 0.0,
    };
    let accumulatedRotationY = heroPose.y;
    window.__heroPose = heroPose;

    const logoInnerBox = new THREE.Box3().setFromObject(logoInnerGroup);
    const logoInnerSize = new THREE.Vector3();
    logoInnerBox.getSize(logoInnerSize);
    const modelWorldHeight = logoInnerSize.y;

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

    const applyAssembledBlocks = () => {
      logoInnerGroup.children.forEach((c, idx) => {
        const orig = originalTransforms[idx];
        if (orig) {
          c.position.set(orig.x, orig.y, orig.z);
          c.rotation.set(orig.rx, orig.ry, orig.rz);
        }
      });
    };

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
    } else {
      applyAssembledBlocks();
      logoOuterGroup.position.set(0, 0, 0);
      logoOuterGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
      logoOuterGroup.scale.set(1.0, 1.0, 1.0);
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
      camera.updateMatrixWorld(true);
      const ndcX = (screenX / window.innerWidth) * 2 - 1;
      const ndcY = -(screenY / window.innerHeight) * 2 + 1;
      const rayTarget = new THREE.Vector3(ndcX, ndcY, 0.5).unproject(camera);
      const dir = rayTarget.sub(camera.position).normalize();
      const t = (targetZ - camera.position.z) / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(t));
    };

    // Convert 3D world coordinate to 2D screen coordinates
    const worldToScreen = (worldPos: THREE.Vector3): { x: number; y: number } => {
      camera.updateMatrixWorld(true);
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

      // Middle card starts raised by 480px (140px on mobile)
      const middleCardOffset = isMob ? 140 : 480;
      const maxScreenYBottom = Math.min(headingSecTop, cardsSecTop - middleCardOffset) - 36;

      // Place target center in the safe upper vertical zone
      const targetScreenCenterY = (minScreenYTop + maxScreenYBottom) / 2;
      const facultyWorldY = screenToWorldOnZ(beamCenterX, targetScreenCenterY, 0).y;

      // Calculate scale to guarantee logo's projected bounding box stays strictly inside the safe zone
      const availableHeight = Math.max(160, maxScreenYBottom - minScreenYTop);
      const vH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * 2;
      const pxPerWorldUnit = height / vH;
      const safeLogoHeightPx = availableHeight * 0.74; // generous clearance margin (top and bottom)
      const calculatedScale = safeLogoHeightPx / (modelWorldHeight * pxPerWorldUnit);
      const facultyScale = Math.min(isMob ? 0.55 : 0.68, Math.max(0.35, calculatedScale));

      return {
        x: facultyWorldX,
        y: facultyWorldY,
        scale: facultyScale,
        opacity: 0.0,
      };
    };

    const getLiveHeroTarget = (isMob: boolean): LogoAnchorTarget => {
      camera.updateMatrixWorld(true);
      const anchorEl = document.querySelector('[data-logo-anchor="hero"]') as HTMLElement | null;
      const heroScale = isMob ? 0.72 : width >= 1600 ? 1.05 : width >= 1280 ? 0.98 : 0.92;

      if (anchorEl) {
        const rect = anchorEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const heroSection = document.querySelector("#hero-section");
          const heroTop = heroSection ? heroSection.getBoundingClientRect().top : 0;
          const screenCenterX = rect.left + rect.width / 2;
          const screenCenterY = (rect.top - heroTop) + rect.height / 2;
          const worldVec = screenToWorldOnZ(screenCenterX, screenCenterY, 0);
          return {
            x: isMob ? 0 : worldVec.x,
            y: worldVec.y,
            scale: heroScale,
            opacity: 1.0,
          };
        }
      }

      const fallbackNormX = isMob ? 0.5 : width >= 1600 ? 0.79 : 0.76;
      const fallbackNormY = 0.5;
      const worldVec = screenToWorldOnZ(fallbackNormX * width, fallbackNormY * height, 0);
      return {
        x: isMob ? 0 : worldVec.x,
        y: worldVec.y,
        scale: heroScale,
        opacity: 1.0,
      };
    };

    const computeHeroTarget = (isMob: boolean): LogoAnchorTarget => {
      return getLiveHeroTarget(isMob);
    };

    const computeAllTargets = (): Record<AnchorStage, LogoAnchorTarget> => {
      const mob = window.innerWidth < 768;
      const heroTarget = computeHeroTarget(mob);
      const facultyTarget = computeFacultyAnchorTarget(mob);

      if (mob) {
        // Mobile Simplified Anchors: Hero, Faculty, Footer only
        const footerPos = calculateAnchorWorldPos('[data-logo-anchor="footer"]', 0.5, 0.20);

        return {
          hero: heroTarget,
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
      const stmtPos = calculateAnchorWorldPos('[data-logo-anchor="statement"]', 0.86, 0.50);
      const aboutPos = calculateAnchorWorldPos('[data-logo-anchor="about"]', 0.88, 0.22);
      const eventsPos = calculateAnchorWorldPos('[data-logo-anchor="events"]', 0.90, 0.38);
      const footerPos = calculateAnchorWorldPos('[data-logo-anchor="footer"]', 0.5, 0.20);

      const footerScale = width >= 1600 ? 0.84 : width >= 1280 ? 0.78 : 0.72;

      return {
        hero: heroTarget,
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
    // 7. CURRENT ANIMATION STATE PROXY & SCROLL TRIGGER TRACKING
    // ─────────────────────────────────────────────────────────────
    let isFacultyActive = false;
    const triggers: ScrollTrigger[] = [];

    const currentLogoState = {
      x: isIntroPending ? 0 : targets.hero.x,
      y: isIntroPending ? 0 : targets.hero.y,
      scale: isIntroPending ? 1.15 : targets.hero.scale,
      opacity: 0.0,
    };

    const lerpPos = {
      x: currentLogoState.x,
      y: currentLogoState.y,
      scale: currentLogoState.scale,
      opacity: 0.0,
    };

    let isGlidingToHero = false;

    // The animated mesh proxy - starts hidden
    logoGroup.position.set(currentLogoState.x, currentLogoState.y, 0);
    logoGroup.scale.set(currentLogoState.scale, currentLogoState.scale, currentLogoState.scale);
    chromeMaterial.opacity = 0.0;
    logoGroup.visible = false;

    let hasFadedIn = false;
    let fadeInTween: gsap.core.Tween | null = null;

    const fadeInLogo = (targetOpacity: number = 1.0) => {
      if (hasFadedIn || !introManager.isDone()) return;
      hasFadedIn = true;
      logoGroup.visible = true;
      chromeMaterial.opacity = 0;
      lerpPos.opacity = 0;

      if (fadeInTween) fadeInTween.kill();
      fadeInTween = gsap.to(chromeMaterial, {
        opacity: targetOpacity,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: () => {
          lerpPos.opacity = chromeMaterial.opacity;
        },
        onComplete: () => {
          lerpPos.opacity = targetOpacity;
          currentLogoState.opacity = targetOpacity;
          fadeInTween = null;
        },
      });
    };

    const syncLogoToCurrentPosition = (instant: boolean = false) => {
      if (isQaFrontOnMode) return;

      camera.updateMatrixWorld(true);
      camera.updateProjectionMatrix();

      targets = computeAllTargets();

      if (!introManager.isDone()) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      let activeTarget: LogoAnchorTarget = targets.hero;
      let hasActiveTrigger = false;

      if (scrollY > 10 && triggers.length > 0) {
        for (const t of triggers) {
          if (t.isActive) {
            if (t.vars.onToggle) {
              t.vars.onToggle(t);
            }
            if (t.vars.onUpdate) {
              t.vars.onUpdate(t);
            }
            activeTarget = {
              x: currentLogoState.x,
              y: currentLogoState.y,
              scale: currentLogoState.scale,
              opacity: currentLogoState.opacity,
            };
            hasActiveTrigger = true;
            break;
          }
        }

        if (!hasActiveTrigger) {
          let lastPassedTrigger: ScrollTrigger | null = null;
          for (const t of triggers) {
            if (scrollY >= t.start) {
              lastPassedTrigger = t;
            }
          }
          if (lastPassedTrigger) {
            if (lastPassedTrigger.vars.onLeave) {
              lastPassedTrigger.vars.onLeave(lastPassedTrigger);
            } else if (lastPassedTrigger.vars.onUpdate) {
              lastPassedTrigger.vars.onUpdate(lastPassedTrigger);
            }
            activeTarget = {
              x: currentLogoState.x,
              y: currentLogoState.y,
              scale: currentLogoState.scale,
              opacity: currentLogoState.opacity,
            };
            hasActiveTrigger = true;
          }
        }
      }

      if (!hasActiveTrigger || scrollY <= 10) {
        activeTarget = targets.hero;
        currentLogoState.x = targets.hero.x;
        currentLogoState.y = targets.hero.y;
        currentLogoState.scale = targets.hero.scale;
        currentLogoState.opacity = targets.hero.opacity;
      }

      if (instant) {
        applyAssembledBlocks();
        logoGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
        accumulatedRotationY = heroPose.y;

        lerpPos.x = activeTarget.x;
        lerpPos.y = activeTarget.y;
        lerpPos.scale = activeTarget.scale;

        logoGroup.position.set(activeTarget.x, activeTarget.y, 0);
        logoGroup.scale.set(activeTarget.scale, activeTarget.scale, activeTarget.scale);
      }
    };

    // Register Intro Orchestration Hooks
    introManager.registerHooks({
      onAssemble: (tl: gsap.core.Timeline, startTime: number) => {
        logoGroup.position.set(0, 0, 0);
        logoGroup.scale.set(1.15, 1.15, 1.15);
        logoGroup.rotation.set(0, -0.6, 0);
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

        tl.to(
          logoGroup.rotation,
          {
            x: 0.0,
            y: 0.0,
            z: 0.0,
            duration: 1.25,
            ease: "power2.out",
          },
          startTime
        );

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

      flashLogo: () => {
        gsap.fromTo(
          chromeMaterial,
          { emissiveIntensity: 0.30 },
          { emissiveIntensity: 0.0, duration: 0.15, ease: "power2.out" }
        );
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
        window.scrollTo(0, 0);
        const mob = window.innerWidth < 768;
        isGlidingToHero = true;

        const startX = 0;
        const startY = 0;
        const startScale = 1.15;
        const startRotX = logoGroup.rotation.x;
        const startRotY = logoGroup.rotation.y;
        const startRotZ = logoGroup.rotation.z;

        // Calculate targetRotY so it rotates forward into heroPose.y without spinning backwards
        let targetRotY = heroPose.y;
        while (targetRotY < startRotY) {
          targetRotY += Math.PI * 2;
        }

        const glideProxy = { progress: 0 };

        tl.to(
          glideProxy,
          {
            progress: 1.0,
            duration: 1.2,
            ease: "power3.inOut",
            onStart: () => {
              isGlidingToHero = true;
              logoGroup.visible = true;
              chromeMaterial.opacity = 1.0;
            },
            onUpdate: () => {
              const p = glideProxy.progress;
              const liveTarget = getLiveHeroTarget(mob);

              const curX = gsap.utils.interpolate(startX, liveTarget.x, p);
              const curY = gsap.utils.interpolate(startY, liveTarget.y, p);
              const curScale = gsap.utils.interpolate(startScale, liveTarget.scale, p);

              const curRotX = gsap.utils.interpolate(startRotX, heroPose.x, p);
              const curRotY = gsap.utils.interpolate(startRotY, targetRotY, p);
              const curRotZ = gsap.utils.interpolate(startRotZ, heroPose.z, p);

              currentLogoState.x = curX;
              currentLogoState.y = curY;
              currentLogoState.scale = curScale;
              currentLogoState.opacity = 1.0;

              lerpPos.x = curX;
              lerpPos.y = curY;
              lerpPos.scale = curScale;
              lerpPos.opacity = 1.0;

              logoGroup.position.set(curX, curY, 0);
              logoGroup.scale.set(curScale, curScale, curScale);
              logoGroup.rotation.set(curRotX, curRotY, curRotZ);
              chromeMaterial.opacity = 1.0;
              logoGroup.visible = true;
            },
            onComplete: () => {
              isGlidingToHero = false;
              const liveTarget = getLiveHeroTarget(mob);
              targets.hero = liveTarget;

              currentLogoState.x = liveTarget.x;
              currentLogoState.y = liveTarget.y;
              currentLogoState.scale = liveTarget.scale;
              currentLogoState.opacity = 1.0;

              lerpPos.x = liveTarget.x;
              lerpPos.y = liveTarget.y;
              lerpPos.scale = liveTarget.scale;
              lerpPos.opacity = 1.0;

              logoGroup.position.set(liveTarget.x, liveTarget.y, 0);
              logoGroup.scale.set(liveTarget.scale, liveTarget.scale, liveTarget.scale);
              logoGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
              accumulatedRotationY = heroPose.y;
              chromeMaterial.opacity = 1.0;
            },
          },
          startTime
        );
      },

      snapToHero: () => {
        isGlidingToHero = false;
        applyAssembledBlocks();
        logoGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
        accumulatedRotationY = heroPose.y;
        syncLogoToCurrentPosition(true);
        fadeInLogo(targets.hero.opacity);
      },
    });

    // ─────────────────────────────────────────────────────────────
    // 8. GSAP SCROLLTRIGGER TIMELINE JOURNEY
    // ─────────────────────────────────────────────────────────────
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
          onEnter: () => {
            isFacultyActive = true;
            currentLogoState.x = targets.faculty.x;
            currentLogoState.y = targets.faculty.y;
            currentLogoState.scale = targets.faculty.scale;
          },
          onEnterBack: () => {
            isFacultyActive = true;
            currentLogoState.x = targets.faculty.x;
            currentLogoState.y = targets.faculty.y;
            currentLogoState.scale = targets.faculty.scale;
          },
          onUpdate: (self) => {
            currentLogoState.x = targets.faculty.x;
            currentLogoState.y = targets.faculty.y;
            currentLogoState.scale = targets.faculty.scale;
            isFacultyActive = self.isActive;
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
        onLeaveBack: () => {
          currentLogoState.x = targets.hero.x;
          currentLogoState.y = targets.hero.y;
          currentLogoState.scale = targets.hero.scale;
          currentLogoState.opacity = targets.hero.opacity;
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
        onLeave: () => {
          currentLogoState.opacity = 0.0;
        },
        onEnterBack: () => {
          currentLogoState.opacity = 0.0;
        },
      });
      triggers.push(st2);

      // Stage 2b: Stats Section Hold (strictly 0 opacity while in Stats section)
      const stStatsHold = ScrollTrigger.create({
        trigger: "#liquid-transition-section",
        start: "top 70%",
        endTrigger: "#legacy-section",
        end: "top top",
        onEnter: () => {
          currentLogoState.opacity = 0.0;
        },
        onEnterBack: () => {
          currentLogoState.opacity = 0.0;
        },
        onUpdate: () => {
          currentLogoState.opacity = 0.0;
        },
      });
      triggers.push(stStatsHold);

      // Stage 3: Stats -> About (Corner parked)
      // Must stay strictly hidden/faded over the white stats section and only fade in once About covers the screen
      const st3 = ScrollTrigger.create({
        trigger: "#legacy-section",
        start: "top top",
        end: "+=40%",
        scrub: 0.8,
        onLeaveBack: () => {
          currentLogoState.opacity = 0.0;
        },
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

      // Stage 3c: Events Showcase Pin Hold (Firmly keeps logo parked at far-right target while slider scrubs)
      const stEventsHold = ScrollTrigger.create({
        trigger: "#events-showcase-section",
        start: "top 25%",
        endTrigger: "#beam-section",
        end: "top 85%",
        onEnter: () => {
          currentLogoState.x = targets.events.x;
          currentLogoState.y = targets.events.y;
          currentLogoState.scale = targets.events.scale;
          currentLogoState.opacity = targets.events.opacity;
        },
        onEnterBack: () => {
          currentLogoState.x = targets.events.x;
          currentLogoState.y = targets.events.y;
          currentLogoState.scale = targets.events.scale;
          currentLogoState.opacity = targets.events.opacity;
        },
        onUpdate: (self) => {
          if (self.isActive) {
            currentLogoState.x = targets.events.x;
            currentLogoState.y = targets.events.y;
            currentLogoState.scale = targets.events.scale;
            currentLogoState.opacity = targets.events.opacity;
          }
        },
      });
      triggers.push(stEventsHold);

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
        onEnter: () => {
          isFacultyActive = true;
          currentLogoState.x = targets.faculty.x;
          currentLogoState.y = targets.faculty.y;
          currentLogoState.scale = targets.faculty.scale;
        },
        onEnterBack: () => {
          isFacultyActive = true;
          currentLogoState.x = targets.faculty.x;
          currentLogoState.y = targets.faculty.y;
          currentLogoState.scale = targets.faculty.scale;
        },
        onUpdate: (self) => {
          currentLogoState.x = targets.faculty.x;
          currentLogoState.y = targets.faculty.y;
          currentLogoState.scale = targets.faculty.scale;
          isFacultyActive = self.isActive;
          currentLogoState.opacity = targets.faculty.opacity;
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
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(false);
      }
    };

    // Recompute on ScrollTrigger.refresh()
    const handleScrollTriggerRefresh = () => {
      if (introManager.isDone()) {
        syncLogoToCurrentPosition(false);
      }
    };
    ScrollTrigger.addEventListener("refresh", handleScrollTriggerRefresh);

    // Initial startup execution: if intro is already done, apply layout INSTANTLY and fade in!
    if (introManager.isDone()) {
      applyAssembledBlocks();
      logoGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
      accumulatedRotationY = heroPose.y;
      initScrollTriggers();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      syncLogoToCurrentPosition(true);
      fadeInLogo(currentLogoState.opacity);
    }

    // Subscribe to intro manager so triggers and positions are initialized cleanly on completion/skip
    const unsubscribeIntro = introManager.subscribe((state) => {
      if (state === "done") {
        isGlidingToHero = false;
        applyAssembledBlocks();
        logoGroup.rotation.set(heroPose.x, heroPose.y, heroPose.z);
        accumulatedRotationY = heroPose.y;
        initScrollTriggers();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(true);
        fadeInLogo(currentLogoState.opacity);
      }
    });

    // Recompute when fonts finish loading so position stays exact without any scroll
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (introManager.isDone()) {
          camera.updateMatrixWorld(true);
          camera.updateProjectionMatrix();
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          syncLogoToCurrentPosition(false);
          fadeInLogo(currentLogoState.opacity);
        }
      });
    }

    // Timeouts to allow hero DOM layout to settle
    const settleTimer1 = setTimeout(() => {
      if (introManager.isDone()) {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(false);
        fadeInLogo(currentLogoState.opacity);
      }
    }, 50);

    const settleTimer2 = setTimeout(() => {
      if (introManager.isDone()) {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(false);
        fadeInLogo(currentLogoState.opacity);
      }
    }, 120);

    // ResizeObserver on Hero section and Anchor element
    const heroSection = document.querySelector("#hero-section");
    const heroAnchor = document.querySelector('[data-logo-anchor="hero"]');
    const heroResizeObserver = new ResizeObserver(() => {
      if (introManager.isDone()) {
        camera.updateMatrixWorld(true);
        camera.updateProjectionMatrix();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(false);
      }
    });
    if (heroSection) heroResizeObserver.observe(heroSection);
    if (heroAnchor) heroResizeObserver.observe(heroAnchor);

    // Back/forward cache (pageshow) handling
    const handlePageShow = () => {
      camera.updateMatrixWorld(true);
      camera.updateProjectionMatrix();
      if (introManager.isDone()) {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        syncLogoToCurrentPosition(true);
        fadeInLogo(currentLogoState.opacity);
      }
    };
    window.addEventListener("pageshow", handlePageShow);

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
    let qaOrthoCamera: THREE.OrthographicCamera | null = null;
    let qaFlatMaterial: THREE.MeshBasicMaterial | null = null;
    let savedStateBeforeQa: {
      posX: number;
      posY: number;
      posZ: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      scaleX: number;
      scaleY: number;
      scaleZ: number;
      opacity: number;
    } | null = null;

    const renderFrontOn = (options?: { flatLighting?: boolean }) => {
      const flat = options?.flatLighting !== false;
      if (!isQaFrontOnMode) {
        savedStateBeforeQa = {
          posX: logoOuterGroup.position.x,
          posY: logoOuterGroup.position.y,
          posZ: logoOuterGroup.position.z,
          rotX: logoOuterGroup.rotation.x,
          rotY: logoOuterGroup.rotation.y,
          rotZ: logoOuterGroup.rotation.z,
          scaleX: logoOuterGroup.scale.x,
          scaleY: logoOuterGroup.scale.y,
          scaleZ: logoOuterGroup.scale.z,
          opacity: chromeMaterial.opacity,
        };
      }
      isQaFrontOnMode = true;

      logoOuterGroup.position.set(0, 0, 0);
      logoOuterGroup.rotation.set(0, 0, 0);
      logoOuterGroup.scale.set(1, 1, 1);
      logoInnerGroup.rotation.set(0, 0, 0);

      logoInnerGroup.children.forEach((c, idx) => {
        const orig = originalTransforms[idx];
        if (orig) {
          c.position.set(orig.x, orig.y, orig.z);
          c.rotation.set(orig.rx, orig.ry, orig.rz);
        }
      });

      if (flat) {
        if (!qaFlatMaterial) {
          qaFlatMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        }
        logoInnerGroup.children.forEach((c) => {
          (c as THREE.Mesh).material = qaFlatMaterial!;
        });
        scene.background = new THREE.Color(0x000000);
        renderer.setClearColor(0x000000, 1.0);
      } else {
        logoInnerGroup.children.forEach((c) => {
          (c as THREE.Mesh).material = chromeMaterial;
        });
        scene.background = null;
        renderer.setClearColor(0x000000, 0.0);
      }
      chromeMaterial.opacity = 1.0;
      logoOuterGroup.visible = true;

      const halfH = 2.5 * u * 1.05;
      const aspect = width / height;
      const halfW = halfH * aspect;
      qaOrthoCamera = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, 0.1, 50);
      qaOrthoCamera.position.set(0, 0, 10);
      qaOrthoCamera.lookAt(0, 0, 0);

      renderer.render(scene, qaOrthoCamera);

      return {
        unitSize: u,
        gridHalfH: halfH,
        gridHalfW: halfW,
        viewportWidth: width,
        viewportHeight: height,
        table: LOGO_BLOCK_TABLE,
        dataUrl: renderer.domElement.toDataURL("image/png"),
      };
    };

    const restoreNormal = () => {
      if (!isQaFrontOnMode) return;
      isQaFrontOnMode = false;
      if (savedStateBeforeQa) {
        logoOuterGroup.position.set(savedStateBeforeQa.posX, savedStateBeforeQa.posY, savedStateBeforeQa.posZ);
        logoOuterGroup.rotation.set(savedStateBeforeQa.rotX, savedStateBeforeQa.rotY, savedStateBeforeQa.rotZ);
        logoOuterGroup.scale.set(savedStateBeforeQa.scaleX, savedStateBeforeQa.scaleY, savedStateBeforeQa.scaleZ);
        chromeMaterial.opacity = savedStateBeforeQa.opacity;
      }
      logoInnerGroup.children.forEach((c) => {
        (c as THREE.Mesh).material = chromeMaterial;
      });
      scene.background = null;
      renderer.setClearColor(0x000000, 0.0);
      qaOrthoCamera = null;
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isQaFrontOnMode && qaOrthoCamera) {
        logoGroup.position.set(0, 0, 0);
        logoGroup.rotation.set(0, 0, 0);
        logoGroup.scale.set(1, 1, 1);
        logoInnerGroup.rotation.set(0, 0, 0);
        renderer.render(scene, qaOrthoCamera);
        return;
      }

      // Smooth position & scale lerp
      // Smooth position & scale lerp
      if (isGlidingToHero) {
        // While gliding to hero: the gsap tween directly drives position, scale, and rotation onUpdate.
        // Don't let lerp fighting disrupt the exact live curve.
      } else if (isFacultyActive) {
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

        if (window.scrollY <= 10 && introManager.isDone()) {
          if (Math.abs(currentLogoState.x - lerpPos.x) < 0.04) lerpPos.x = currentLogoState.x;
          if (Math.abs(currentLogoState.y - lerpPos.y) < 0.04) lerpPos.y = currentLogoState.y;
          if (Math.abs(currentLogoState.scale - lerpPos.scale) < 0.01) lerpPos.scale = currentLogoState.scale;
        }
      }
      lerpPos.opacity += (currentLogoState.opacity - lerpPos.opacity) * 0.12;

      // Update material transparency
      chromeMaterial.opacity = Math.max(0, Math.min(1, lerpPos.opacity));

      // PAUSE RENDERING when fully transparent to eliminate GPU usage & clear canvas buffer
      if (lerpPos.opacity <= 0.003 && currentLogoState.opacity <= 0.003 && !fadeInTween) {
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

      // Hero scroll blend factor:
      // First ~40% of the hero's scroll distance (hero height = window.innerHeight)
      const heroScrollDistance = window.innerHeight;
      const blendDistance = 0.4 * heroScrollDistance;
      const scrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
      const rawScrollNorm = blendDistance > 0 ? Math.min(1.0, scrollY / blendDistance) : 1.0;
      // Smoothstep: 3*u^2 - 2*u^3
      const scrollBlend = rawScrollNorm * rawScrollNorm * (3.0 - 2.0 * rawScrollNorm);

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      // In the hero (scrollBlend === 0), freeze spin, tilt, and scroll-velocity rotation completely.
      // Rotation returns as user scrolls away and eases back to heroPose when scrolling back up.
      const idleSpin = (isMobile ? 0.3 : 0.42) * delta * scrollBlend;
      const velocitySpin = scrollVelocity * 0.000045 * scrollBlend;
      accumulatedRotationY += idleSpin + velocitySpin;

      if (scrollBlend <= 0.0001) {
        accumulatedRotationY = heroPose.y;
      }

      if (!isGlidingToHero) {
        let currentFloatY = 0;
        let currentScaleMult = 1.0;

        if (!prefersReducedMotion) {
          // Floating:
          // In the hero: gentle vertical bob of +/-10px (period ~5s, sine ease) + tiny scale breathing (1.00 to 1.015)
          const vH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * 2;
          const pxToWorld = height > 0 ? vH / height : 0.00593;
          const heroPeriod = 5.0; // 5 seconds period
          const heroBobWorldY = 10.0 * pxToWorld * Math.sin((2.0 * Math.PI * time) / heroPeriod);
          const heroScaleBreathing = 1.0 + 0.0075 * (1.0 - Math.cos((2.0 * Math.PI * time) / heroPeriod));

          // Other sections float:
          const otherFloatY = Math.sin(time * 1.3) * (isFacultyActive ? 0.02 : 0.08);

          // Blend floating between hero and other sections
          currentFloatY = (1.0 - scrollBlend) * heroBobWorldY + scrollBlend * otherFloatY;
          currentScaleMult = (1.0 - scrollBlend) * heroScaleBreathing + scrollBlend * 1.0;
        }

        // Apply position (no horizontal bob) and breathing scale
        logoGroup.position.set(lerpPos.x, lerpPos.y + currentFloatY, 0);
        const finalScale = lerpPos.scale * currentScaleMult;
        logoGroup.scale.set(finalScale, finalScale, finalScale);

        // Rotation:
        // Blend rotation = lerp(heroPose, scroll-driven rotation, smoothstep over first ~40% hero distance)
        if (!prefersReducedMotion) {
          if (!isMobile) {
            // Desktop: smooth mouse tilt ONLY rotates, NEVER translates
            mouse.x += (mouse.targetX - mouse.x) * 0.06;
            mouse.y += (mouse.targetY - mouse.y) * 0.06;

            const targetRotY = accumulatedRotationY + mouse.x * 0.45;
            const targetRotX = -mouse.y * 0.35 + Math.sin(time * 0.8) * 0.05;
            const targetRotZ = mouse.x * 0.12;

            // Align heroPose.y with targetRotY to prevent multiple unnecessary full spins when returning
            const nearestHeroY = heroPose.y + Math.round((targetRotY - heroPose.y) / (Math.PI * 2)) * (Math.PI * 2);

            logoGroup.rotation.x = THREE.MathUtils.lerp(heroPose.x, targetRotX, scrollBlend);
            logoGroup.rotation.y = THREE.MathUtils.lerp(nearestHeroY, targetRotY, scrollBlend);
            logoGroup.rotation.z = THREE.MathUtils.lerp(heroPose.z, targetRotZ, scrollBlend);
          } else {
            // Mobile: cursor tilt disabled
            const targetRotY = accumulatedRotationY;
            const targetRotX = Math.sin(time * 0.8) * 0.05;
            const targetRotZ = 0;

            const nearestHeroY = heroPose.y + Math.round((targetRotY - heroPose.y) / (Math.PI * 2)) * (Math.PI * 2);

            logoGroup.rotation.x = THREE.MathUtils.lerp(heroPose.x, targetRotX, scrollBlend);
            logoGroup.rotation.y = THREE.MathUtils.lerp(nearestHeroY, targetRotY, scrollBlend);
            logoGroup.rotation.z = THREE.MathUtils.lerp(heroPose.z, targetRotZ, scrollBlend);
          }
        } else {
          // prefers-reduced-motion: No cursor tilt, no precession
          const targetRotY = accumulatedRotationY;
          const nearestHeroY = heroPose.y + Math.round((targetRotY - heroPose.y) / (Math.PI * 2)) * (Math.PI * 2);

          logoGroup.rotation.x = heroPose.x;
          logoGroup.rotation.y = THREE.MathUtils.lerp(nearestHeroY, targetRotY, scrollBlend);
          logoGroup.rotation.z = heroPose.z;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Expose QA inspection data on window
    window.__getLogoQAData = () => {
      const beamCenterX = getBeamScreenCenterX();
      const logoScreenPos = worldToScreen(logoGroup.position);
      const projectedBox = getLogoProjectedBox(logoGroup, camera);
      const navEl = document.querySelector("header") || document.querySelector("nav");
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 74;
      const headingEl = document.querySelector("#research-mentorship-heading");
      const headingTop = headingEl ? headingEl.getBoundingClientRect().top : 9999;
      const cardsEl = document.querySelector("#faculty-cards-container");
      const cardsTop = cardsEl ? cardsEl.getBoundingClientRect().top : 9999;
      const anchorEl = document.querySelector('[data-logo-anchor="hero"]');
      const anchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;
      const anchorCenterX = anchorRect ? anchorRect.left + anchorRect.width / 2 : null;
      const anchorCenterY = anchorRect ? anchorRect.top + anchorRect.height / 2 : null;

      // Compute current scrollBlend for QA reporting
      const heroScrollDistance = window.innerHeight;
      const blendDistance = 0.4 * heroScrollDistance;
      const curScrollY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
      const rawScrollNorm = blendDistance > 0 ? Math.min(1.0, curScrollY / blendDistance) : 1.0;
      const currentScrollBlend = rawScrollNorm * rawScrollNorm * (3.0 - 2.0 * rawScrollNorm);

      return {
        isFacultyActive,
        isGlidingToHero,
        beamCenterX,
        logoScreenCenterX: logoScreenPos.x,
        logoScreenCenterY: logoScreenPos.y,
        anchorCenterX,
        anchorCenterY,
        diffHeroX: anchorCenterX !== null ? Math.abs(anchorCenterX - logoScreenPos.x) : null,
        diffHeroY: anchorCenterY !== null ? Math.abs(anchorCenterY - logoScreenPos.y) : null,
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
        targetsHero: targets.hero,
        currentLogoState: { ...currentLogoState },
        lerpPos: { ...lerpPos },
        groupPos: { x: logoGroup.position.x, y: logoGroup.position.y, z: logoGroup.position.z },
        rotation: {
          x: logoGroup.rotation.x,
          y: logoGroup.rotation.y,
          z: logoGroup.rotation.z,
        },
        heroPose: { ...heroPose },
        scrollBlend: currentScrollBlend,
      };
    };

    window.__renderLogoFrontOn = renderFrontOn;
    window.__restoreLogoNormal = restoreNormal;
    window.__getLogoGridData = () => ({
      table: LOGO_BLOCK_TABLE,
      layout: getLogoBlockLayout(u),
      unitSize: u,
    });

    // ─────────────────────────────────────────────────────────────
    // 11. RESIZE & CLEANUP
    // ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      isMobile = propIsMobile !== undefined ? propIsMobile : width < 768;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
      renderer.setSize(width, height);

      initScrollTriggers();
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      if (introManager.isDone()) {
        syncLogoToCurrentPosition(true);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(settleTimer1);
      clearTimeout(settleTimer2);
      if (fadeInTween) fadeInTween.kill();
      heroResizeObserver.disconnect();
      window.removeEventListener("pageshow", handlePageShow);
      cancelAnimationFrame(animId);
      unsubscribeIntro();
      triggers.forEach((t) => t.kill());
      ScrollTrigger.removeEventListener("refresh", handleScrollTriggerRefresh);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", onScroll);
      delete window.__getLogoQAData;
      delete window.__renderLogoFrontOn;
      delete window.__restoreLogoNormal;
      delete window.__getLogoGridData;
      delete window.__heroPose;

      if (qaFlatMaterial) {
        qaFlatMaterial.dispose();
      }

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

