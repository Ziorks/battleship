import { useState } from "react";
import { PlayerBoard } from "./PlayerBoard";

const ships = [
  { name: "Destroyer", size: 2 },
  { name: "Submarine", size: 3 },
  { name: "Cruiser", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
];

function App() {
  const [state, setState] = useState({
    remainingShips: 5,
    ships: ships,
    playerTurn: true,
  });

  function placeShip() {
    setState((currentState) => {
      return {
        ...currentState,
        remainingShips: currentState.remainingShips - 1,
      };
    });
  }

  return (
    <>
      <PlayerBoard
        placeShip={placeShip}
        remainingShips={state.remainingShips}
      />
      {state.remainingShips > 0 && (
        <div className="instructions">
          <h1>Place your ships</h1>
          <p>
            now placing: {state.ships[state.remainingShips - 1].name}
            {" - "}
            {state.ships[state.remainingShips - 1].size} spaces
          </p>
        </div>
      )}
    </>
  );
}

export default App;
