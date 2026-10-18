"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import Steps from "./Steps";
import SummaryCard from "./SummaryCard";
import Step1 from "./Step1";
import Step2 from "./Step2";

function WizardContent() {
  const { step } = useBooking();

  return (
    <>
      <Steps />
      <div className="workspace">
        <section className="panel">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step2 />}
          {step === 4 && <Step2 />}
          {step === 5 && <Step2 />}
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
