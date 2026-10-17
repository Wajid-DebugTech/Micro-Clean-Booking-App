"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import Steps from "./Steps";
import SummaryCard from "./SummaryCard";
import Step1 from "./Step1";

function WizardContent() {
  const { step } = useBooking();

  return (
    <>
      <Steps />
      <div className="workspace">
        <section className="panel">
          {step === 1 && <Step1 />}
          {step === 2 && <Step1 />}
          {step === 3 && <Step1 />}
          {step === 4 && <Step1 />}
          {step === 5 && <Step1 />}
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
