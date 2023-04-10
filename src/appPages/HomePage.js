// HomePage.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ThreeJsHomePage from './ThreeJsHomePage';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>One day this will be something great.</p>
      <Canvas>
        <Stars />
        <ThreeJsHomePage />
      </Canvas>
    </div>
  );
};

export default HomePage;
