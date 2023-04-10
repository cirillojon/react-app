import React, { useState, useEffect, useCallback } from 'react';
import './Game4.css';

const getRandomPosition = (gridSize) => Math.floor(Math.random() * gridSize);

const Game4 = () => {
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: getRandomPosition(20), y: getRandomPosition(20) });
    const [direction, setDirection] = useState('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [speed] = useState(100);

  const changeDirection = useCallback((event) => {
  switch (event.key) {
    case 'ArrowUp':
      setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
      break;
    case 'ArrowDown':
      setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
      break;
    case 'ArrowLeft':
      setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
      break;
    case 'ArrowRight':
      setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
      break;
    default:
      break;
  }
}, []);

const handleTouch = useCallback((event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}, []);

const handleMove = useCallback((moveEvent) => {
  if (gameOver) return;

  moveEvent.preventDefault();
  const moveX = moveEvent.touches[0].clientX;
  const moveY = moveEvent.touches[0].clientY;

  const diffX = moveX - startX;
  const diffY = moveY - startY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
    } else {
      setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
    }
  } else {
    if (diffY > 0) {
      setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
    } else {
      setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
    }
  }
}, []);


  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, speed);
    return () => clearInterval(interval);
  }, [moveSnake, speed]);
  

  useEffect(() => {
  window.addEventListener('keydown', changeDirection);
  window.addEventListener('touchstart', handleTouch);
  window.addEventListener('touchmove', handleMove);
  return () => {
    window.removeEventListener('keydown', changeDirection);
    window.removeEventListener('touchstart', handleTouch);
    window.removeEventListener('touchmove', handleMove);
  };
}, [changeDirection, handleTouch, handleMove]);

  return (
    <div className="game4">
      <h1>Snake Game</h1>
      {gameOver ? <h2>Game Over!</h2> : null}
      <div className="game4-grid">
        {Array.from({ length: 20 * 20 }, (_, index) => {
          const x = index % 20;
          const y = Math.floor(index / 20);

          if (snake.some((segment) => segment.x === x && segment.y === y)) {
            return <div key={index} className="snake-cell"></div>;
          }

          if (food.x === x && food.y === y) {
            return <div key={index} className="food-cell"></div>;
          }

          return <div key={index} className="empty-cell"></div>;
        })}
      </div>
    </div>
  );
};

export default Game4;
