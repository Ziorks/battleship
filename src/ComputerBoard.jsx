import { ComputerBoardSpace } from "./ComputerBoardSpace";

export function ComputerBoard({ computerBoard }) {
  return (
    <div className="computerBoard">
      {computerBoard.map((item) => {
        return <ComputerBoardSpace key={item.column + item.row} props={item} />;
      })}
    </div>
  );
}
