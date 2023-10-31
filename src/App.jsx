import { useEffect, useState } from "react";
import { PlayerBoard } from "./PlayerBoard";
import { ComputerBoard } from "./ComputerBoard";
import { Instructions } from "./Instructions";
import {
  generateBoardArray,
  renderShipPreview,
  generateComputerBoard,
} from "./utilities";

const ships = [
  { name: "Destroyer", size: 2 },
  { name: "Submarine", size: 3 },
  { name: "Cruiser", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
];

function App() {
  const [playerBoard, setPlayerBoard] = useState(generateBoardArray());
  const [computerBoard, setComputerBoard] = useState(
    generateComputerBoard(ships)
  );
  const [state, setState] = useState({
    remainingShips: ships.length,
    horizontal: false,
    playerTurn: true,
  });

  useEffect(() => {
    const func = (e) => {
      if (e.key == "r") {
        toggleRotation();
      }
    };
    window.addEventListener("keydown", func);
    return () => {
      window.removeEventListener("keydown", func);
    };
  }, [state]);

  function toggleRotation() {
    setState({ ...state, horizontal: !state.horizontal });
  }

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

  return (
    <>
      <div className="gameSpace">
        <h1>Battleship</h1>
        <h2>Player Board</h2>
        <h2>Computer Board</h2>
        <h2>Game Log</h2>
        <PlayerBoard
          playerBoard={playerBoard}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          placeShip={placeShip}
        />
        <ComputerBoard computerBoard={computerBoard} />
        <textarea
          readOnly
          className="gameLog"
          value={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi totam voluptas odio molestiae saepe fuga pariatur iusto nulla accusamus obcaecati et labore placeat nostrum dignissimos maxime corrupti nesciunt dolorum, tempore vitae aspernatur dolor nam? Perspiciatis eius enim, ab, iste totam quia, minima atque architecto a officiis eveniet rerum voluptatibus sint."
          }
        ></textarea>
        <Instructions
          ships={ships}
          state={state}
          toggleRotation={toggleRotation}
        />
      </div>
    </>
  );
}

export default App;
