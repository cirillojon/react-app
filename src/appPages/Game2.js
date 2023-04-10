// Memory Card Game

import React, { useState, useEffect } from 'react';
import './Game2.css';

const MemoryCard = ({ card, onClick }) => {
  return (
    <button
      className={`memory-card ${card.flipped ? 'flipped' : ''}`}
      onClick={onClick}
      disabled={card.flipped}
    >
      {card.flipped && card.value}
    </button>
  );
};

const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateCards = () => {
  const values = 'ABCDEF';
  const cards = values
    .split('')
    .concat(values.split(''))
    .map((value) => ({ value, flipped: false, found: false }));
  return shuffleArray(cards);
};

const Game2 = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.card.value === secondCard.card.value) {
          setCards(
            cards.map((card, index) =>
              index === firstCard.index || index === secondCard.index
                ? { ...card, found: true }
                : card
            )
          );
        } else {
          setCards(
            cards.map((card, index) =>
              index === firstCard.index || index === secondCard.index
                ? { ...card, flipped: false }
                : card
            )
          );
        }
        setFlippedCards([]);
      }, 1500);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2) {
      setCards((prevCards) => {
        const updatedCards = prevCards.map((card, i) =>
          i === index ? { ...card, flipped: true } : card
        );
  
        setFlippedCards((prevFlippedCards) => [
          ...prevFlippedCards,
          { card: updatedCards[index], index },
        ]);
  
        return updatedCards;
      });
    }
  };
  

  return (
    <div>
      <h1>Memory Card Game</h1>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <MemoryCard key={index} card={card} onClick={() => handleCardClick(index)} />
        ))}
      </div>
    </div>
  );
};

export default Game2;
