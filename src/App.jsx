import { useState } from "react";
import { PlayerBoard } from "./PlayerBoard";
import { generateBoardArray } from "./utilities";

const ships = [
  { name: "Destroyer", size: 2 },
  { name: "Submarine", size: 3 },
  { name: "Cruiser", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
];

function App() {
  const [state, setState] = useState({
    remainingShips: ships.length,
    playerTurn: true,
  });
  const [playerBoard, setPlayerBoard] = useState(generateBoardArray());

  function placeShip() {
    setState((currentState) => {
      return {
        ...currentState,
        remainingShips: currentState.remainingShips - 1,
      };
    });
    setPlayerBoard((currentBoard) => {
      return currentBoard.map((tile) => {
        if (tile.placingShip) {
          return { ...tile, ship: true };
        } else {
          return tile;
        }
      });
    });
  }

  function handleHover(row, column) {
    if (state.remainingShips > 0) {
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (
            tile.row === row &&
            tile.column >= column &&
            tile.column.charCodeAt() <
              column.charCodeAt() + ships[state.remainingShips - 1].size
          ) {
            return { ...tile, placingShip: true };
          } else {
            return { ...tile, placingShip: false };
          }
        });
      });
    }
  }

  return (
    <>
      <PlayerBoard
        playerBoard={playerBoard}
        handleHover={handleHover}
        placeShip={placeShip}
      />
      {state.remainingShips > 0 && (
        <div className="instructions">
          <h1>Place your ships</h1>
          <p>
            now placing: {ships[state.remainingShips - 1].name}
            {" - "}
            {ships[state.remainingShips - 1].size} spaces
          </p>
        </div>
      )}
    </>
  );
}

export default App;
