"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import Steps from "./Steps";

const Placeholder = ({ n }: { n: number }) => <p>step {n} goes here</p>;
const SummaryCard = () => <div className="summary">summary goes here</div>;

function WizardContent() {
  const { step } = useBooking();

  return (
    <>
      <Steps />
      <div className="workspace">
        <section className="panel">
          {step === 1 && <Placeholder n={1} />}
          {step === 2 && <Placeholder n={2} />}
          {step === 3 && <Placeholder n={3} />}
          {step === 4 && <Placeholder n={4} />}
          {step === 5 && <Placeholder n={5} />}
        </section>
        <aside>
          <SummaryCard />
        </aside>
      </div>
    </>
  );
}

export default function FormWizard() {
  return (
    <BookingProvider>
      <WizardContent />
    </BookingProvider>
  );
}
