export function generateBoardArray() {
  let boardArray = [];
  let defaultSpace = {
    row: "0",
    column: "0",
    playable: false,
    hit: false,
    ship: false,
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

export function getTilesForPlacement(row, column, playerBoard, state, ships) {
  let tiles = [];
  let tile = {};
  let anyInvalid = false;
  const shipLength = ships[state.remainingShips - 1].size;

  for (let i = 0; i < shipLength; i++) {
    if (state.horizontal) {
      // tile = playerBoard[(10 - row) * 11 + (column.charCodeAt() + i) - 64]; //faster but gotta fix wrapping
      tile = playerBoard.find(
        (item) =>
          item.column === String.fromCharCode(column.charCodeAt() + i) &&
          item.row === row
      );
    } else {
      const index = (10 - row - i) * 11 + column.charCodeAt() - 64;
      tile = playerBoard[index];
    }
    if (tile === undefined) {
      anyInvalid = true;
    } else if (tile.ship) {
      anyInvalid = true;
      tiles.push({ ...tile, placingShip: "invalid" });
    } else {
      tiles.push({ ...tile, placingShip: "allok" });
    }
  }
  if (anyInvalid) {
    tiles = tiles.map((tile) => {
      return tile.placingShip === "allok"
        ? { ...tile, placingShip: "valid" }
        : tile;
    });
  }
  return tiles;
}
