export function Instructions({ ships, state, toggleRotation, placeAllRandom }) {
  return (
    <div className="instructions">
      <h1>Place your ships</h1>
      <p>
        now placing: {ships[state.remainingShips - 1].name}
        {" - "}
        {ships[state.remainingShips - 1].size} spaces
      </p>
      <button className="btn" onClick={() => toggleRotation()}>
        Rotate Ship
      </button>
      <button className="btn" onClick={() => placeAllRandom()}>
        Place Remaining Ships Randomly
      </button>
    </div>
  );
}
