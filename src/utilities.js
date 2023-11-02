export function generateBoardArray() {
  let boardArray = [];
  let defaultSpace = {
    row: "0",
    column: "0",
    playable: false,
    hit: false,
    ship: "",
    placingShip: "",
  };

  for (let row = 0; row < 11; row++) {
    for (let column = 0; column < 11; column++) {
      const rowLabel = 10 - row;
      const columnLabel = String.fromCharCode(column + 64);
      if (row === 10 && column === 0) {
        boardArray.push(defaultSpace);
      } else if (row === 10 && column !== 0) {
        boardArray.push({ ...defaultSpace, column: columnLabel });
      } else if (column === 0) {
        boardArray.push({ ...defaultSpace, row: rowLabel });
      } else {
        boardArray.push({
          ...defaultSpace,
          row: rowLabel,
          column: columnLabel,
          playable: true,
        });
      }
    }
  }
  return boardArray;
}

export function renderShipPreview(row, column, playerBoard, state, ships) {
  let tiles = [];
  let tile = {};
  let indices = [];
  let anyInvalid = false;
  let newBoard = playerBoard.map((item) => {
    return { ...item, placingShip: "" };
  });
  const shipLength = ships[state.remainingShips - 1].size;
  const rowLength = 11;

  for (let i = 0; i < shipLength; i++) {
    const intColumn = column.charCodeAt() - 64;
    let index = undefined;
    if (state.horizontal) {
      if (intColumn + i < rowLength) {
        index = (10 - row) * rowLength + intColumn + i;
      } else {
        tile = undefined;
      }
    } else {
      index = (10 - row - i) * rowLength + intColumn;
    }
    tile = playerBoard[index];

    if (tile === undefined) {
      anyInvalid = true;
    } else if (tile.ship) {
      anyInvalid = true;
      tiles.push({ ...tile, placingShip: "invalid" });
      indices.push(index);
    } else {
      tiles.push({ ...tile, placingShip: "allok" });
      indices.push(index);
    }
  }

  if (anyInvalid) {
    tiles = tiles.map((tile) => {
      return tile.placingShip === "allok"
        ? { ...tile, placingShip: "valid" }
        : tile;
    });
  }

  for (let i = 0; i < indices.length; i++) {
    newBoard[indices[i]] = tiles[i];
  }

  return newBoard;
}

export function generateComputerBoard(ships) {
  let remaining = ships.length;
  let newBoard = generateBoardArray();
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
        { remainingShips: remaining, horizontal: randomBool },
        ships
      );
    } while (tempBoard[index].placingShip !== "allok");

    newBoard = tempBoard.map((tile) => {
      if (tile.placingShip === "allok") {
        return {
          ...tile,
          ship: ships[remaining - 1].name,
          placingShip: "",
          playable: false,
        };
      } else {
        return { ...tile, playable: false };
      }
    });
    remaining--;
  }
  return newBoard;
}
