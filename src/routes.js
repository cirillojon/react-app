import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './appPages/HomePage';
import Minigames from './appPages/Minigames';
import Game2 from './appPages/Game2';
import Game1 from './appPages/Game1';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/minigames" element={<Minigames />} />
    <Route path="/Game2" element={<Game2 />} />
    <Route path="/Game1" element={<Game1 />} />
  </Routes>
);

export default AppRoutes;
