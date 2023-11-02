export function Instructions({
  ships,
  state,
  toggleRotation,
  playerTurn,
  playerShips,
  computerShips,
  playAgain,
}) {
  if (state.remainingShips > 0) {
    return (
      <div className="instructions-player">
        <h1>Place your ships</h1>
        <p>
          now placing: {ships[state.remainingShips - 1].name}
          {" - "}
          {ships[state.remainingShips - 1].size} spaces
        </p>
        <button className="btn" onClick={() => toggleRotation()}>
          Rotate Ship
        </button>
      </div>
    );
  }
  const playerWins = computerShips.length == 0;
  const computerWins = playerShips.length == 0;
  if (playerWins || computerWins) {
    return (
      <div className="instructions-computer">
        <h1>{(computerWins ? "Computer" : "Player") + "Wins!"}</h1>
        <button onClick={playAgain} className="btn">
          Play Again?
        </button>
      </div>
    );
  }
  if (playerTurn) {
    return (
      <div className="instructions-computer">
        <h1>It's your turn</h1>
        <p>click a space to bomb it!</p>
      </div>
    );
  } else {
    return (
      <div className="instructions-computer">
        <h1>It's the computers turn</h1>
        <p>say your prayers</p>
      </div>
    );
  }
}
