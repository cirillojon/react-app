import React, { useState, useEffect } from "react";
import "./Game3.css";

const Hole = ({ active, onClick }) => {
  return (
    <button className={`hole ${active ? "active" : ""}`} onClick={onClick}></button>
  );
};

const Game3 = () => {
  const [holes, setHoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const moleTimer = setTimeout(() => {
        const randomHoleIndex = Math.floor(Math.random() * holes.length);
        setHoles(holes.map((_, index) => index === randomHoleIndex));
      }, 500);

      return () => clearTimeout(moleTimer);
    } else {
      setHoles(Array(9).fill(false));
    }
  }, [holes, timeLeft]);

  const handleWhack = (index) => {
    if (holes[index]) {
      setScore(score + 1);
      setHoles(holes.map((_, i) => i === index && false));
    }
  };

  return (
    <div className="game3">
      <h1>Whac-A-Mole</h1>
      <h2>Score: {score}</h2>
      <h3>Time Left: {timeLeft}s</h3>
      <div className="holes-grid">
        {holes.map((active, index) => (
          <Hole key={index} active={active} onClick={() => handleWhack(index)} />
        ))}
      </div>
    </div>
  );
};

export default Game3;
