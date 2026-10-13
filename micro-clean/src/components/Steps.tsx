import StepButton from "./StepButton";

const STEPS = ["Details", "Service", "Schedule", "Info", "Review"];

type StepsProps = {
  current: number; // 1-based, matches the step numbers shown
};

export default function Steps({ current }: StepsProps) {
  return (
    <nav className="steps" aria-label="Booking progress">
      {STEPS.map((label, i) => (
        <StepButton
          key={label}
          number={i + 1}
          label={label}
          active={current === i + 1}
          disabled={i + 1 !== current}
        />
      ))}
    </nav>
  );
}
