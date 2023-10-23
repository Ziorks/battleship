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
    horizontal: false,
    playerTurn: true,
  });

  const [playerBoard, setPlayerBoard] = useState(generateBoardArray());

  //This works but is real slow to update
  //
  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "r") {
  //     setState((currentState) => {
  //       return { ...currentState, horizontal: !currentState.horizontal };
  //     });
  //   }
  // });

  function placeShip() {
    if (
      !playerBoard.reduce(
        (accum, tile) => accum || (tile.ship && tile.placingShip),
        false
      )
    ) {
      setState((currentState) => {
        return {
          ...currentState,
          remainingShips: currentState.remainingShips - 1,
        };
      });
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (tile.placingShip) {
            return { ...tile, ship: true, placingShip: false };
          } else {
            return tile;
          }
        });
      });
    }
  }

  function handleHover(row, column) {
    if (state.remainingShips > 0) {
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (state.horizontal) {
            const shipLength = ships[state.remainingShips - 1].size;
            if (
              tile.row === row &&
              tile.column >= column &&
              tile.column.charCodeAt() < column.charCodeAt() + shipLength &&
              column.charCodeAt() + shipLength <= 75
            ) {
              return { ...tile, placingShip: true };
            } else {
              return { ...tile, placingShip: false };
            }
          } else {
            const shipLength = ships[state.remainingShips - 1].size;
            if (
              tile.column === column &&
              tile.row >= row &&
              tile.row < row + shipLength &&
              row + shipLength <= 11
            ) {
              return { ...tile, placingShip: true };
            } else {
              return { ...tile, placingShip: false };
            }
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
          <p>press 'r' to rotate</p>
        </div>
      )}
    </>
  );
}

export default App;
