import { ComputerBoardSpace } from "./ComputerBoardSpace";

export function ComputerBoard({ computerBoard, handleBomb, playerTurn }) {
  return (
    <div className="computerBoard">
      {computerBoard.map((item) => {
        return (
          <ComputerBoardSpace
            key={item.column + item.row}
            props={item}
            handleBomb={handleBomb}
            playerTurn={playerTurn}
          />
        );
      })}
    </div>
  );
}
