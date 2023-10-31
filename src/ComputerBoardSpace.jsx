export function ComputerBoardSpace({ props }) {
  if (props.playable) {
    return (
      <div
        className={"gridSpace playableGridSpace" + (props.ship ? " ship" : "")}
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
