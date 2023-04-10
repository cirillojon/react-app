import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';

const ThreeJsHomePage = () => {
  const starRef = useRef();
  const { scene } = useThree();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const [move, setMove] = useState(false);

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
