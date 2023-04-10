import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

const randomPos = () => {
  const max = 10;
  const min = -10;
  return Math.random() * (max - min) + min;
};

const randomColor = () => {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateShapes = () => {
  const shapes = [];

  for (let i = 0; i < 50; i++) {
    shapes.push(
      <Icosahedron key={i} position={[randomPos(), randomPos(), randomPos()]} args={[0.5, 1]}>
        <meshStandardMaterial
          attach="material"
          color={randomColor()}
          emissive={randomColor()}
          emissiveIntensity={0.5}
        />
      </Icosahedron>
    );
  }

  return shapes;
};

const ThreeJsHomePage = () => {
  const starRef = useRef();
  const { scene } = useThree();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [move, setMove] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const { size } = useThree();

  const handlePointerDown = useCallback((event) => {
    setPointerDown(true);
    setPointerPos({ x: event.clientX, y: event.clientY });
  }, []);

  const handlePointerUp = useCallback(() => {
    setPointerDown(false);
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!pointerDown) return;
      const dx = event.clientX - pointerPos.x;
      const dy = event.clientY - pointerPos.y;
      setRotate((r) => ({ x: r.x - dy * 0.01, y: r.y - dx * 0.01 }));
      setPointerPos({ x: event.clientX, y: event.clientY });
      setMove(true);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [handlePointerDown, handlePointerUp, pointerDown, pointerPos]);


  const [shapes, setShapes] = useState([]);

  const frameCount = useRef(0);
  const shapeCreationInterval = 50; // The interval between shape creations, in frames



  useFrame(() => {
    if (starRef.current) {
      const speed = move ? 0.2 : 0.1;
      const { x, y } = rotate;
      starRef.current.rotation.set(x, y, 0);

      const objectZPosition = starRef.current.position.z;
      const halfCanvasSize = size.width / 2;

      if (objectZPosition <= -halfCanvasSize || objectZPosition >= halfCanvasSize) {
        starRef.current.translateZ(speed);
      } else {
        starRef.current.translateZ(-speed);
      }

      setMove(false);
    // Shape generation code
    frameCount.current++;

    if (frameCount.current >= shapeCreationInterval) {
      frameCount.current = 0;
      const newShape = (
        <Icosahedron key={Date.now()} position={[randomPos(), randomPos(), randomPos()]} args={[0.5, 1]}>
          <meshStandardMaterial
            attach="material"
            color={randomColor()}
            emissive={randomColor()}
            emissiveIntensity={0.5}
          />
        </Icosahedron>
      );
      setShapes([...shapes, newShape]);
    }
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
      <Stars />
      {shapes}
    </group>
  );
  
};

export default ThreeJsHomePage;

