import React, { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null;
  }

  useEffect(() => {
    // Hide completely on touch devices, small screens or reduced motion
    const isMobile = window.innerWidth < 768;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile || isTouch || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const points: TrailPoint[] = [];
    const mouse = { x: -100, y: -100, prevX: -100, prevY: -100 };
    const target = { x: -100, y: -100 };
    let isHovered = false;
    let currentRadius = 3.5;
    let targetRadius = 3.5;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      isVisible = true;
      target.x = e.clientX;
      target.y = e.clientY;

      // Check if hovering clickable elements
      const targetEl = e.target as HTMLElement | null;
      if (
        targetEl &&
        (targetEl.closest("a") ||
          targetEl.closest("button") ||
          targetEl.closest("[role='button']") ||
          targetEl.closest("input") ||
          targetEl.closest("textarea") ||
          targetEl.closest("[data-cursor-hover]") ||
          targetEl.classList.contains("clickable"))
      ) {
        isHovered = true;
      } else {
        isHovered = false;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (isVisible) {
        // Smooth cursor position interpolation (linear easing for snappy response)
        mouse.x += (target.x - mouse.x) * 0.45;
        mouse.y += (target.y - mouse.y) * 0.45;

        // Radius transition
        targetRadius = isHovered ? 11 : 3.5;
        currentRadius += (targetRadius - currentRadius) * 0.2;

        // Record tail points when mouse is moving
        const dist = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
        if (dist > 0.5) {
          points.unshift({
            x: mouse.x,
            y: mouse.y,
            alpha: 0.85,
            size: currentRadius * 0.85,
          });
        }
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;

        // Cap points length
        if (points.length > 24) {
          points.pop();
        }

        // Draw fading comet trail ribbon
        if (points.length > 2) {
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            const ratio = 1 - i / points.length;
            p1.alpha *= 0.88;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${p1.alpha * 0.45 * ratio})`;
            ctx.lineWidth = p1.size * ratio;
            ctx.lineCap = "round";
            ctx.stroke();
          }
        }

        // Outer glow on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, currentRadius + 5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Main white dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = isHovered ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999] hidden md:block"
      aria-hidden="true"
    />
  );
}

