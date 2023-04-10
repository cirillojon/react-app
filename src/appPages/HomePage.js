import React from 'react';
import { Canvas, ambientLight } from '@react-three/fiber';
import { Stars, PointLight } from '@react-three/drei';
import ThreeJsHomePage from './ThreeJsHomePage';

const HomePage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1>Welcome to the Home Page</h1>
      <p>One day this will be something great.</p>
      <Canvas style={{ background: '#000033' }} camera={{ position: [0, 0, 15], fov: 75 }}>
      <Stars />
      <ambientLight intensity={0.5} /> {/* Update the component usage */}
      <PointLight position={[10, 10, 10]} intensity={1} />
      <ThreeJsHomePage />
    </Canvas>
    </div>
  );
}

export default HomePage;
