export function ComputerBoardSpace({
  props,
  handleBomb,
  playerTurn,
  gameOver,
}) {
  if (props.playable) {
    return (
      <div
        onClick={() => {
          if (playerTurn) {
            handleBomb(props.row, props.column.charCodeAt() - 64);
          }
        }}
        className="gridSpace playableGridSpace"
      >
        <i className="fa-regular fa-circle-dot"></i>
      </div>
    );
  } else if (props.row === "0" && props.column === "0") {
    return <div className={"gridSpace"}></div>;
  } else if (props.column === "0") {
    return (
      <div className={"gridSpace"}>
        <p>{props.row}</p>
      </div>
    );
  } else if (props.row === "0") {
    return (
      <div className={"gridSpace"}>
        <p>{props.column}</p>
      </div>
    );
  } else if (props.ship && props.hit) {
    return (
      <div className={"gridSpace hit" + (gameOver ? " ship" : "")}>
        <i className="fa-solid fa-burst"></i>
      </div>
    );
  } else if (!props.ship && props.hit) {
    return (
      <div className="gridSpace miss">
        <i className="fa-solid fa-xmark"></i>
      </div>
    );
  } else {
    return (
      <div className={"gridSpace" + (props.ship && gameOver ? " ship" : "")}>
        <i className="fa-regular fa-circle-dot"></i>
      </div>
    );
  }
}
