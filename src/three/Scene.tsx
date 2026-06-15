import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import * as THREE from 'three';
import { ParticleField } from './ParticleField';
import { WireCore } from './WireCore';
import { bindPointer } from '../motion/scrollStore';

interface SceneProps { night?: boolean; }

export function Scene({ night = false }: SceneProps) {
  useEffect(() => { bindPointer(); }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 60, near: 0.1, far: 100 }}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      frameloop="always"
    >
      <WireCore night={night} />
      <ParticleField night={night} />

      {/* Ambient sprite dust — soft haze far behind the core */}
      <Sparkles
        count={90}
        scale={[16, 10, 8]}
        size={2.2}
        speed={0.25}
        opacity={0.35}
        color={night ? '#C8C9FF' : '#F4F4F2'}
        noise={1.2}
      />
      {/* Accent energy sparks drifting near the core */}
      <Sparkles
        count={36}
        scale={[7, 6, 5]}
        size={3.5}
        speed={0.5}
        opacity={0.7}
        color={night ? '#8C8BFF' : '#CCFF00'}
        noise={2.5}
      />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.42}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.6}
          mipmapBlur
          kernelSize={KernelSize.MEDIUM}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0006, 0.0006)}
          radialModulation={false}
          modulationOffset={0}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </Canvas>
  );
}
