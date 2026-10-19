"use client";

import { useBooking } from "@/context/booking";
import StepButton from "./StepButton";

const STEPS = ["Details", "Service", "Schedule", "Info", "Review"];

export default function Steps() {
  const { step, furthestStep, goTo, sending } = useBooking();

  return (
    <nav className="steps" aria-label="Booking progress">
      {STEPS.map((label, i) => {
        const n = i + 1;
        return (
          <StepButton
            key={label}
            number={n}
            label={label}
            active={step === n}
            disabled={n > furthestStep || sending}
            onClick={() => goTo(n)}
          />
        );
      })}
    </nav>
  );
}
