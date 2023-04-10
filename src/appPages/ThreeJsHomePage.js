// ThreeJsHomePage.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, CylinderBufferGeometry, ConeBufferGeometry, MeshBasicMaterial, Vector3 } from 'three';

const Spaceship = () => {
  const material = new MeshBasicMaterial({ color: 'yellow' });

  const body = (
    <mesh>
      <CylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 2, 32]} />
      {material}
    </mesh>
  );

  const nose = (
    <mesh position={new Vector3(0, 0, 1)}>
      <ConeBufferGeometry attach="geometry" args={[0.5, 1, 32]} />
      {material}
    </mesh>
  );

  return (
    <Group>
      {body}
      {nose}
    </Group>
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
    <mesh ref={spaceshipRef}>
      <Spaceship />
    </mesh>
  );
};

export default ThreeJsHomePage;
