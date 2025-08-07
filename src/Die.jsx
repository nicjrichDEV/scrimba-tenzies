export default function Die(props) {
  return (
    <button
      className={`die-face ${props.isHeld ? "die-held" : undefined}`}
      onClick={props.held}
    >
      {props.value}
    </button>
  );
}
