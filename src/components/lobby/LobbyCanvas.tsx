'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import Particles from './Particles';
import FrontWall from './FrontWall';

export default function LobbyCanvas() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Set scene background to dark/transparent */}
        <color attach="background" args={['#0a1f1a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a8cf45" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Stars Background */}
        <Stars 
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* 3D Elements */}
        <FrontWall />
        <Particles />

        {/* FIXED: Lock horizontal rotation, keep 3D depth */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
        />
      </Canvas>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-nga-navy/70 via-transparent to-[#1a4d2e]/80 pointer-events-none" />
    </>
  );
}