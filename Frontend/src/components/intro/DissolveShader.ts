/**
 * WebGL Dissolve Fragment Shader
 * Full-screen fragment shader driven by uProgress (0 -> 1).
 * Dissolves light screen (#ededed) from bottom to top revealing black beneath.
 * Features an organic smoky FBM noise edge, white-hot glowing line, and soft smoke band.
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

// 2D simplex/fbm hash
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

float fbm(vec2 uv) {
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

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  
  // y: 0.0 at bottom, 1.0 at top
  float y = uv.y;
  float x = uv.x;
  
  // Single continuous organic wave along X (monotonic in Y)
  float n1 = noise2D(vec2(x * 2.4, uTime * 0.12));
  float n2 = noise2D(vec2(x * 5.2 + 12.0, uTime * 0.18)) * 0.5;
  float n3 = noise2D(vec2(x * 10.4 + 34.0, uTime * 0.24)) * 0.25;
  float n = (n1 + n2 + n3) / 1.75;
  float disp = (n - 0.5) * 0.14;
  
  // Progress sweeps bottom to top: threshold moves from -0.1 to 1.15
  float threshold = uProgress * 1.25 - 0.1;
  float edgePos = y + disp;
  
  // Base light screen color
  vec3 lightBg = vec3(0.929, 0.929, 0.929); // #ededed
  
  // Distance from dissolving edge
  float dist = edgePos - threshold;
  
  if (dist < 0.0) {
    // Dissolved area: reveal transparent black beneath
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  } else {
    // Intact area above threshold
    // 1. Thin white-hot glowing line directly on edge (0.0 to 0.02)
    float hotLine = 1.0 - smoothstep(0.0, 0.022, dist);
    
    // 2. Soft grey smoke band right behind hot edge (0.015 to 0.075)
    float smoke = smoothstep(0.01, 0.035, dist) * (1.0 - smoothstep(0.035, 0.08, dist));
    
    vec3 col = lightBg;
    // Mix smoke (darker grey tint)
    col = mix(col, vec3(0.5, 0.5, 0.52), smoke * 0.65);
    // Mix white-hot burn line
    col = mix(col, vec3(1.0, 1.0, 1.0), hotLine);
    
    // Soft alpha fade at the extreme front
    float alpha = smoothstep(0.0, 0.008, dist);
    
    gl_FragColor = vec4(col, alpha);
  }
}
`;

export class DissolveRenderer {
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
      console.warn("[DissolveShader] WebGL not supported, CSS fallback active");
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
      console.error("[DissolveShader] Link failed:", gl.getProgramInfoLog(program));
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
      console.error("[DissolveShader] Compile error:", gl.getShaderInfoLog(shader));
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
    if (!gl || !this.program) {
      // CSS Fallback mask if WebGL is unavailable
      const pct = (1 - progress) * 100;
      this.canvas.style.clipPath = `polygon(0 0, 100% 0, 100% ${pct}%, 0 ${pct}%)`;
      return;
    }

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
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      this.gl = null;
    }
  }
}

