import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const ThreeJsHomePage = () => {
  const starRef = useRef();
  const { scene } = useThree();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [move, setMove] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (event) => {
    setPointerDown(true);
    setPointerPos({ x: event.clientX, y: event.clientY });
  };

  const handlePointerUp = () => {
    setPointerDown(false);
  };

  const handlePointerMove = (event) => {
    if (!pointerDown) return;
    const dx = event.clientX - pointerPos.x;
    const dy = event.clientY - pointerPos.y;
    setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
    setPointerPos({ x: event.clientX, y: event.clientY });
    setMove(true);
  };

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  useFrame(({ clock }) => {
    if (starRef.current) {
      const speed = move ? 0.2 : 0.1;
      const { x, y } = rotate;
      starRef.current.rotation.set(x, y + clock.elapsedTime * 0.5, 0);
      starRef.current.translateZ(-speed);
      setMove(false);
    }
  });

  useEffect(() => {
    const pointLight = new THREE.PointLight('yellow', 5, 5);
    starRef.current.add(pointLight);
  }, [scene]);

  return (
    <group ref={starRef}>
      <Icosahedron args={[1, 2]} castShadow>
        <meshStandardMaterial
          attach="material"
          color="yellow"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </Icosahedron>
    </group>
  );
};

export default ThreeJsHomePage;
