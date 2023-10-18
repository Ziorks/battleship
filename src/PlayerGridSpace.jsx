import { useState } from "react";

export function PlayerGridSpace({ placeShip, remainingShips }) {
  const [state, setState] = useState({ bombed: false, ship: false });

  function handleClick() {
    if (remainingShips > 0) {
      placeShip();
      setState({ ...state, ship: true });
    } else {
      setState({ ...state, bombed: true });
    }
  }

  return (
    <div
      className={
        "gridSpace playerGridSpace" +
        (state.bombed ? " bombed" : "") +
        (state.ship ? " ship" : "")
      }
      onClick={handleClick}
    >
      <i className="fa-regular fa-circle-dot"></i>
    </div>
  );
}
