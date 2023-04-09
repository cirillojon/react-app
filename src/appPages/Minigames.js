import React, { useState } from "react";

const choices = ["rock", "paper", "scissors"];

const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }

  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "You win!";
  }

  return "You lose!";
};

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    const computerSelectedChoice = getRandomChoice();
    setComputerChoice(computerSelectedChoice);
    setResult(determineWinner(choice, computerSelectedChoice));
  };

  return (
    <div>
      <h2>Rock-Paper-Scissors</h2>
      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleUserChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>
      {userChoice && computerChoice && (
        <p>
          You chose {userChoice}, computer chose {computerChoice}. {result}
        </p>
      )}
    </div>
  );
};

const Minigames = () => {
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
      <h1>Minigames</h1>

      <h2>Number Guessing Game</h2>
      <p>Guess a number between 1 and 10:</p>
      <form onSubmit={handleSubmit}>
        <input type="number" value={userGuess} onChange={handleUserGuess} min="1" max="10" required />
        <button type="submit">Submit</button>
      </form>
      {feedback && <p>{feedback}</p>}

      <RockPaperScissors />
    </div>
  );
};

export default Minigames;
