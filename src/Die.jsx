export default function Die(props) {
  return (
    <button
      aria-label={props.value}
      aria-pressed={props.isHeld}
      className={`die-face ${props.isHeld ? "die-held" : undefined}`}
      onClick={props.held}
    >
      {props.value}
    </button>
  );
}
