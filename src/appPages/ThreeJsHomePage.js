import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone } from '@react-three/drei';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { x, y } = mouseRef.current;
      const dx = event.clientX - x;
      const dy = event.clientY - y;
      setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleTouchMove = (event) => {
      const { x, y } = mouseRef.current;
      const dx = event.touches[0].clientX - x;
      const dy = event.touches[0].clientY - y;
      setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
      mouseRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
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
      const speed = 0.1;
      const { x, y } = rotate;
      spaceshipRef.current.rotation.set(x, y + clock.elapsedTime * 0.5, 0);
      spaceshipRef.current.translateZ(-speed);
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
