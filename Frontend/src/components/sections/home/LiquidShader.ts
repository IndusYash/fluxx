/**
 * WebGL Liquid Mask Shader
 * 
 * Mathematical Specifications:
 * - threshold = mix(-0.25, 1.25, progress)
 * - 3 octaves max Simplex/Value noise, normalized to [0, 1]
 * - Driven mainly by vertical gradient (y) + noise displacement (about 25% amplitude)
 * - Soft edge: smoothstep width ~0.06 (halfWidth 0.03)
 * - Progress 0.0 => strictly zero white pixels
 * - Progress 1.0 => whole screen is 100% solid white
 * - Pure white (#ffffff) with mask alpha (no intermediate grey overlay)
 */

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uProgress; // 0.0 to 1.0 (liquid fill)
uniform float uDissolve; // 0.0 to 1.0 (noise dissolve)
uniform float uTime;

// Fast 2D hash for 2D noise
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 4 octaves FBM noise matching DissolveShader
float fbm4(vec2 uv) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; ++i) {
    v += a * noise2D(uv);
    uv = rot * uv * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

// 3 octaves max, normalized strictly to [0.0, 1.0] for liquid wave
float getFbmNoise(vec2 uv) {
  float n1 = noise2D(uv * 2.5);
  float n2 = noise2D(uv * 5.0) * 0.5;
  float n3 = noise2D(uv * 10.0) * 0.25;
  float sum = (n1 + n2 + n3) / 1.75; // [-1.0, 1.0]
  return clamp(sum * 0.5 + 0.5, 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float y = uv.y;

  // 1. DISSOLVE PHASE: Active when uDissolve > 0.001
  if (uDissolve > 0.001) {
    if (uDissolve >= 0.999) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // Organic noise field drifting slowly
    float n = fbm4(uv * 4.2 + vec2(0.0, uTime * 0.15)) * 0.5 + 0.5;

    // Progress sweeps bottom to top: threshold moves from -0.1 to 1.15
    float threshold = uDissolve * 1.25 - 0.1;
    float edgePos = y + (n - 0.5) * 0.35;
    float dist = edgePos - threshold;

    if (dist < 0.0) {
      // Dissolved area: reveal transparent beneath
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    } else {
      // Intact area above threshold:
      // Thin white-hot glowing line directly on edge (0.0 to 0.022)
      float hotLine = 1.0 - smoothstep(0.0, 0.022, dist);

      // Soft smoke band right behind hot edge (0.015 to 0.075)
      float smoke = smoothstep(0.01, 0.035, dist) * (1.0 - smoothstep(0.035, 0.08, dist));

      vec3 col = vec3(1.0, 1.0, 1.0);
      col = mix(col, vec3(0.5, 0.5, 0.52), smoke * 0.65);
      col = mix(col, vec3(1.0, 1.0, 1.0), hotLine);

      float alpha = smoothstep(0.0, 0.008, dist);
      gl_FragColor = vec4(col, alpha);
    }
    return;
  }

  // 2. LIQUID FILL WAVE PHASE: Active when filling from bottom
  vec2 noiseUv = vec2(uv.x * 2.2, uv.y * 1.6 + uTime * 0.06);
  float noise = getFbmNoise(noiseUv);

  float noiseDisp = (noise - 0.5) * 0.25;
  float pointVal = y + noiseDisp;

  float threshold = mix(-0.25, 1.25, uProgress);
  float halfWidth = 0.03;
  float mask = 1.0 - smoothstep(threshold - halfWidth, threshold + halfWidth, pointVal);

  gl_FragColor = vec4(1.0, 1.0, 1.0, mask);
}
`;

export class LiquidShaderRenderer {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uProgressLoc: WebGLUniformLocation | null = null;
  private uDissolveLoc: WebGLUniformLocation | null = null;
  private uTimeLoc: WebGLUniformLocation | null = null;

  private canvas: HTMLCanvasElement;
  private startTime = performance.now();
  private width = 0;
  private height = 0;
  public currentProgress = 0;
  public currentDissolve = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initGL();
  }

  private initGL() {
    const gl = this.canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("[LiquidShader] WebGL not supported, fallback active");
      return;
    }
    this.gl = gl;

    const vertShader = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = this.compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[LiquidShader] Program link failed:", gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;

    this.uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    this.uProgressLoc = gl.getUniformLocation(program, "uProgress");
    this.uDissolveLoc = gl.getUniformLocation(program, "uDissolve");
    this.uTimeLoc = gl.getUniformLocation(program, "uTime");

    // Full-screen quad spanning -1 to 1
    const quadVertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.resize();
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("[LiquidShader] Shader compile failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  public resize() {
    const gl = this.gl;
    if (!gl) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.round(window.innerWidth * dpr);
    const h = Math.round(window.innerHeight * dpr);
    if (this.width !== w || this.height !== h) {
      this.width = this.canvas.width = w;
      this.height = this.canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  }

  public render(progress: number, dissolve: number = 0) {
    this.currentProgress = progress;
    this.currentDissolve = dissolve;
    const gl = this.gl;

    if (progress <= 0.001 || dissolve >= 0.999) {
      if (gl) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      this.canvas.style.visibility = "hidden";
      if (this.canvas.parentElement) {
        this.canvas.parentElement.style.visibility = "hidden";
      }
      return;
    }

    this.canvas.style.visibility = "visible";
    if (this.canvas.parentElement) {
      this.canvas.parentElement.style.visibility = "visible";
    }

    if (!gl || !this.program) {
      this.render2DFallback(progress, dissolve);
      return;
    }

    const elapsed = (performance.now() - this.startTime) * 0.001;

    gl.useProgram(this.program);
    gl.uniform2f(this.uResolutionLoc, this.width, this.height);
    gl.uniform1f(this.uProgressLoc, progress);
    gl.uniform1f(this.uDissolveLoc, dissolve);
    gl.uniform1f(this.uTimeLoc, elapsed);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  private render2DFallback(progress: number, dissolve: number = 0) {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (dissolve > 0.001) {
      const dissolveTop = (1.0 - dissolve) * h;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, dissolveTop);
      return;
    }

    const threshold = -0.25 + 1.5 * progress;
    const fillY = (1.0 - Math.min(1.0, Math.max(0.0, threshold))) * h;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, fillY);
    ctx.lineTo(w, fillY);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  public dispose() {
    const gl = this.gl;
    if (gl) {
      if (this.program) gl.deleteProgram(this.program);
      if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
      this.program = null;
      this.positionBuffer = null;
      this.gl = null;
    }
  }
}

/**
 * Mathematical coverage check at normalized screen Y.
 * screenYNorm: 0.0 at top of viewport, 1.0 at bottom of viewport.
 * Returns true if the mask at screenYNorm is >= 0.5 (covered in white).
 */
export function isLiquidCoveringY(progress: number, screenYNorm: number, dissolve: number = 0): boolean {
  if (dissolve >= 0.999) return false;
  if (dissolve > 0.001) {
    const y = 1.0 - screenYNorm;
    const threshold = dissolve * 1.25 - 0.1;
    return y >= threshold;
  }
  if (progress <= 0.001) return false;
  if (progress >= 0.999) return true;

  // y is in shader coordinates: 0.0 at bottom, 1.0 at top
  const y = 1.0 - screenYNorm;

  // threshold = mix(-0.25, 1.25, progress)
  const threshold = -0.25 + 1.5 * progress;

  // With average noise displacement = 0.0
  const pointVal = y;

  const halfWidth = 0.03;
  if (pointVal >= threshold + halfWidth) return false;
  if (pointVal <= threshold - halfWidth) return true;
  const t = (pointVal - (threshold + halfWidth)) / (-2 * halfWidth);
  const mask = t * t * (3 - 2 * t);
  return mask >= 0.5;
}
