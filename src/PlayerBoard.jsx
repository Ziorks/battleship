import { PlayerGridSpace } from "./PlayerGridSpace";
import "./PlayerBoard.css";

const playerGrid = [];
for (let row = 0; row < 11; row++) {
  for (let column = 0; column < 11; column++) {
    if (row === 10 && column === 0) {
      playerGrid.push(<div className="gridSpace"></div>);
    } else if (row === 10 && column !== 0) {
      playerGrid.push(
        <p className="gridSpace">{String.fromCharCode(column + 64)}</p>
      );
    } else if (column === 0) {
      playerGrid.push(<p className="gridSpace">{10 - row}</p>);
    } else {
      playerGrid.push(<PlayerGridSpace />);
    }
  }
}

export function PlayerBoard() {
  return <div className="playerBoard">{playerGrid}</div>;
}
