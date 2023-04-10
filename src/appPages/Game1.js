import React, { useState, useEffect, useCallback } from "react";
import './Game1.css';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};



const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = useCallback(
  (i) => {
    if (!isXNext) {
      // Don't allow clicks when it's not the player's turn
      return;
    }

    const newSquares = squares.slice();
    if (newSquares[i] || calculateWinner(newSquares)) {
      return;
    }
    newSquares[i] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);

    // AI's turn
    setTimeout(() => {
      handleAIMove();
    }, 1000); // Wait 1 second before making the AI move
  },
  [isXNext, squares, handleAIMove]
);
  

  const handleAIMove = useCallback(() => {
  if (isXNext) {
    // Don't make a move when it's the player's turn
    return;
  }

  const emptySquareIndex = getRandomEmptySquareIndex(squares);
  if (emptySquareIndex !== null) {
    const newSquares = squares.slice();
    if (newSquares[emptySquareIndex] || calculateWinner(newSquares)) {
      return;
    }
    newSquares[emptySquareIndex] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }
}, [squares, isXNext]);

  const getRandomEmptySquareIndex = (squares) => {
    const emptySquares = squares
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (emptySquares.length === 0) {
      return null;
    }

    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};


const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game1 = () => {
  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
};

export default Game1;
