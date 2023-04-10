// HomePage.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import ThreeJsHomePage from './ThreeJsHomePage';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>One day this will be something great.</p>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ThreeJsHomePage />
      </Canvas>
    </div>
  );
}

export default HomePage;
