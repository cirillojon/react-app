// ThreeJsHomePage.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const ThreeJsHomePage = () => {
  const starRef = useRef();

  useFrame((state) => {
    if (starRef.current) {
      const time = state.clock.getElapsedTime();
      starRef.current.position.x = Math.sin(time) * 10;
      starRef.current.position.y = Math.cos(time) * 10;
    }
  });

  return (
    <mesh ref={starRef}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshBasicMaterial attach="material" color="yellow" />
    </mesh>
  );
};

export default ThreeJsHomePage;
