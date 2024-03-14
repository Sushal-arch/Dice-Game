import { useState } from "react";

export default function App() {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [currentScoreP1, setCurrentScoreP1] = useState(0);
  const [currentScoreP2, setCurrentScoreP2] = useState(0);
  const [image, setImage] = useState(null);
  const [rollClicked, setRollClicked] = useState(false);
  //For hold functionality
  const [totalScore1, setTotalScore1] = useState(0);
  const [totalScore2, setTotalScore2] = useState(0);
  //After player win
  const [isGameOver, setIsGameOver] = useState(false);
  const Images = [
    "dice-1.png",
    "dice-2.png",
    "dice-3.png",
    "dice-4.png",
    "dice-5.png",
    "dice-6.png",
  ];

  function handleRollDice() {
    const RandomIndex = Math.floor(Math.random() * Images.length);
    if (isGameOver) return;
    if (isActive1) {
      setImage(Images[RandomIndex]);
      setCurrentScoreP1((r) => r + RandomIndex + 1);
      if (RandomIndex === 0) {
        setIsActive1(false);
        setCurrentScoreP1(0);
        setIsActive2(true);
      }
    }
    if (isActive2) {
      setImage(Images[RandomIndex]);
      setCurrentScoreP2((r) => r + RandomIndex + 1);
      if (RandomIndex === 0) {
        setIsActive2(false);
        setCurrentScoreP2(0);
        setIsActive1(true);
      }
    }
    setRollClicked(true);
    if (totalScore1 >= 10 || totalScore2 >= 10) {
      setIsGameOver(true);
    }
  }

  function handleHoldDice() {
    if (isGameOver) return;
    if (isActive1) {
      setTotalScore1((t) => t + currentScoreP1);
      setCurrentScoreP1(0);
      setIsActive1(false);
      setIsActive2(true);
    }
    if (isActive2) {
      setTotalScore2((t) => t + currentScoreP2);
      setCurrentScoreP2(0);
      setIsActive2(false);
      setIsActive1(true);
    }
    if (totalScore1 >= 10 || totalScore2 >= 10) {
      setIsGameOver(true);
    }
  }

  function handleNewGame() {
    setTotalScore1(0);
    setTotalScore2(0);
    setRollClicked(false);
    setCurrentScoreP2(0);
    setCurrentScoreP1(0);
    setIsActive1(true);
    setIsActive2(false);
    setIsGameOver(false);
  }

  return (
    <main>
      <Player
        currentScore={currentScoreP1}
        activeclass={isActive1 && "player--active"}
        totalScore={totalScore1}
      >
        <h2 className="name"> player 1</h2>
      </Player>
      <Player
        currentScore={currentScoreP2}
        activeclass={isActive2 && "player--active"}
        totalScore={totalScore2}
      >
        <h2 className="name"> player 2</h2>
      </Player>
      {rollClicked && <Dice image={image} />}
      <Button positionClass="new--btn" onClick={handleNewGame}>
        🔄 New game
      </Button>
      <Button positionClass="roll--btn" onClick={handleRollDice}>
        🎲 Roll dice
      </Button>

      <Button
        positionClass="hold--btn"
        onClick={isGameOver ? undefined : handleHoldDice}
        disabled={isGameOver}
      >
        📥 Hold
      </Button>
    </main>
  );
}

function Player({ children, currentScore, activeclass, totalScore }) {
  const className = `player ${activeclass} ${
    totalScore >= 10 && "player--winner"
  }`;

  return (
    <div className={className}>
      {children}
      <p className="totalscore">{totalScore}</p>
      <div className="current">
        <p className="current--title">Current</p>
        <p style={{ fontSize: "3.5rem" }}>{currentScore}</p>
      </div>
    </div>
  );
}

function Dice({ image }) {
  return <img src={`/${image}`} alt={image} className="dice" />;
}

function Button({ children, positionClass, onClick }) {
  const className = `btn ${positionClass}`;
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
