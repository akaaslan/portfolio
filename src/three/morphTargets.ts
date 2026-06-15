export const PARTICLE_COUNT = 6000;
export const SECTION_COUNT = 7;

// ---- helpers ----
const TAU = Math.PI * 2;
const rand = () => Math.random();
const srand = () => Math.random() * 2 - 1;

// cheap fbm-ish pseudo-noise from a 3D point → scalar (-1..1)
function noise3(x: number, y: number, z: number): number {
  let n = 0;
  n += Math.sin(x * 1.7 + y * 0.9) * 0.5;
  n += Math.sin(y * 2.3 - z * 1.3) * 0.3;
  n += Math.sin(z * 1.9 + x * 1.1) * 0.2;
  n += Math.sin((x + y + z) * 2.7) * 0.15;
  return n / 1.15;
}

// Distribute n points roughly on a sphere via fibonacci, return base dir
function fibDir(i: number, n: number): [number, number, number] {
  const phi = Math.acos(1 - 2 * (i + 0.5) / n);
  const theta = TAU * i * 0.61803398875;
  return [
    Math.sin(phi) * Math.cos(theta),
    Math.sin(phi) * Math.sin(theta),
    Math.cos(phi),
  ];
}

// 0 — TURBULENT CORE: a sphere shell mangled by heavy noise (unstable plasma)
function tTurbulent(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = fibDir(i, n);
    const base = 1.9;
    const disp = 0.7 * noise3(dx * 3, dy * 3, dz * 3) + 0.25 * srand();
    const r = base + disp;
    p[i*3] = dx * r; p[i*3+1] = dy * r; p[i*3+2] = dz * r;
  }
  return p;
}

// 1 — VORTEX: an abstract swirling nebula collapsing toward an axis
function tVortex(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const arms = 3;
    const ang = t * TAU * 6 + (i % arms) * (TAU / arms);
    const rad = 0.3 + t * 2.4;
    const y = (t - 0.5) * 3.2 + noise3(rad, ang, t) * 0.4;
    const wob = noise3(ang, y, rad) * 0.5;
    p[i*3]   = Math.cos(ang) * rad + wob;
    p[i*3+1] = y;
    p[i*3+2] = Math.sin(ang) * rad + wob;
  }
  return p;
}

// 2 — WARPED RING: a fat torus dissolved by noise (an unstable orbital field)
function tRing(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = rand() * TAU;
    const v = rand() * TAU;
    const R = 1.9, r = 0.55 + noise3(u, v, 0) * 0.4;
    let x = (R + r * Math.cos(v)) * Math.cos(u);
    let z = (R + r * Math.cos(v)) * Math.sin(u);
    let y = r * Math.sin(v) + noise3(x, z, u) * 0.5;
    // tilt for dynamism
    const ty = y * 0.85 - z * 0.5;
    const tz = y * 0.5 + z * 0.85;
    p[i*3] = x; p[i*3+1] = ty; p[i*3+2] = tz;
  }
  return p;
}

// 3 — FLOW SHEET: an undulating folded field (an abstract membrane)
function tSheet(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const side = Math.ceil(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    const gx = (i % side) / side - 0.5;
    const gz = Math.floor(i / side) / side - 0.5;
    const x = gx * 5.0;
    const z = gz * 5.0;
    const y = Math.sin(x * 1.2) * 0.6 + Math.cos(z * 1.4) * 0.6
            + noise3(x, z, 0) * 0.9;
    p[i*3] = x; p[i*3+1] = y; p[i*3+2] = z;
  }
  return p;
}

// 4 — ANNIHILATION JETS: bipolar outflow, dense core + two diffuse lobes
function tJets(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    if (rand() < 0.45) {
      // core cloud
      const [dx, dy, dz] = fibDir(i, n);
      const r = 0.9 * Math.pow(rand(), 0.5);
      p[i*3] = dx*r; p[i*3+1] = dy*r; p[i*3+2] = dz*r;
    } else {
      // jets along Y
      const dir = rand() < 0.5 ? 1 : -1;
      const len = Math.pow(rand(), 0.6) * 2.8;
      const spread = (0.15 + len * 0.18);
      p[i*3]   = srand() * spread + noise3(len, t, dir) * 0.3;
      p[i*3+1] = dir * (0.4 + len);
      p[i*3+2] = srand() * spread + noise3(t, len, dir) * 0.3;
    }
  }
  return p;
}

// 5 — FRACTURED SHELL: clustered patches on a broken sphere
function tShell(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = fibDir(i, n);
    const gate = noise3(dx * 2.2, dy * 2.2, dz * 2.2);
    const r = gate > 0 ? 2.1 + gate * 0.3 : 1.0 + rand() * 0.5; // gaps collapse inward
    p[i*3] = dx*r; p[i*3+1] = dy*r; p[i*3+2] = dz*r;
  }
  return p;
}

// 6 — DISPERSAL: a wide diffuse cloud (signal scattering)
function tDispersal(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [dx, dy, dz] = fibDir(i, n);
    const r = 1.5 + Math.pow(rand(), 0.4) * 2.6;
    p[i*3]   = dx*r + srand()*0.6;
    p[i*3+1] = dy*r + srand()*0.6;
    p[i*3+2] = dz*r + srand()*0.6;
  }
  return p;
}

const BUILDERS = [tTurbulent, tVortex, tRing, tSheet, tJets, tShell, tDispersal];

export function getMorphTarget(sectionIndex: number, count: number): Float32Array {
  const fn = BUILDERS[Math.max(0, Math.min(BUILDERS.length - 1, sectionIndex))];
  return fn(count);
}
