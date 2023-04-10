// threeJsHome.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SpinningTorusKnot = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(time) * 0.5;
      meshRef.current.rotation.y = Math.sin(time * 1.5) * 0.5;
      meshRef.current.rotation.z = Math.sin(time * 0.75) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={[5, 5, 5]}>
      <torusKnotBufferGeometry attach="geometry" args={[1, 0.4, 64, 16]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

export default SpinningTorusKnot;
