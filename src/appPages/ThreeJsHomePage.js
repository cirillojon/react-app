// ThreeJsHomePage.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CylinderBufferGeometry, ConeBufferGeometry } from 'three';

const Spaceship = () => {
  return (
    <>
      <mesh>
        <CylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 2, 32]} />
        <meshBasicMaterial attach="material" color="yellow" />
      </mesh>
      <mesh position={[0, 0, 1]}>
        <ConeBufferGeometry attach="geometry" args={[0.5, 1, 32]} />
        <meshBasicMaterial attach="material" color="yellow" />
      </mesh>
    </>
  );
};

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();

  useFrame((state) => {
    if (spaceshipRef.current) {
      const time = state.clock.getElapsedTime();
      spaceshipRef.current.position.x = Math.sin(time) * 5;
      spaceshipRef.current.position.y = Math.cos(time) * 2;
      spaceshipRef.current.rotation.z = Math.PI / 2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={spaceshipRef}>
      <Spaceship />
    </group>
  );
};

export default ThreeJsHomePage;
