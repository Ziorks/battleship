import { ComputerBoardSpace } from "./ComputerBoardSpace";

export function ComputerBoard({
  computerBoard,
  handleBomb,
  playerTurn,
  gameOver,
}) {
  return (
    <div className="computerBoard">
      {computerBoard.map((item) => {
        return (
          <ComputerBoardSpace
            key={item.column + item.row}
            props={item}
            handleBomb={handleBomb}
            playerTurn={playerTurn}
            gameOver={gameOver}
          />
        );
      })}
    </div>
  );
}
