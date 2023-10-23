import { PlayerBoardSpace } from "./PlayerBoardSpace";

export function PlayerBoard({
  playerBoard,
  handleMouseEnter,
  handleMouseLeave,
  placeShip,
}) {
  return (
    <div className="playerBoard">
      {playerBoard.map((item) => {
        return (
          <PlayerBoardSpace
            key={item.column + item.row}
            props={item}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            placeShip={placeShip}
          />
        );
      })}
    </div>
  );
}
