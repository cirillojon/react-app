import React, { useState } from 'react';
import './MovingButton.css';

const MovingButton = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseOver = () => {
    const newTop = Math.floor(Math.random() * window.innerHeight - 50);
    const newLeft = Math.floor(Math.random() * window.innerWidth - 50);

    setPosition({ top: newTop, left: newLeft });
  };

  return (
    <button
      className="moving-button"
      style={{ top: position.top, left: position.left }}
      onMouseOver={handleMouseOver}
    >
      Click me
    </button>
  );
};

export default MovingButton;
