import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PARTICLE_COUNT, SECTION_COUNT, getMorphTarget } from './morphTargets';
import { scrollStore, pointerStore } from '../motion/scrollStore';

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform float uProgress;
  uniform vec2  uMouse;

  attribute vec3  aTarget;
  attribute float aRandom;
  attribute vec3  aColor;
  attribute float aAccent;

  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;
  varying float vAccent;

  void main() {
    float t = smoothstep(0.0, 1.0, uProgress);
    vec3 pos = mix(position, aTarget, t);

    float n = aRandom * 6.2831;
    vec3 dir = normalize(pos + 0.0001);

    // slow volatile turbulence
    pos.x += sin(uTime * 0.7 + n) * 0.10 * aRandom;
    pos.y += cos(uTime * 0.55 + n * 1.4) * 0.10 * aRandom;
    pos.z += sin(uTime * 0.45 + n * 0.7) * 0.09 * aRandom;
    pos   += dir * sin(uTime * 1.2 + n * 3.1) * 0.07 * (0.4 + aRandom);

    // Pointer parallax
    pos.x += uMouse.x * 0.3 * (0.3 + aRandom);
    pos.y += -uMouse.y * 0.3 * (0.3 + aRandom);

    // Gentle mouse gravity — nearby particles drift toward the cursor
    vec2 mw = uMouse * 3.2;
    float md = distance(pos.xy, mw);
    pos.xy += (mw - pos.xy) * 0.10 * smoothstep(3.2, 0.0, md);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float flick = 0.78 + 0.35 * sin(uTime * 3.0 + n * 4.0);
    float sz = mix(0.7, 3.0, aRandom * aRandom) * flick;
    gl_PointSize = sz * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;

    vFog = smoothstep(11.0, 2.0, -mv.z);
    vColor = aColor;
    vAccent = aAccent;
    vAlpha = mix(0.14, 0.55, aRandom) * (0.55 + 0.45 * sin(uTime * 0.9 + n));
  }
`;

const fragmentShader = /* glsl */`
  uniform vec3 uAccent;
  varying vec3  vColor;
  varying float vAlpha;
  varying float vFog;
  varying float vAccent;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float glow = pow(core, 1.5);
    vec3 base = mix(vColor, uAccent, vAccent);
    vec3 col = base + vAccent * core * 0.5;   // accents flare brighter
    float alpha = glow * vAlpha * vFog;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface Props { night?: boolean; }

export function ParticleField({ night = false }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef    = useRef<THREE.ShaderMaterial>(null);
  const segRef    = useRef(-1);
  const progRef   = useRef(0);

  const allTargets = useMemo(
    () => Array.from({ length: SECTION_COUNT }, (_, i) => getMorphTarget(i, PARTICLE_COUNT)),
    [],
  );

  const randoms = useMemo(() => {
    const a = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) a[i] = Math.random();
    return a;
  }, []);

  // Base colours = monochrome paper/dim; ~20% are accent (driven by uAccent uniform)
  const { colors, accents } = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const accents = new Float32Array(PARTICLE_COUNT);
    const paper = new THREE.Color('#F4F4F2');
    const dim   = new THREE.Color('#5E5F66');
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (Math.random() < 0.2) accents[i] = 1;
      const c = Math.random() < 0.5 ? paper.clone() : dim.clone().lerp(paper, Math.random());
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
    }
    return { colors, accents };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(allTargets[0].slice(), 3));
    geo.setAttribute('aTarget',  new THREE.BufferAttribute(allTargets[1].slice(), 3));
    geo.setAttribute('aRandom',  new THREE.BufferAttribute(randoms, 1));
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors,  3));
    geo.setAttribute('aAccent',  new THREE.BufferAttribute(accents, 1));
    return geo;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uProgress: { value: 0 },
    uMouse:    { value: new THREE.Vector2(0, 0) },
    uAccent:   { value: new THREE.Color('#CCFF00') },
  }), []);

  // Palette sync: lime by default, violet-blue in night mode
  useEffect(() => {
    const target = new THREE.Color(night ? '#8C8BFF' : '#CCFF00');
    if (matRef.current) (matRef.current.uniforms.uAccent.value as THREE.Color).copy(target);
  }, [night]);

  useFrame((state, delta) => {
    if (!matRef.current || !pointsRef.current) return;
    const d = Math.min(delta, 0.05);

    const totalSegs = SECTION_COUNT - 1;
    const target = Math.max(0, Math.min(1, scrollStore.progress)) * totalSegs;
    progRef.current += (target - progRef.current) * Math.min(d * 3.5, 1);
    const raw = progRef.current;
    const seg = Math.min(Math.floor(raw), totalSegs - 1);
    const t   = raw - seg;

    if (seg !== segRef.current) {
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const tgtAttr = geometry.attributes.aTarget  as THREE.BufferAttribute;
      posAttr.set(allTargets[seg]);                                   posAttr.needsUpdate = true;
      tgtAttr.set(allTargets[Math.min(seg + 1, SECTION_COUNT - 1)]);  tgtAttr.needsUpdate = true;
      segRef.current = seg;
    }

    matRef.current.uniforms.uProgress.value = t;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    const m = matRef.current.uniforms.uMouse.value as THREE.Vector2;
    m.x += (pointerStore.x - m.x) * Math.min(d * 2.5, 1);
    m.y += (pointerStore.y - m.y) * Math.min(d * 2.5, 1);

    pointsRef.current.rotation.y += d * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
