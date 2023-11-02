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

// const ships = [{ name: "shipname", size: 1 }]; //for testing

function App() {
  const [playerBoard, setPlayerBoard] = useState(generateBoardArray());
  const [computerBoard, setComputerBoard] = useState(
    generateComputerBoard(ships)
  );
  const [state, setState] = useState({
    remainingShips: ships.length,
    horizontal: false,
  });
  const [playerTurn, setPlayerTurn] = useState(true);
  const [playerShips, setPlayerShips] = useState(ships);
  const [computerShips, setComputerShips] = useState(ships);
  const gameOver = computerShips.length == 0 || playerShips.length == 0;

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

  useEffect(() => {
    if (gameOver) {
      setComputerBoard(
        computerBoard.map((tile) => {
          return { ...tile, playable: false };
        })
      );
    }

    if (!playerTurn && !gameOver) {
      let index = null;
      let randomRow = null;
      let randomColumn = null;
      do {
        randomRow = Math.floor(Math.random() * 10) + 1;
        randomColumn = Math.floor(Math.random() * 10 + 1);
        index = (10 - randomRow) * 11 + randomColumn;
      } while (playerBoard[index].hit == true);
      setTimeout(() => {
        handleBomb(randomRow, randomColumn);
      }, 1500);
    }
  }, [playerTurn]);

  function toggleRotation() {
    setState({ ...state, horizontal: !state.horizontal });
  }

  function placeShip() {
    if (playerBoard.find((tile) => tile.placingShip === "allok")) {
      const lastShip = state.remainingShips - 1 <= 0;
      setState({
        ...state,
        remainingShips: state.remainingShips - 1,
      });
      setPlayerBoard((currentBoard) => {
        return currentBoard.map((tile) => {
          if (tile.placingShip === "allok") {
            return {
              ...tile,
              ship: ships[state.remainingShips - 1].name,
              placingShip: "",
              playable: lastShip ? false : tile.playable,
            };
          } else {
            return {
              ...tile,
              playable: lastShip ? false : tile.playable,
            };
          }
        });
      });
      if (lastShip) {
        setComputerBoard(
          computerBoard.map((tile) => {
            if (tile.row === "0" || tile.column === "0") {
              return tile;
            } else {
              return { ...tile, playable: true };
            }
          })
        );
      }
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

  function handleBomb(row, column) {
    const index = (10 - row) * 11 + column;
    let newBoard = playerTurn ? [...computerBoard] : [...playerBoard];
    newBoard[index] = { ...newBoard[index], hit: true, playable: false };
    playerTurn ? setComputerBoard(newBoard) : setPlayerBoard(newBoard);
    const shipName = newBoard[index].ship;
    if (shipName) {
      let newShips = playerTurn ? [...computerShips] : [...playerShips];
      newShips = newShips
        .map((ship) => {
          if (ship.name === shipName) {
            return { ...ship, size: ship.size - 1 };
          } else {
            return ship;
          }
        })
        .filter((ship) => ship.size > 0);
      playerTurn ? setComputerShips(newShips) : setPlayerShips(newShips);
    }
    setPlayerTurn(!playerTurn);
  }

  function playAgain() {
    setPlayerBoard(generateBoardArray());
    setComputerBoard(generateComputerBoard(ships));
    setState({
      remainingShips: ships.length,
      horizontal: false,
    });
    setPlayerTurn(true);
    setPlayerShips(ships);
    setComputerShips(ships);
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
        <ComputerBoard
          computerBoard={computerBoard}
          playerTurn={playerTurn}
          handleBomb={handleBomb}
          gameOver={gameOver}
        />
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
          playerTurn={playerTurn}
          playerShips={playerShips}
          computerShips={computerShips}
          toggleRotation={toggleRotation}
          playAgain={playAgain}
        />
      </div>
    </>
  );
}

export default App;
