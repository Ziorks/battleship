export function generateBoardArray() {
  let boardArray = [];
  let defaultSpace = {
    row: "0",
    column: "0",
    playable: false,
    hit: false,
    ship: false,
    placingShip: false,
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
