import { useState } from "react";
import { PlayerBoard } from "./PlayerBoard";
import { generateBoardArray, getTilesForPlacement } from "./utilities";

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

  function placeShip() {
    if (playerBoard.find((tile) => tile.placingShip === "allok")) {
      setState((currentState) => {
        return {
          ...currentState,
          remainingShips: currentState.remainingShips - 1,
        };
      });
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (tile.placingShip !== "") {
            return { ...tile, ship: true, placingShip: "" };
          } else {
            return tile;
          }
        });
      });
    }
  }

  function handleMouseEnter(row, column) {
    if (state.remainingShips > 0) {
      const shipTiles = getTilesForPlacement(
        row,
        column,
        playerBoard,
        state,
        ships
      );
      let newBoard = [...playerBoard];
      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < shipTiles.length; j++) {
          if (
            shipTiles[j].row === newBoard[i].row &&
            shipTiles[j].column === newBoard[i].column
          ) {
            newBoard[i] = shipTiles[j];
            break;
          }
        }
      }

      setPlayerBoard(newBoard);
    }
  }

  function handleMouseLeave() {
    setPlayerBoard((currentBoard) => {
      return currentBoard.map((tile) => {
        return { ...tile, placingShip: "" };
      });
    });
  }

  return (
    <>
      <PlayerBoard
        playerBoard={playerBoard}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
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
          <button
            className="btn"
            onClick={() =>
              setState({ ...state, horizontal: !state.horizontal })
            }
          >
            Rotate Ship
          </button>
        </div>
      )}
    </>
  );
}

export default App;
