"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Turbine() {
  const groupRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        state.clock.elapsedTime * 0.3 +
        (state.pointer.x * Math.PI) / 6;
      groupRef.current.rotation.x = state.pointer.y * 0.2;
    }
    if (bladeRef.current) {
      bladeRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={bladeRef}>
          <torusGeometry args={[1.2, 0.15, 16, 32]} />
          <MeshDistortMaterial
            color="#0066cc"
            metalness={0.8}
            roughness={0.2}
            distort={0.2}
            speed={2}
          />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 1.5, 32]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            rotation={[0, 0, (i * Math.PI) / 3]}
            position={[0, 0, 0.3]}
          >
            <boxGeometry args={[0.08, 1.8, 0.4]} />
            <meshStandardMaterial color="#00d4ff" metalness={0.7} roughness={0.2} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export function HeroSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00d4ff" />
      <Turbine />
      <Environment preset="city" />
    </Canvas>
  );
}
