import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore, pointerStore } from '../motion/scrollStore';

const vertexShader = /* glsl */`
  uniform float uTime;
  uniform float uDistort;
  varying float vGlow;

  void main() {
    // Radial breathing distortion → organic, liquid wireframe
    vec3 dir = normalize(position);
    float n = sin(position.x * 1.5 + uTime) * 0.5
            + sin(position.y * 1.7 - uTime * 0.8) * 0.5
            + sin(position.z * 1.3 + uTime * 0.6) * 0.5;
    vec3 pos = position + dir * n * uDistort;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    // Edges nearer the camera glow brighter
    vGlow = smoothstep(6.0, 2.5, -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */`
  uniform vec3  uColor;
  uniform float uOpacity;
  varying float vGlow;
  void main() {
    gl_FragColor = vec4(uColor, vGlow * uOpacity);
  }
`;

interface Props { night?: boolean; }

export function WireCore({ night = false }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef   = useRef<THREE.ShaderMaterial>(null);

  useEffect(() => {
    const target = new THREE.Color(night ? '#B9B8FF' : '#F4F4F2');
    if (matRef.current) (matRef.current.uniforms.uColor.value as THREE.Color).copy(target);
  }, [night]);

  const geometry = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(2.4, 2);
    return new THREE.WireframeGeometry(ico);
  }, []);

  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uDistort: { value: 0.18 },
    uColor:   { value: new THREE.Color('#F4F4F2') },
    uOpacity: { value: 0.24 },
  }), []);

  useFrame((state, delta) => {
    if (!groupRef.current || !matRef.current) return;
    const d = Math.min(delta, 0.05);
    const g = groupRef.current;

    g.rotation.y += d * 0.05;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.13;

    // Pointer parallax
    g.rotation.y += pointerStore.x * 0.0006;
    g.rotation.x += -pointerStore.y * 0.0006;

    // Scroll scales/distorts the core for a sense of travel
    const p = Math.max(0, Math.min(1, scrollStore.progress));
    const scale = 1 + Math.sin(p * Math.PI) * 0.3;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, Math.min(d * 1.4, 1)));

    matRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.32;
    // Slow, organic warping — the field straining to contain the particles
    const targetDistort = 0.2 + p * 0.32 + Math.sin(state.clock.elapsedTime * 0.32) * 0.045;
    const u = matRef.current.uniforms.uDistort;
    u.value += (targetDistort - u.value) * Math.min(d * 1.4, 1);
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
