import './ArrowsKeysPad.scss';

interface ArrowKeysPadProps {
  onKeyPress: (direction: string) => void;
  disabled?: boolean;
}

export function ArrowKeysPad({
  onKeyPress,
  disabled = false,
}: ArrowKeysPadProps) {
  return (
    <div className="arrow-keys-pad">
      <button
        className="arrow-key arrow-up"
        onClick={() => onKeyPress('up')}
        disabled={disabled}
        aria-label="Up"
      ></button>

      <div className="arrow-keys-row">
        <button
          className="arrow-key arrow-left"
          onClick={() => onKeyPress('left')}
          disabled={disabled}
          aria-label="Left"
        ></button>

        <button
          className="arrow-key arrow-down"
          onClick={() => onKeyPress('down')}
          disabled={disabled}
          aria-label="Down"
        ></button>

        <button
          className="arrow-key arrow-right"
          onClick={() => onKeyPress('right')}
          disabled={disabled}
          aria-label="Right"
        ></button>
      </div>
    </div>
  );
}
