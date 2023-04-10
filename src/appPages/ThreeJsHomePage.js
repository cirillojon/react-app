// ThreeJsHomePage.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();

  useFrame((state) => {
    if (spaceshipRef.current) {
      const time = state.clock.getElapsedTime();
      spaceshipRef.current.position.x = (Math.sin(time) * 5) - 5;
      spaceshipRef.current.position.y = Math.cos(time) * 2;
      spaceshipRef.current.rotation.z = Math.PI / 2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <mesh ref={spaceshipRef}>
      <coneBufferGeometry attach="geometry" args={[0.5, 2, 32]} />
      <meshBasicMaterial attach="material" color="yellow" />
    </mesh>
  );
};

export default ThreeJsHomePage;
