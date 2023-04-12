import React, { useState } from 'react';
import './Game5.css';

const MovingButton = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseOver = () => {
    const newTop = Math.floor(Math.random() * window.innerHeight - 50);
    const newLeft = Math.floor(Math.random() * window.innerWidth - 50);

    setPosition({ top: newTop, left: newLeft });
  };

  const handleClick = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  return (
    <button
      className="moving-button"
      style={{ top: position.top, left: position.left }}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      Click me
    </button>
  );
};

export default MovingButton;
