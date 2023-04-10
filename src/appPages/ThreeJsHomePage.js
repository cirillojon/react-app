import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BoxBufferGeometry, MeshStandardMaterial } from 'three';
import { Cone } from '@react-three/drei';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [move, setMove] = useState(false);

  const cubeGeometry = new BoxBufferGeometry(1, 1, 1); // create a BoxBufferGeometry instance
  const cubeMaterial = new MeshStandardMaterial({ color: 'hotpink' }); // create a MeshStandardMaterial instance

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { x, y } = mouseRef.current;
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
      mouseRef.current = { x: event.clientX, y: event.clientY };
      setMove(true);
    };

    const handleTouchMove = (event) => {
      const { x, y } = mouseRef.current;
      const dx = event.touches[0].clientX - x;
      const dy = event.touches[0].clientY - y;
      setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
      mouseRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      setMove(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame(({ clock }) => {
    if (spaceshipRef.current) {
      const speed = move ? 0.2 : 0.1;
      const { x, y } = rotate;
      spaceshipRef.current.rotation.set(x, y + clock.elapsedTime * 0.5, 0);
      spaceshipRef.current.translateZ(-speed);
      setMove(false);
    }
  });


  return (
    <group ref={spaceshipRef}>
      <points>
        <geometry
          vertices={[
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0.5, 0),
            new THREE.Vector3(0.2, 0.2, 0),
            new THREE.Vector3(0.5, 0, 0),
            new THREE.Vector3(0.2, -0.2, 0),
            new THREE.Vector3(0, -0.5, 0),
            new THREE.Vector3(-0.2, -0.2, 0),
            new THREE.Vector3(-0.5, 0, 0),
            new THREE.Vector3(-0.2, 0.2, 0),
          ]}
          attach="geometry"
        />
        <pointsMaterial color="yellow" />
      </points>
      <mesh geometry={cubeGeometry} material={cubeMaterial} position={[0, 0, -2]} />
      <Cone args={[0.5, 1, 5]} position={[0, 1, 0]} castShadow>
        <meshBasicMaterial attach="material" color="red" />
      </Cone>
    </group>
  );
};

export default ThreeJsHomePage;