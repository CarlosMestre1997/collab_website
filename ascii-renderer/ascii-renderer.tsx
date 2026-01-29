"use client";

import React, { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

export const AsciiRenderer = () => {
  return (
    <Canvas
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Torusknot />
      <OrbitControls enableDamping={false} />
      <Renderer />
    </Canvas>
  );
};

const Torusknot = () => {
  const meshRef = useRef<any>(null);

  useFrame(
    (state, delta) =>
      (meshRef.current.rotation.x = meshRef.current.rotation.y += delta / 2),
  );

  return (
    <mesh ref={meshRef} scale={1.25}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
};

const Renderer = () => {
  const { gl, scene, camera, size } = useThree();
  const effectRef = useRef<AsciiEffect | null>(null);

  useEffect(() => {
    if (!gl || !gl.domElement) {
      console.error("WebGL context not available");
      return;
    }

    try {
      const effect = new AsciiEffect(gl, " .:-+*=%@#", { invert: true });

      effect.domElement.style.position = "absolute";
      effect.domElement.style.top = "0px";
      effect.domElement.style.left = "0px";
      effect.domElement.style.color = "white";
      effect.domElement.style.backgroundColor = "black";
      effect.domElement.style.pointerEvents = "none";

      effect.setSize(size.width, size.height);

      const container = gl.domElement.parentNode;
      if (container) {
        container.appendChild(effect.domElement);
        gl.domElement.style.display = 'none';
      }

      effectRef.current = effect;

      return () => {
        if (effectRef.current && container && effect.domElement.parentNode) {
          container.removeChild(effect.domElement);
          gl.domElement.style.display = 'block';
        }
      };
    } catch (error) {
      console.error("Failed to initialize ASCII effect:", error);
    }
  }, [gl, size]);

  useFrame(() => {
    if (effectRef.current) {
      effectRef.current.render(scene, camera);
    }
  }, 1);

  return null;
};
