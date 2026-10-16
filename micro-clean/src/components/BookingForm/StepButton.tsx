type StepButtonProps = {
  number: number;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function StepButton({
  number,
  label,
  active = false,
  disabled = false,
  onClick,
}: StepButtonProps) {
  return (
    <button
      type="button"
      className={active ? "active" : ""}
      aria-current={active ? "step" : undefined}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{number}</span>
      <em>{label}</em>
    </button>
  );
}
