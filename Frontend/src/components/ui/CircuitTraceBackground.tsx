import { useEffect, useRef } from 'react';

const CircuitTraceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number;
    let h: number;
    let animationFrameId: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const step = 34;
    let paths: any[] = [];

    const buildPath = () => {
      const cols = Math.ceil(w / step) + 2;
      const rows = Math.ceil(h / step) + 2;
      let x = Math.floor(Math.random() * cols) * step;
      let y = Math.floor(Math.random() * rows) * step;
      const pts = [{ x, y }];
      const len = 6 + Math.floor(Math.random() * 6);
      let dir = Math.floor(Math.random() * 4);

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.35) dir = Math.floor(Math.random() * 4);
        if (dir === 0) x += step;
        else if (dir === 1) x -= step;
        else if (dir === 2) y += step;
        else y -= step;
        pts.push({ x, y });
      }

      return {
        pts,
        t: 0,
        speed: 0.008 + Math.random() * 0.012,
        hue: Math.random() < 0.5 ? '#00e0ff' : '#7f5af0',
      };
    };

    for (let i = 0; i < 14; i++) paths.push(buildPath());

    const draw = () => {
      ctx.fillStyle = 'rgba(5,7,13,1)';
      ctx.fillRect(0, 0, w, h);

      // faint static grid
      ctx.strokeStyle = 'rgba(231,236,245,0.04)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += step) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += step) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      paths.forEach((p, idx) => {
        // draw path faint
        ctx.strokeStyle = 'rgba(231,236,245,0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        p.pts.forEach((pt: any, i: number) => (i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.stroke();

        // traveling pulse
        p.t += p.speed;
        if (p.t > 1) {
          paths[idx] = buildPath();
          return;
        }

        const segCount = p.pts.length - 1;
        const segF = p.t * segCount;
        const segI = Math.min(Math.floor(segF), segCount - 1);
        const localT = segF - segI;
        const a = p.pts[segI];
        const b = p.pts[segI + 1];
        const px = a.x + (b.x - a.x) * localT;
        const py = a.y + (b.y - a.y) * localT;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, 10);
        grad.addColorStop(0, p.hue);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100svh',
        display: 'block',
        zIndex: -1,
      }}
    />
  );
};

export default CircuitTraceBackground;
