import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTrail, a } from '@react-spring/three';
import { Star } from '@react-three/drei';

const TrailStar = ({ count, children, ...props }) => {
  const [trail, setTrail] = useTrail(count, () => ({
    scale: [1, 1, 1],
    config: { mass: 10, tension: 1000, friction: 200 },
  }));

  useEffect(() => {
    setTrail({ scale: [1.2, 1.2, 1.2] });
  }, [setTrail]);

  return (
    <>
      {trail.map((style, index) => (
        <a.group key={index} {...props} scale={style.scale}>
          {children}
        </a.group>
      ))}
    </>
  );
};

const ThreeJsHomePage = () => {
  const starRef = useRef();
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

  return (
    <TrailStar ref={starRef} count={1}>
      <Star radius={1} spikes={5} innerRadius={0.4} outerRadius={1} castShadow>
        <meshBasicMaterial attach="material" color="yellow" />
      </Star>
    </TrailStar>
  );
};

export default ThreeJsHomePage;