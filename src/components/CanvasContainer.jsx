import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';

export function CanvasContainer({
  children,
  camera = { position: [0, 1.2, 5.5], fov: 38 },
  className = 'w-full h-full',
  shadows = true,
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.1,
        }}
        shadows={shadows}
        {...props}
      >
        {/* Soft, Moody Studio Lighting */}
        <ambientLight intensity={0.4} />

        {/* Key Spotlight focusing on the oxford vamp */}
        <spotLight
          position={[4, 6, 5]}
          angle={0.45}
          penumbra={1}
          intensity={2.8}
          color="#ffffff"
          castShadow
          shadow-mapSize={1024}
          shadow-bias={-0.0001}
        />

        {/* Warm Brass Edge Rim Light from back-left */}
        <spotLight
          position={[-5, 3, -4]}
          angle={0.6}
          penumbra={0.8}
          intensity={1.8}
          color="#b08d57"
        />

        {/* Cold subtle fill light from lower right */}
        <directionalLight
          position={[3, -2, 2]}
          intensity={0.4}
          color="#e0e4eb"
        />

        {/* Soft Contact Shadow beneath shoe */}
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.65}
          scale={7}
          blur={2.4}
          far={3}
          color="#000000"
        />

        {/* Studio HDR Reflections for deep leather highlights */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default CanvasContainer;
