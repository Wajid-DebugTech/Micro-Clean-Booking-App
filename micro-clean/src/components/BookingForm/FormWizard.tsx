"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import Steps from "./Steps";
import SummaryCard from "./SummaryCard";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function WizardContent() {
  const { step } = useBooking();

  return (
    <>
      <Steps />
      <div className="workspace">
        <section className="panel">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step3 />}
          {step === 5 && <Step3 />}
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
