import { useState } from "react";
import { PlayerBoard } from "./PlayerBoard";
import { generateBoardArray, renderShipPreview } from "./utilities";

const ships = [
  { name: "Destroyer", size: 2 },
  { name: "Submarine", size: 3 },
  { name: "Cruiser", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
];

function App() {
  const [playerBoard, setPlayerBoard] = useState(generateBoardArray());
  const [state, setState] = useState({
    remainingShips: ships.length,
    horizontal: false,
    playerTurn: true,
  });

  function placeShip() {
    if (playerBoard.find((tile) => tile.placingShip === "allok")) {
      setState({
        ...state,
        remainingShips: state.remainingShips - 1,
      });
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (tile.placingShip === "allok") {
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
      const newBoard = renderShipPreview(
        row,
        column,
        playerBoard,
        state,
        ships
      );
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

  function placeAllRandom() {
    let remaining = state.remainingShips;
    let newBoard = [...playerBoard];
    let index = null;

    while (remaining > 0) {
      let tempBoard = [];

      do {
        const randomBool = Boolean(Math.floor(Math.random() + 0.5));
        const randomRow = Math.floor(Math.random() * 10) + 1;
        const randomColumnInt = Math.floor(Math.random() * 10 + 1);
        const randomColumnStr = String.fromCharCode(randomColumnInt + 64);
        index = (10 - randomRow) * 11 + randomColumnInt;
        tempBoard = [...newBoard];

        tempBoard = renderShipPreview(
          randomRow,
          randomColumnStr,
          tempBoard,
          { ...state, remainingShips: remaining, horizontal: randomBool },
          ships
        );
      } while (tempBoard[index].placingShip !== "allok");

      newBoard = tempBoard.map((tile) => {
        if (tile.placingShip === "allok") {
          return { ...tile, ship: true, placingShip: "" };
        } else {
          return tile;
        }
      });
      remaining--;
    }

    setState({
      ...state,
      remainingShips: 0,
    });
    setPlayerBoard(newBoard);
  }

  return (
    <>
      <div className="gameSpace">
        <PlayerBoard
          playerBoard={playerBoard}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          placeShip={placeShip}
        />
        <textarea readOnly className="gameLog" rows="22" cols="45"></textarea>
      </div>
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
          <button className="btn" onClick={() => placeAllRandom()}>
            Place Remaining Ships Randomly
          </button>
        </div>
      )}
    </>
  );
}

export default App;
