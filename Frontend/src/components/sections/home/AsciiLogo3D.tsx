import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { getLogoBlockLayout } from "@/components/3d/logoConfig";

interface AsciiLogo3DProps {
  positionMode?: "right" | "center";
}

export default function AsciiLogo3D({ positionMode = "right" }: AsciiLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobileOrTablet = window.innerWidth < 1024 || positionMode === "center";

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Offscreen RenderTarget for rendering 3D logo
    let renderTarget = new THREE.WebGLRenderTarget(width * dpr, height * dpr, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    // 3. Build 3D Geometric FLUX Logo Model
    const logoGroup = new THREE.Group();

    // High diffuse reflectance (low metalness, balanced roughness) so surfaces are bright
    const blockMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.08,
    });

    const createBlock = (w: number, h: number, d: number, x: number, y: number) => {
      const geom = new THREE.BoxGeometry(w, h, d, 2, 2, 2);
      const mesh = new THREE.Mesh(geom, blockMat);
      mesh.position.set(x, y, 0);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    // Scaled unit size & increased extrude depth (0.85) for pronounced 3D facets
    const u = 0.68;
    const depth = 0.85;

    // Build 5x5 grid from shared layout
    const layout = getLogoBlockLayout(u);
    layout.forEach((b) => {
      logoGroup.add(createBlock(b.w, b.h, depth, b.x, b.y));
    });

    const logoBox = new THREE.Box3().setFromObject(logoGroup);
    const logoCenter = new THREE.Vector3();
    logoBox.getCenter(logoCenter);
    logoGroup.children.forEach((child) => {
      child.position.sub(logoCenter);
    });

    // Add rear slab for depth presence and silhouette stability
    const backingGeom = new THREE.BoxGeometry(u * 5.0, u * 5.0, 0.1);
    const backingMat = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.2,
    });
    const backingMesh = new THREE.Mesh(backingGeom, backingMat);
    backingMesh.position.set(0, 0, -depth * 0.52);
    logoGroup.add(backingMesh);

    scene.add(logoGroup);

    // Calculate world position
    const calcPosition = (w: number, h: number) => {
      const isTabletOrMob = window.innerWidth < 1024 || positionMode === "center";
      if (isTabletOrMob) {
        return { x: 0, y: 0, normalizedX: 0.5 };
      }
      const aspect = w / h;
      const visibleHalfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * aspect;
      // Position logo at ~72% of screen width (safely between 55% and 95%)
      const worldX = (0.72 - 0.5) * 2 * visibleHalfWidth;
      return { x: worldX, y: 0.05, normalizedX: 0.72 };
    };

    let currentPos = calcPosition(width, height);
    logoGroup.position.set(currentPos.x, currentPos.y, 0);

    // 4. Lighting & Rim Lights for High Contrast
    // Ambient light at 2.4 ensures shadow surfaces stay ~25% brightness (#3a3a3a)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    // Key light (top-right front)
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 4.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    // Fill light (front-left)
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight2.position.set(-4, 1, 4);
    scene.add(dirLight2);

    // Edge / Rim light 1 (top-right back)
    const rimLight1 = new THREE.DirectionalLight(0xffffff, 5.5);
    rimLight1.position.set(4, 5, -4);
    scene.add(rimLight1);

    // Edge / Rim light 2 (left back)
    const rimLight2 = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight2.position.set(-4, 2, -4);
    scene.add(rimLight2);

    // 5. Dynamic Cursor Trail Texture (Offscreen Canvas)
    const trailCanvas = document.createElement("canvas");
    const trailSize = 256;
    trailCanvas.width = trailSize;
    trailCanvas.height = trailSize;
    const trailCtx = trailCanvas.getContext("2d")!;
    trailCtx.fillStyle = "#000000";
    trailCtx.fillRect(0, 0, trailSize, trailSize);

    const trailTexture = new THREE.CanvasTexture(trailCanvas);
    trailTexture.minFilter = THREE.LinearFilter;
    trailTexture.magFilter = THREE.LinearFilter;

    // 6. Glyph Atlas Texture with Dense High-Contrast Characters
    const glyphs = [" ", "·", "▪", "+", "i", "e", "x", "p", "%", "#", "■", "█"];
    const atlasCanvas = document.createElement("canvas");
    const glyphCellSize = 64;
    atlasCanvas.width = glyphCellSize * glyphs.length;
    atlasCanvas.height = glyphCellSize;
    const atlasCtx = atlasCanvas.getContext("2d")!;
    atlasCtx.fillStyle = "#000000";
    atlasCtx.fillRect(0, 0, atlasCanvas.width, atlasCanvas.height);

    // Render dense glyphs & solid dots
    glyphs.forEach((char, idx) => {
      const cx = idx * glyphCellSize + glyphCellSize / 2;
      const cy = glyphCellSize / 2;
      atlasCtx.fillStyle = "#ffffff";

      if (idx === 1) {
        // Small dot
        atlasCtx.beginPath();
        atlasCtx.arc(cx, cy, 6, 0, Math.PI * 2);
        atlasCtx.fill();
      } else if (idx === 2) {
        // Medium dot
        atlasCtx.beginPath();
        atlasCtx.arc(cx, cy, 11, 0, Math.PI * 2);
        atlasCtx.fill();
      } else if (idx === 10) {
        // Square block ■
        atlasCtx.fillRect(cx - 16, cy - 16, 32, 32);
      } else if (idx === 11) {
        // Full dense block █
        atlasCtx.fillRect(cx - 20, cy - 24, 40, 48);
      } else if (idx > 0) {
        atlasCtx.font = `bold 48px "Space Mono", monospace`;
        atlasCtx.textAlign = "center";
        atlasCtx.textBaseline = "middle";
        atlasCtx.fillText(char, cx, cy + 2);
      }
    });

    const glyphAtlasTexture = new THREE.CanvasTexture(atlasCanvas);
    glyphAtlasTexture.minFilter = THREE.NearestFilter;
    glyphAtlasTexture.magFilter = THREE.NearestFilter;

    // 7. Post-Processing Screen Quad with High-Contrast Shader
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 8-10px cell size for crisp dot definition
    const targetCellSize = isMobileOrTablet ? 8.0 * dpr : 9.0 * dpr;

    const asciiShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: renderTarget.texture },
        tTrail: { value: trailTexture },
        tAtlas: { value: glyphAtlasTexture },
        uResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
        uCellSize: { value: targetCellSize },
        uGlyphCount: { value: glyphs.length },
        uTime: { value: 0 },
        uLogoNormalizedX: { value: currentPos.normalizedX },
        uAspect: { value: width / height },
        uEnableTrail: { value: !isMobileOrTablet ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D tTrail;
        uniform sampler2D tAtlas;
        uniform vec2 uResolution;
        uniform float uCellSize;
        uniform float uGlyphCount;
        uniform float uTime;
        uniform float uLogoNormalizedX;
        uniform float uAspect;
        uniform float uEnableTrail;
        varying vec2 vUv;

        void main() {
          vec2 pixelCoord = vUv * uResolution;
          vec2 cellCoord = floor(pixelCoord / uCellSize);
          vec2 cellCenter = (cellCoord + 0.5) * uCellSize;
          vec2 cellCenterUv = cellCenter / uResolution;
          vec2 localUv = fract(pixelCoord / uCellSize);

          // Sample 3D scene luminance at cell center
          vec4 sceneColor = texture2D(tDiffuse, cellCenterUv);
          float luminance = dot(sceneColor.rgb, vec3(0.299, 0.587, 0.114));

          // Sample cursor trail mask
          float trailVal = 0.0;
          if (uEnableTrail > 0.5) {
            trailVal = texture2D(tTrail, cellCenterUv).r;
          }

          // Case 1: Empty background (no model rendered)
          if (luminance < 0.035) {
            // Soft radial glow behind logo to separate from pure black
            vec2 logoCenter = vec2(uLogoNormalizedX, 0.5);
            float dist = length((cellCenterUv - logoCenter) * vec2(uAspect, 1.0));
            float radialGlow = smoothstep(0.85, 0.0, dist) * 0.06;

            float bgBrightness = radialGlow + trailVal * 0.95;
            if (bgBrightness < 0.02) {
              gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
              return;
            }

            // Low ambient dot field behind logo
            float glyphIdx = clamp(floor(bgBrightness * (uGlyphCount - 1.0)), 0.0, 2.0);
            vec2 atlasUv = vec2((localUv.x + glyphIdx) / uGlyphCount, localUv.y);
            float glyphSample = texture2D(tAtlas, atlasUv).r;

            vec3 bgCol = trailVal > 0.05 ? vec3(1.0) : vec3(0.3, 0.3, 0.3);
            gl_FragColor = vec4(bgCol * glyphSample * bgBrightness, 1.0);
            return;
          }

          // Case 2: 3D Logo Surface
          // Requirements:
          // - No dot should be below ~25% brightness on the surface
          // - Lit surfaces render in near-white (#f2f2f2 = 0.95)
          // - Mid surfaces in light grey (#9a9a9a = 0.60)
          // - Shadows in dark grey (#3a3a3a = 0.23)
          float surfaceNorm = clamp((luminance - 0.035) / 0.965, 0.0, 1.0);

          // Strict color interpolation:
          // #3a3a3a = vec3(0.23, 0.23, 0.23)
          // #9a9a9a = vec3(0.60, 0.60, 0.60)
          // #f2f2f2 = vec3(0.95, 0.95, 0.95)
          vec3 textColor;
          if (trailVal > 0.1) {
            textColor = vec3(1.0, 1.0, 1.0); // Pure white trail
          } else if (surfaceNorm < 0.40) {
            float t = surfaceNorm / 0.40;
            textColor = mix(vec3(0.23, 0.23, 0.23), vec3(0.60, 0.60, 0.60), t);
          } else {
            float t = (surfaceNorm - 0.40) / 0.60;
            textColor = mix(vec3(0.60, 0.60, 0.60), vec3(0.95, 0.95, 0.95), t);
          }

          // Minimum brightness is 0.25 (no dot below ~25% brightness)
          float surfaceBrightness = mix(0.25, 0.98, pow(surfaceNorm, 0.75));
          if (trailVal > 0.05) {
            surfaceBrightness = mix(surfaceBrightness, 1.0, trailVal);
          }

          // Minimum glyph index on surface is 2 for high density/legibility
          float glyphIdx = clamp(floor(surfaceBrightness * (uGlyphCount - 1.0)), 2.0, uGlyphCount - 1.0);
          vec2 atlasUv = vec2((localUv.x + glyphIdx) / uGlyphCount, localUv.y);
          float glyphSample = texture2D(tAtlas, atlasUv).r;

          vec3 finalColor = textColor * glyphSample;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), asciiShaderMaterial);
    postScene.add(quad);

    // 8. Mouse & Tumble State (Rest Faces Front, Max 15° Cursor Tilt)
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isMouseActive = false;
    let mouseTimeout: number;

    // Max 15 degrees = 0.26 rad
    const MAX_TILT_RAD = 15 * (Math.PI / 180);

    const onMouseMove = (e: MouseEvent) => {
      if (isMobileOrTablet) return;

      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX = Math.min(Math.max(x, 0), 1);
      mouseY = Math.min(Math.max(y, 0), 1);

      // Gentle cursor tilt clamped to max 15 degrees
      targetRotY = THREE.MathUtils.clamp((mouseX - 0.5) * 0.52, -MAX_TILT_RAD, MAX_TILT_RAD);
      targetRotX = THREE.MathUtils.clamp((mouseY - 0.5) * 0.40, -MAX_TILT_RAD, MAX_TILT_RAD);

      isMouseActive = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = window.setTimeout(() => {
        isMouseActive = false;
        // Ease back to front-facing when idle
        targetRotX = 0;
        targetRotY = 0;
      }, 1000);

      // Paint bright white spot on trail canvas
      const tx = mouseX * trailSize;
      const ty = (1.0 - mouseY) * trailSize;
      const rad = 28;

      const grad = trailCtx.createRadialGradient(tx, ty, 0, tx, ty, rad);
      grad.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      grad.addColorStop(0.5, "rgba(255, 255, 255, 0.7)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      trailCtx.fillStyle = grad;
      trailCtx.beginPath();
      trailCtx.arc(tx, ty, rad, 0, Math.PI * 2);
      trailCtx.fill();
    };

    window.addEventListener("mousemove", onMouseMove);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      const curTabletMob = window.innerWidth < 1024 || positionMode === "center";

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderTarget.setSize(width * dpr, height * dpr);

      currentPos = calcPosition(width, height);
      logoGroup.position.set(currentPos.x, currentPos.y, 0);

      asciiShaderMaterial.uniforms.uResolution.value.set(width * dpr, height * dpr);
      asciiShaderMaterial.uniforms.uCellSize.value = curTabletMob ? 8.0 * dpr : 9.0 * dpr;
      asciiShaderMaterial.uniforms.uLogoNormalizedX.value = currentPos.normalizedX;
      asciiShaderMaterial.uniforms.uAspect.value = width / height;
      asciiShaderMaterial.uniforms.uEnableTrail.value = !curTabletMob ? 1.0 : 0.0;
    };

    window.addEventListener("resize", handleResize);

    // 10. Intersection Observer (Pause when off-screen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 11. Animation Loop
    let clock = new THREE.Clock();

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Decay trail canvas back to black over ~1s
      if (!isMobileOrTablet) {
        trailCtx.fillStyle = "rgba(0, 0, 0, 0.04)";
        trailCtx.fillRect(0, 0, trailSize, trailSize);
        trailTexture.needsUpdate = true;
      }

      // Rotation Logic: faces front at rest, gentle tilt with mouse
      if (!prefersReducedMotion) {
        if (!isMouseActive) {
          // Subtle idle float while staying front-facing (within 2 degrees)
          const subtleY = Math.sin(elapsedTime * 0.6) * 0.03;
          const subtleX = Math.cos(elapsedTime * 0.5) * 0.02;
          targetRotX = THREE.MathUtils.lerp(targetRotX, subtleX, 0.05);
          targetRotY = THREE.MathUtils.lerp(targetRotY, subtleY, 0.05);
        }

        // Smooth damping
        currentRotX += (targetRotX - currentRotX) * 0.06;
        currentRotY += (targetRotY - currentRotY) * 0.06;

        logoGroup.rotation.x = currentRotX;
        logoGroup.rotation.y = currentRotY;

        // Subtle vertical floating breath
        logoGroup.position.y = currentPos.y + Math.sin(elapsedTime * 0.8) * 0.06;
      }

      // Step A: Render 3D scene to offscreen renderTarget
      renderer.setRenderTarget(renderTarget);
      renderer.clear();
      renderer.render(scene, camera);

      // Step B: Render Post-Processing ASCII shader to screen
      renderer.setRenderTarget(null);
      asciiShaderMaterial.uniforms.uTime.value = elapsedTime;
      renderer.render(postScene, postCamera);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      clearTimeout(mouseTimeout);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      renderTarget.dispose();
      blockMat.dispose();
      backingMat.dispose();
      backingGeom.dispose();
      asciiShaderMaterial.dispose();
      quad.geometry.dispose();
      trailTexture.dispose();
      glyphAtlasTexture.dispose();

      logoGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      });
    };
  }, [positionMode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      style={{ touchAction: "none" }}
    />
  );
}
