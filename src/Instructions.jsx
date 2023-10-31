export function Instructions({ ships, state, toggleRotation }) {
  return state.remainingShips > 0 ? (
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
  ) : (
    <div className="instructions-computer">
      <h1>It's your turn</h1>
      <p>click a square to bomb it!</p>
    </div>
  );
}
