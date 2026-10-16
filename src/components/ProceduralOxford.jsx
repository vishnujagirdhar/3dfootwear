import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Procedural Oxford Shoe
 * Crafted with Three.js primitives and premium MeshPhysicalMaterial
 * for ultra-realistic glossy black leather reflections, sole layering, and brass accents.
 */
export function ProceduralOxford({ scale = 1, ...props }) {
  // Upper leather material (glossy black calfskin)
  const upperMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0c0c0e'),
      roughness: 0.22,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      sheen: 0.4,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color('#2a2723'),
      reflectivity: 0.8,
    });
  }, []);

  // Toe Cap material (slightly higher polish)
  const capMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#08080a'),
      roughness: 0.15,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 0.5,
      reflectivity: 0.9,
    });
  }, []);

  // Sole material (vegetable-tanned leather sole edge)
  const soleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#221c18'),
      roughness: 0.55,
      metalness: 0.05,
    });
  }, []);

  // Welt material (stitch line edge with subtle warm tone)
  const weltMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#382f25'),
      roughness: 0.6,
      metalness: 0.1,
    });
  }, []);

  // Heel rubber tap material
  const heelTapMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#141414'),
      roughness: 0.7,
      metalness: 0.0,
    });
  }, []);

  // Brass hardware (eyelets, heel brass nails)
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b08d57'),
      roughness: 0.28,
      metalness: 0.85,
    });
  }, []);

  // Laces material (black waxed cotton)
  const laceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#161616'),
      roughness: 0.75,
      metalness: 0.0,
    });
  }, []);

  // Sole Shape (classic English oxford silhouette: tapered toe, waist curve, rounded heel)
  const { soleGeo, weltGeo } = useMemo(() => {
    const shape = new THREE.Shape();
    // Starting at heel center back
    shape.moveTo(0, -1.8);
    // Left heel curve
    shape.bezierCurveTo(-0.7, -1.8, -0.75, -1.2, -0.7, -0.7);
    // Left waist inward taper
    shape.bezierCurveTo(-0.65, -0.2, -0.55, 0.4, -0.85, 1.2);
    // Left ball of foot swell
    shape.bezierCurveTo(-0.95, 1.6, -0.9, 2.2, -0.6, 2.7);
    // Toe apex curve (almond toe)
    shape.bezierCurveTo(-0.35, 3.1, 0.1, 3.2, 0.3, 3.0);
    // Right ball taper
    shape.bezierCurveTo(0.7, 2.6, 0.8, 1.9, 0.75, 1.3);
    // Right waist curve
    shape.bezierCurveTo(0.55, 0.5, 0.55, -0.2, 0.65, -0.7);
    // Right heel curve back to center
    shape.bezierCurveTo(0.7, -1.2, 0.65, -1.8, 0, -1.8);

    const extrudeSettings = {
      depth: 0.18,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };

    const sole = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Center geometry horizontally and vertically
    sole.rotateX(Math.PI / 2);
    sole.translate(0, -0.1, 0);

    // Welt geometry: slightly wider ribbon above sole
    const weltSettings = {
      depth: 0.06,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.02,
    };
    const welt = new THREE.ExtrudeGeometry(shape, weltSettings);
    welt.rotateX(Math.PI / 2);
    welt.translate(0, 0.02, 0);

    return { soleGeo: sole, weltGeo: welt };
  }, []);

  return (
    <group {...props} scale={[scale, scale, scale]} dispose={null}>
      {/* --- SOLE & HEEL --- */}
      {/* Main Leather Outsole */}
      <mesh geometry={soleGeo} material={soleMaterial} castShadow receiveShadow />

      {/* Goodyear Welt Lip */}
      <mesh geometry={weltGeo} material={weltMaterial} castShadow receiveShadow />

      {/* Stacked Leather Heel */}
      <group position={[0, -0.28, -1.25]}>
        {/* Upper stacked lift */}
        <mesh position={[0, 0.08, 0]} material={soleMaterial} castShadow>
          <cylinderGeometry args={[0.62, 0.64, 0.18, 32]} />
        </mesh>
        {/* Rubber heel top-lift / tap */}
        <mesh position={[0, -0.04, 0]} material={heelTapMaterial} castShadow>
          <cylinderGeometry args={[0.63, 0.65, 0.08, 32]} />
        </mesh>
        {/* Decorative Brass Slug / Nails */}
        <mesh position={[0.3, -0.07, 0.3]} material={brassMaterial}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
        </mesh>
        <mesh position={[-0.3, -0.07, 0.3]} material={brassMaterial}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
        </mesh>
        <mesh position={[0.3, -0.07, -0.3]} material={brassMaterial}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
        </mesh>
        <mesh position={[-0.3, -0.07, -0.3]} material={brassMaterial}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
        </mesh>
      </group>

      {/* --- SHOE UPPER --- */}
      {/* 1. Forefoot / Vamp Last */}
      <mesh position={[0, 0.42, 0.9]} rotation={[0.18, 0, 0]} material={upperMaterial} castShadow receiveShadow>
        <sphereGeometry args={[0.82, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
      </mesh>

      {/* 2. Cap Toe Overlay (Distinctive Oxford trait) */}
      <group position={[0, 0.34, 2.15]} rotation={[0.32, 0, 0]}>
        <mesh material={capMaterial} castShadow receiveShadow>
          <sphereGeometry args={[0.68, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        </mesh>
        {/* Fine double-stitch seam line */}
        <mesh position={[0, 0.05, -0.38]} rotation={[-0.35, 0, 0]} material={brassMaterial}>
          <torusGeometry args={[0.55, 0.012, 8, 32, Math.PI * 0.9]} />
        </mesh>
      </group>

      {/* 3. Instep / Throat & Closed Lacing Facings */}
      <mesh position={[0, 0.68, -0.05]} rotation={[-0.42, 0, 0]} material={upperMaterial} castShadow>
        <cylinderGeometry args={[0.56, 0.74, 1.4, 32, 4]} />
      </mesh>

      {/* 4. Heel Quarters & Counter */}
      <mesh position={[0, 0.62, -1.05]} rotation={[-0.05, 0, 0]} material={upperMaterial} castShadow>
        <cylinderGeometry args={[0.58, 0.64, 1.05, 32, 4]} />
      </mesh>

      {/* 5. Ankle Collar / Topline Roll */}
      <mesh position={[0, 1.12, -0.85]} rotation={[0.24, 0, 0]} material={capMaterial}>
        <torusGeometry args={[0.48, 0.05, 16, 40]} />
      </mesh>

      {/* 6. Padded Tongue Underneath Lacing */}
      <mesh position={[0, 0.88, -0.15]} rotation={[-0.48, 0, 0]} material={upperMaterial}>
        <boxGeometry args={[0.38, 0.9, 0.06]} />
      </mesh>

      {/* 7. Oxford Closed Lacing System & Eyelets */}
      <group position={[0, 0.85, 0.15]} rotation={[-0.42, 0, 0]}>
        {/* 5 Rows of Lacing Bars and Brass Eyelets */}
        {[-0.32, -0.16, 0, 0.16, 0.32].map((yOffset, i) => (
          <group key={i} position={[0, yOffset, 0.36]}>
            {/* Left Eyelet */}
            <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={brassMaterial}>
              <ringGeometry args={[0.015, 0.032, 16]} />
            </mesh>
            {/* Right Eyelet */}
            <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={brassMaterial}>
              <ringGeometry args={[0.015, 0.032, 16]} />
            </mesh>
            {/* Horizontal Bar Lacing (Classic Oxford Style) */}
            <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]} material={laceMaterial} castShadow>
              <cylinderGeometry args={[0.018, 0.018, 0.28, 12]} />
            </mesh>
          </group>
        ))}

        {/* Tied Lace Knot & Tails */}
        <mesh position={[0, 0.44, 0.38]} material={laceMaterial}>
          <sphereGeometry args={[0.045, 12, 12]} />
        </mesh>
        <mesh position={[-0.12, 0.38, 0.4]} rotation={[0, 0, -0.6]} material={laceMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.22, 12]} />
        </mesh>
        <mesh position={[0.12, 0.38, 0.4]} rotation={[0, 0, 0.6]} material={laceMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.22, 12]} />
        </mesh>
      </group>

      {/* 8. Heel Stiffener Seam & Pull Tab Accents */}
      <mesh position={[0, 0.68, -1.62]} material={capMaterial}>
        <boxGeometry args={[0.06, 0.95, 0.03]} />
      </mesh>
    </group>
  );
}

export default ProceduralOxford;
