import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './appPages/HomePage';
import AboutPage from './appPages/AboutPage';
import ContactPage from './appPages/ContactPage';
import Game1 from './appPages/Game1';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/Game1" element={<Game1 />} />
  </Routes>
);

export default AppRoutes;
