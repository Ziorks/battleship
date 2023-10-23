import { PlayerBoardSpace } from "./PlayerBoardSpace";

export function PlayerBoard({ playerBoard, handleHover, placeShip }) {
  return (
    <div className="playerBoard">
      {playerBoard.map((item) => {
        return (
          <PlayerBoardSpace
            key={item.column + item.row}
            props={item}
            handleHover={handleHover}
            placeShip={placeShip}
          />
        );
      })}
    </div>
  );
}
