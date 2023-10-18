import { PlayerGridSpace } from "./PlayerGridSpace";

const playerGrid = [];
for (let row = 0; row < 11; row++) {
  for (let column = 0; column < 11; column++) {
    const rowLabel = 10 - row;
    const columnLabel = String.fromCharCode(column + 64);
    if (row === 10 && column === 0) {
      playerGrid.push(<div key="corner" className="gridSpace"></div>);
    } else if (row === 10 && column !== 0) {
      playerGrid.push(
        <p key={"column" + columnLabel} className="gridSpace">
          {columnLabel}
        </p>
      );
    } else if (column === 0) {
      playerGrid.push(
        <p key={"row" + rowLabel} className="gridSpace">
          {rowLabel}
        </p>
      );
    } else {
      playerGrid.push(<PlayerGridSpace key={columnLabel + rowLabel} />);
    }
  }
}

export function PlayerBoard() {
  return <div className="playerBoard">{playerGrid}</div>;
}
