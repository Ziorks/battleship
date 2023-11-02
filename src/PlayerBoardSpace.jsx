export function PlayerBoardSpace({ props, handleMouseEnter, placeShip }) {
  if (props.playable) {
    return (
      <div
        onClick={placeShip}
        onMouseOver={() => handleMouseEnter(props.row, props.column)}
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
    return <div className="gridSpace"></div>;
  } else if (props.column === "0") {
    return (
      <div className="gridSpace">
        <p>{props.row}</p>
      </div>
    );
  } else if (props.row === "0") {
    return (
      <div className="gridSpace">
        <p>{props.column}</p>
      </div>
    );
  } else if (props.ship && props.hit) {
    return (
      <div className="gridSpace hit">
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
      <div className={"gridSpace" + (props.ship ? " ship" : "")}>
        <i className="fa-regular fa-circle-dot"></i>
      </div>
    );
  }
}
