import { useState } from "react";

export function PlayerGridSpace({ key }) {
  const [state, setState] = useState({ bombed: false, ship: false });

  function handleClick() {
    setState({ ...state, bombed: true });
  }

  return (
    <div
      className={"gridSpace playerGridSpace" + (state.bombed ? " bombed" : "")}
      onClick={handleClick}
    >
      <i class="fa-regular fa-circle-dot"></i>
    </div>
  );
}
