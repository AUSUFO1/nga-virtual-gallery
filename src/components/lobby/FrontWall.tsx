'use client';

export default function FrontWall() {
  return (
    <mesh position={[0, 0, -10]} receiveShadow>
      <planeGeometry args={[30, 15]} />
      <meshStandardMaterial 
        roughness={0.8}
      />
    </mesh>
  );
}
