import { useEffect, useState } from "react";
import { PlayerBoard } from "./PlayerBoard";
import { ComputerBoard } from "./ComputerBoard";
import { Instructions } from "./Instructions";
import { Gamelog } from "./Gamelog";
import {
  generateBoardArray,
  renderShipPreview,
  generateComputerBoard,
  generateMemory,
} from "./utilities";

const introMessage = "Welcome to Battleship!\nBegin by placing your ships.";

const ships = [
  { name: "Destroyer", size: 2 },
  { name: "Submarine", size: 3 },
  { name: "Cruiser", size: 3 },
  { name: "Battleship", size: 4 },
  { name: "Carrier", size: 5 },
]; //ship names must be unique

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
  const [gamelog, setGamelog] = useState([introMessage]);
  const [compMemory, setCompMemory] = useState([]);
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
    let log = document.querySelector(".gameLog");
    log.scrollTop = log.scrollHeight;
  }, [gamelog]);

  useEffect(() => {
    if (gameOver) {
      setComputerBoard(
        computerBoard.map((tile) => {
          return { ...tile, playable: false };
        })
      );
      setGamelog([
        ...gamelog,
        (computerShips.length == 0 ? "Player" : "Computer") + " Wins!",
      ]);
    }

    if (!playerTurn && !gameOver) {
      let index = null;
      let row = null;
      let column = null;
      if (compMemory.length > 0) {
        let newMemory = { ...compMemory[0] };
        let searching = true;
        do {
          const location = newMemory.location;
          const move = newMemory.moves[0];
          row = location.row + move.row * move.count;
          column = location.column + move.column * move.count;
          newMemory.moves[0].count++;
          index = (10 - row) * 11 + column;
          const invalidTarget =
            row < 1 ||
            row > 10 ||
            column < 1 ||
            column > 10 ||
            playerBoard[index].hit == true;
          if (invalidTarget) {
            newMemory.moves.shift();
          } else {
            searching = false;
          }
        } while (searching);
        const shipName = playerBoard[index].ship;
        const sunk =
          playerShips.filter(
            (ship) => ship.name === shipName && ship.size - 1 <= 0
          ).length > 0;
        if (shipName === newMemory.ship) {
          if (sunk) {
            setCompMemory(compMemory.filter((item) => item.ship != shipName));
          } else {
            setCompMemory(compMemory.toSpliced(0, 1, newMemory));
          }
        } else if (shipName) {
          if (compMemory.find((item) => item.ship == shipName)) {
            if (sunk) {
              newMemory.moves.shift();
              setCompMemory(
                compMemory
                  .splice(0, 1, newMemory)
                  .filter((item) => item.ship != shipName)
              );
            } else {
              setCompMemory([
                ...compMemory
                  .splice(0, 1, newMemory)
                  .filter((item) => item.ship != shipName),
                generateMemory(shipName, row, column),
              ]);
            }
          } else {
            setCompMemory([
              ...compMemory.toSpliced(0, 1, newMemory),
              generateMemory(shipName, row, column),
            ]);
          }
        } else {
          newMemory.moves.shift();
          setCompMemory(compMemory.toSpliced(0, 1, newMemory));
        }
      } else {
        do {
          row = Math.floor(Math.random() * 10) + 1;
          column = Math.floor(Math.random() * 10) + 1;
          index = (10 - row) * 11 + column;
        } while (playerBoard[index].hit == true);
        const shipName = playerBoard[index].ship;
        if (shipName) {
          setCompMemory([generateMemory(shipName, row, column)]);
        }
      }
      setTimeout(() => {
        handleBomb(row, column);
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
    const columnStr = String.fromCharCode(column + 64);
    const index = (10 - row) * 11 + column;
    let newBoard = playerTurn ? [...computerBoard] : [...playerBoard];
    newBoard[index] = { ...newBoard[index], hit: true, playable: false };
    playerTurn ? setComputerBoard(newBoard) : setPlayerBoard(newBoard);
    const shipName = newBoard[index].ship;
    let sunk = false;
    if (shipName) {
      let newShips = playerTurn ? [...computerShips] : [...playerShips];
      newShips = newShips
        .map((ship) => {
          if (ship.name === shipName) {
            const newSize = ship.size - 1;
            sunk = newSize <= 0;
            return { ...ship, size: newSize };
          } else {
            return ship;
          }
        })
        .filter((ship) => ship.size > 0);
      playerTurn ? setComputerShips(newShips) : setPlayerShips(newShips);
    }
    setPlayerTurn(!playerTurn);
    const activeUser = playerTurn ? "Player" : "Computer";
    const otherUser = !playerTurn ? "Player" : "Computer";
    setGamelog([
      ...gamelog,
      activeUser +
        " bombed " +
        columnStr +
        row +
        ": it's a " +
        (shipName ? "hit!" : "miss.") +
        (sunk
          ? "\n" + activeUser + " sunk " + otherUser + "'s " + shipName + "!"
          : ""),
    ]);
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
    setGamelog([introMessage]);
    setCompMemory([]);
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
          gameOver={gameOver}
          handleBomb={handleBomb}
        />
        <Gamelog gamelog={gamelog} />
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
