// import React, { useMemo, useRef } from 'react';
// import { useFrame } from '@react-three/fiber';

// const SmokeEffect = ({ count, color }) => {
//   const particles = useMemo(() => {
//     const temp = [];
//     for (let i = 0; i < count; i++) {
//       const t = Math.random() * 100;
//       const factor = Math.random() * 20;
//       const speed = 0.01;
//       const xFactor = 0;
//       const yFactor = -1;
//       const zFactor = 0;
//       temp.push({
//         t,
//         factor,
//         speed,
//         xFactor,
//         yFactor,
//         zFactor,
//         mx: 0,
//         my: 0,
//       });
//     }
//     return temp;
//   }, [count]);

//   const particleGeometryRef = useRef();
//   const particleMaterialRef = useRef();

//   useFrame(() => {
//     if (particleGeometryRef.current) {
//       for (let i = 0; i < particles.length; i++) {
//         const particle = particles[i];
//         particle.t += particle.speed * (1 + particle.factor);
//         const positions = particleGeometryRef.current.attributes.position.array;
//         positions[i * 3] = particle.xFactor + Math.sin(particle.t) * particle.factor;
//         positions[i * 3 + 1] = particle.yFactor - particle.t * 0.2;
//         positions[i * 3 + 2] = particle.zFactor + Math.cos(particle.t) * particle.factor;
//       }
//       particleGeometryRef.current.attributes.position.needsUpdate = true;
//     }
//   });

//   return (
//     <points>
//       <bufferGeometry ref={particleGeometryRef} attach="geometry">
//         <bufferAttribute
//           attachObject={['attributes', 'position']}
//           array={new Float32Array(particles.map(({ xFactor, yFactor, zFactor }) => [xFactor, yFactor, zFactor]).flat())}
//           count={particles.length}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial ref={particleMaterialRef} attach="material" size={0.1} sizeAttenuation color={color} transparent opacity={0.2} />
//     </points>
//   );
// };

// export default SmokeEffect;