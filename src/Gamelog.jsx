export function Gamelog({ gamelog }) {
  return (
    <textarea
      readOnly
      className="gameLog"
      value={gamelog.join("\n")}
    ></textarea>
  );
}
