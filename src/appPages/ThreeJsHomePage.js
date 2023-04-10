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

  useFrame(({ clock, viewport }) => {
    if (spaceshipRef.current) {
      const speed = 0.1;
      const { x, y } = rotate;
      spaceshipRef.current.rotation.set(x, y + clock.elapsedTime * 0.5, 0);
      spaceshipRef.current.translateZ(-speed);
  
      // Get the bounding box of the spaceship
      const boundingBox = new THREE.Box3().setFromObject(spaceshipRef.current);
  
      // Check if the spaceship is going off-screen on the left or right
      if (boundingBox.min.x < viewport.width / -2 || boundingBox.max.x > viewport.width / 2) {
        // If so, reverse the x-velocity
        speed *= -1;
        spaceshipRef.current.translateZ(speed * 2);
  
        // Randomize the y-velocity
        spaceshipRef.current.translateY((Math.random() - 0.5) * 2);
  
        // Rotate the spaceship
        spaceshipRef.current.rotation.set(
          spaceshipRef.current.rotation.x,
          spaceshipRef.current.rotation.y + Math.PI,
          spaceshipRef.current.rotation.z
        );
      }
  
      // Check if the spaceship is going off-screen on the top or bottom
      if (boundingBox.min.y < viewport.height / -2 || boundingBox.max.y > viewport.height / 2) {
        // If so, reverse the y-velocity
        speed *= -1;
        spaceshipRef.current.translateZ(speed * 2);
  
        // Randomize the x-velocity
        spaceshipRef.current.translateX((Math.random() - 0.5) * 2);
  
        // Rotate the spaceship
        spaceshipRef.current.rotation.set(
          spaceshipRef.current.rotation.x,
          spaceshipRef.current.rotation.y + Math.PI,
          spaceshipRef.current.rotation.z
        );
      }
    }
  });
  
  return (
    <group ref={spaceshipRef}>
      <Cylinder args={[0.5, 0.5, 2, 32]} castShadow>
        <meshStandardMaterial attach="material" map={metalTexture} />
      </Cylinder>
      <Cone args={[0.5, 1, 32]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial attach="material" map={reflectiveTexture} />
      </Cone>
      <PointLight color="white" position={[0, 1, 0]} intensity={1} />
    </group>
  );
};
const metalTexture = new THREE.TextureLoader().load('/metal.jpg');
const reflectiveTexture = new THREE.TextureLoader().load('/reflective.jpg');

export default ThreeJsHomePage;