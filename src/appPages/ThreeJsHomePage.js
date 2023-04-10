import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone } from '@react-three/drei';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();

  useFrame((state) => {
    if (spaceshipRef.current) {
      const time = state.clock.getElapsedTime();
      spaceshipRef.current.position.x = (Math.sin(time) * 10) - 5;
      spaceshipRef.current.position.y = Math.cos(time) * 2;
      spaceshipRef.current.rotation.z = Math.PI / 2 + Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={spaceshipRef}>
      <Cylinder args={[0.5, 0.5, 2, 32]} castShadow>
        <meshBasicMaterial attach="material" color="yellow" />
      </Cylinder>
      <Cone args={[0.5, 1, 32]} position={[0, 1, 0]} castShadow>
        <meshBasicMaterial attach="material" color="red" />
      </Cone>
    </group>
  );
};

export default ThreeJsHomePage;
