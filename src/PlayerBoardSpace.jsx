export function PlayerBoardSpace({
  props,
  handleMouseEnter,
  handleMouseLeave,
  placeShip,
}) {
  if (props.playable) {
    return (
      <div
        onClick={placeShip}
        onMouseEnter={() => handleMouseEnter(props.row, props.column)}
        onMouseLeave={handleMouseLeave}
        className={
          "gridSpace playableGridSpace" +
          (props.placingShip === "allok"
            ? " allok"
            : props.placingShip === "valid"
            ? " valid"
            : props.placingShip === "invalid"
            ? " invalid"
            : props.ship
            ? " ship"
            : "")
        }
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
  }
}