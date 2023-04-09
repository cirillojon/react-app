import React, { useState } from "react";

const AboutPage = () => {
  const [numberToGuess] = useState(Math.floor(Math.random() * 10) + 1);
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleUserGuess = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const guess = parseInt(userGuess, 10);

    if (guess === numberToGuess) {
      setFeedback("Correct! You guessed the number!");
    } else if (guess > numberToGuess) {
      setFeedback("Too high! Try a lower number.");
    } else {
      setFeedback("Too low! Try a higher number.");
    }
  };

  return (
    <div>
      <h1>About Us</h1>
      <p>We are a company dedicated to providing the best services to our clients.</p>
      <h2>Number Guessing Game</h2>
      <p>Guess a number between 1 and 10:</p>
      <form onSubmit={handleSubmit}>
        <input type="number" value={userGuess} onChange={handleUserGuess} min="1" max="10" required />
        <button type="submit">Submit</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default AboutPage;
