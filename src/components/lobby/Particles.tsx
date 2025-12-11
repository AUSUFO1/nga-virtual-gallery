'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export default function Particles() {
  const particlesRef = useRef<Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
    }
  });

  const particlePositions = Array.from({ length: 50 }, () => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
  ]);

  return (
    <group ref={particlesRef}>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color="#a8cf45"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
