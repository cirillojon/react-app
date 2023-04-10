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

const handleTouch = useCallback((event) => {
  setStartX(event.touches[0].clientX);
  setStartY(event.touches[0].clientY);
}, []);


const handleEnd = useCallback(
    (endEvent) => {
      if (gameOver) return;
  
      endEvent.preventDefault();
      const endX = endEvent.changedTouches[0].clientX;
      const endY = endEvent.changedTouches[0].clientY;
  
      const diffX = endX - startX;
      const diffY = endY - startY;
  
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
        } else {
          setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
        }
      } else {
        if (diffY > 0) {
          setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
        } else {
          setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
        }
      }
    },
    [gameOver, startX, startY]
  );



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
    newHead.y < 0 ||
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
    window.addEventListener("keydown", changeDirection);
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("keydown", changeDirection);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [changeDirection, handleTouch, handleEnd]);

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