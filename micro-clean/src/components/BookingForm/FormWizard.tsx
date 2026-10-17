"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import Steps from "./Steps";
import SummaryCard from "./SummaryCard";
import DetailsStep from "./DetailsStep";

function WizardContent() {
  const { step } = useBooking();

  return (
    <>
      <Steps />
      <div className="workspace">
        <section className="panel">
          {step === 1 && <DetailsStep />}
          {step === 2 && <DetailsStep />}
          {step === 3 && <DetailsStep />}
          {step === 4 && <DetailsStep />}
          {step === 5 && <DetailsStep />}
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
