import React, { useState, useEffect, useCallback } from 'react';
import './Game4.css';

const getRandomPosition = (gridSize) => Math.floor(Math.random() * gridSize);

const Game4 = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: getRandomPosition(20), y: getRandomPosition(20) });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [speed] = useState(100);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

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

  const handleTouchStart = useCallback((event) => {
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (gameOver) return;

    event.preventDefault();
    const moveX = event.touches[0].clientX;
    const moveY = event.touches[0].clientY;

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
  }, [gameOver, startX, startY]);

  const moveSnake = useCallback(() => {
  if (gameOver) return;

  const head = snake[0];
  const newHead = { x: head.x, y: head.y };

  switch (direction) {
    case 'UP':
      newHead.y -= 1;
      break;
    case 'DOWN':
      newHead.y += 1;
      break;
    case 'LEFT':
      newHead.x -= 1;
      break;
    case 'RIGHT':
      newHead.x += 1;
      break;
    default:
      break;
  }

  if (
    newHead.x < 0 ||
    newHead.x >= 20 ||
    newHead.y < 0 || // fixed typo here
    newHead.y >= 20 ||
    snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    setGameOver(true);
    return;
  }

  const newSnake = [newHead, ...snake];
  if (newHead.x === food.x && newHead.y === food.y) {
    setFood({ x: getRandomPosition(20), y: getRandomPosition(20) });
  } else {
    newSnake.pop();
  }
  setSnake(newSnake);
}, [snake, food, direction, setSnake, setFood, setGameOver, gameOver]);

useEffect(() => {
    const interval = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(interval);
  }, [moveSnake, speed]);

  useEffect(() => {
    window.addEventListener('keydown', changeDirection);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('keydown', changeDirection);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [changeDirection, handleTouchStart, handleTouchMove]);
  
  return (
    <div className="game4">
      {/* Game board */}
      <div className="game4-grid">
        {/* Food */}
        <div className="food-cell" style={{ left: food.x * 20, top: food.y * 20 }} />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            className={`snake ${index === 0 ? 'snake-head' : ''}`}
            key={index}
            style={{ left: segment.x * 20, top: segment.y * 20 }}
          />
        ))}

        {/* Game Over */}
        {gameOver && <div className="game-over">Game Over</div>}
      </div>
    </div>
    );
};
export default Game4;
