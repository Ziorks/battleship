import { useState } from "react";
import { PlayerBoard } from "./PlayerBoard";

function App() {
  const [state, setState] = useState({ remainingShips: 10, playerTurn: true });

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
          <p>{state.remainingShips} remaining</p>
        </div>
      )}
    </>
  );
}

export default App;
