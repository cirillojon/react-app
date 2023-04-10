import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone } from '@react-three/drei';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();
  const [move, setMove] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') setMove((m) => ({ ...m, forward: true }));
      if (event.key === 's') setMove((m) => ({ ...m, backward: true }));
      if (event.key === 'a') setMove((m) => ({ ...m, left: true }));
      if (event.key === 'd') setMove((m) => ({ ...m, right: true }));
      if (event.key === ' ') setMove((m) => ({ ...m, up: true }));
      if (event.key === 'Shift') setMove((m) => ({ ...m, down: true }));
    };

    const handleKeyUp = (event) => {
      if (event.key === 'w') setMove((m) => ({ ...m, forward: false }));
      if (event.key === 's') setMove((m) => ({ ...m, backward: false }));
      if (event.key === 'a') setMove((m) => ({ ...m, left: false }));
      if (event.key === 'd') setMove((m) => ({ ...m, right: false }));
      if (event.key === ' ') setMove((m) => ({ ...m, up: false }));
      if (event.key === 'Shift') setMove((m) => ({ ...m, down: false }));
    };

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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
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
    