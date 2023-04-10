// import * as THREE from 'three';
import React, { useMemo } from 'react';

const SmokeEffect = ({ count, color }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20;
      const speed = 0.01;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = -5 + Math.random() * 10;
      const zFactor = -5 + Math.random() * 10;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
      });
    }
    return temp;
  }, [count]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={new Float32Array(particles.map(({ xFactor, yFactor, zFactor }) => [xFactor, yFactor, zFactor]).flat())}
          count={particles.length}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial attach="material" size={0.1} sizeAttenuation color={color} transparent opacity={0.2} />
    </points>
  );
};

export default SmokeEffect;
