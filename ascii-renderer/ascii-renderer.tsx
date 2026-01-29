"use client";

import React, { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect.js";

export const AsciiRenderer = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%', background: '#000' }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      <Torusknot />
      <OrbitControls enableDamping dampingFactor={0.05} />
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
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!gl || !gl.domElement) return;

    try {
      const effect = new AsciiEffect(gl, " .:-+*=%@#", { 
        invert: true,
        resolution: 0.15 
      });

      effect.domElement.style.position = "absolute";
      effect.domElement.style.top = "0";
      effect.domElement.style.left = "0";
      effect.domElement.style.color = "white";
      effect.domElement.style.backgroundColor = "black";
      effect.domElement.style.pointerEvents = "none";
      effect.domElement.style.width = "100%";
      effect.domElement.style.height = "100%";

      effect.setSize(size.width, size.height);

      containerRef.current = gl.domElement.parentElement;
      if (containerRef.current) {
        containerRef.current.appendChild(effect.domElement);
        gl.domElement.style.display = 'none';
      }

      effectRef.current = effect;

      return () => {
        if (effectRef.current && containerRef.current) {
          const elem = effectRef.current.domElement;
          if (elem && elem.parentNode) {
            containerRef.current.removeChild(elem);
          }
          if (gl.domElement) {
            gl.domElement.style.display = 'block';
          }
        }
        effectRef.current = null;
      };
    } catch (error) {
      console.error("ASCII effect error:", error);
    }
  }, [gl, size.width, size.height]);

  useFrame(() => {
    if (effectRef.current && scene && camera) {
      effectRef.current.render(scene, camera);
    }
  }, 1);

  return null;
};
