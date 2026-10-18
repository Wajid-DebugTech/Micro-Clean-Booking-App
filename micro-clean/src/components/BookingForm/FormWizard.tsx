"use client";

import { BookingProvider, useBooking } from "@/context/booking";
import { ShieldCheck } from "lucide-react";
import Steps from "./Steps";
import SummaryCard from "./SummaryCard";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

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
          {step === 4 && <Step4 />}
          {step === 5 && <Step4 />}
        </section>

        <aside>
          <SummaryCard />

          <div className="aside-note">
            <ShieldCheck size={26} aria-hidden="true" />
            <div>
              <strong>No payment at this stage</strong>
              <p>
                Send your preferences first. Confirm the details before
                committing.
              </p>
            </div>
          </div>
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
