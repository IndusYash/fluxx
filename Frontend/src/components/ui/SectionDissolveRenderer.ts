/**
 * WebGL Section Dissolve Shader Renderer
 * Full-screen fragment shader driven by progress (0.0 -> 1.0).
 * Renders an organic smoky burn line and glowing edge during section transitions.
 * Guaranteed single-wave formulation: displacement depends strictly on horizontal coordinate,
 * ensuring zero level-curve folding or multi-band moiré ripples across all GPUs.
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
uniform float uProgress; // 0.0 to 1.0
uniform float uTime;

// High-stability 2D hash without trigonometric cancellation
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// 2D smooth cubic value noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 3-octave organic wave variation along X:
// Dependent strictly on X and time to guarantee monotonicity along Y
float waveNoise(float x, float t) {
  float n1 = noise(vec2(x * 2.4, t * 0.12));
  float n2 = noise(vec2(x * 5.2 + 12.0, t * 0.18)) * 0.5;
  float n3 = noise(vec2(x * 10.4 + 34.0, t * 0.24)) * 0.25;
  return (n1 + n2 + n3) / 1.75;
}

void main() {
  if (uProgress <= 0.001 || uProgress >= 0.999) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    return;
  }

  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float y = uv.y;
  float x = uv.x;

  // Single continuous organic undulating line:
  // displacement depends on x only, so y + disp is STRICTLY MONOTONIC in y
  float n = waveNoise(x, uTime);
  float disp = (n - 0.5) * 0.14; // gentle, natural organic wave (+/- 7% screen height)

  // Sweeps smoothly from bottom (y=0) to top (y=1)
  float threshold = uProgress * 1.28 - 0.14;
  float edgeY = threshold + disp;
  float dist = y - edgeY;

  // 1. Thin luminous white-hot glowing edge directly along the single line
  float hotLine = 1.0 - smoothstep(0.0, 0.018, abs(dist));

  // 2. Soft organic smoky contour band around the line
  float smoke = smoothstep(0.005, 0.026, abs(dist)) * (1.0 - smoothstep(0.026, 0.080, abs(dist)));

  vec3 col = vec3(1.0, 1.0, 1.0);
  col = mix(col, vec3(0.55, 0.55, 0.60), smoke * 0.65);
  col = mix(col, vec3(1.0, 1.0, 1.0), hotLine);

  float alpha = clamp(hotLine * 1.0 + smoke * 0.70, 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

export class SectionDissolveRenderer {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private positionBuffer: WebGLBuffer | null = null;
  private uResolutionLoc: WebGLUniformLocation | null = null;
  private uProgressLoc: WebGLUniformLocation | null = null;
  private uTimeLoc: WebGLUniformLocation | null = null;

  private canvas: HTMLCanvasElement;
  private startTime = performance.now();
  private width = 0;
  private height = 0;

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
      console.warn("[SectionDissolveRenderer] WebGL not supported, fallback active");
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
      console.error("[SectionDissolveRenderer] Program link failed:", gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;

    this.uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    this.uProgressLoc = gl.getUniformLocation(program, "uProgress");
    this.uTimeLoc = gl.getUniformLocation(program, "uTime");

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
      console.error("[SectionDissolveRenderer] Shader compile failed:", gl.getShaderInfoLog(shader));
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

  public render(progress: number) {
    const gl = this.gl;

    if (progress <= 0.001 || progress >= 0.999) {
      if (gl) {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      this.canvas.style.visibility = "hidden";
      return;
    }

    this.canvas.style.visibility = "visible";

    if (!gl || !this.program) return;

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const elapsed = (performance.now() - this.startTime) * 0.001;

    gl.useProgram(this.program);
    gl.uniform2f(this.uResolutionLoc, this.width, this.height);
    gl.uniform1f(this.uProgressLoc, progress);
    gl.uniform1f(this.uTimeLoc, elapsed);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
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
