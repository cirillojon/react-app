import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Cone } from '@react-three/drei';
// import SmokeEffect from './SmokeEffect';

const ThreeJsHomePage = () => {
  const spaceshipRef = useRef();
  const [move, setMove] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });

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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (spaceshipRef.current) {
      const speed = 0.1;
      if (move.forward) spaceshipRef.current.position.z -= speed;
      if (move.backward) spaceshipRef.current.position.z += speed;
      if (move.left) spaceshipRef.current.position.x -= speed;
      if (move.right) spaceshipRef.current.position.x += speed;
      if (move.up) spaceshipRef.current.position.y += speed;
      if (move.down) spaceshipRef.current.position.y -= speed;
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
      {/* <SmokeEffect count={500} color="white" /> */}
    </group>
  );
};

export default ThreeJsHomePage;