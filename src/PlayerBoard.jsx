import { PlayerGridSpace } from "./PlayerGridSpace";

export function PlayerBoard({ placeShip, remainingShips }) {
  const playerGrid = [];
  for (let row = 0; row < 11; row++) {
    for (let column = 0; column < 11; column++) {
      const rowLabel = 10 - row;
      const columnLabel = String.fromCharCode(column + 64);
      if (row === 10 && column === 0) {
        playerGrid.push(<div key="corner" className="gridSpace"></div>);
      } else if (row === 10 && column !== 0) {
        playerGrid.push(
          <p key={columnLabel} className="gridSpace">
            {columnLabel}
          </p>
        );
      } else if (column === 0) {
        playerGrid.push(
          <p key={rowLabel} className="gridSpace">
            {rowLabel}
          </p>
        );
      } else {
        playerGrid.push(
          <PlayerGridSpace
            placeShip={placeShip}
            remainingShips={remainingShips}
            key={columnLabel + rowLabel}
          />
        );
      }
    }
  }

  return <div className="playerBoard">{playerGrid}</div>;
}
