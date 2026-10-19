"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/booking";
import { Checkbox } from "@/components/ui/checkbox";
import { SERVICES } from "@/lib/booking";

function ReviewSection({
  title,
  step,
  children,
}: {
  title: string;
  step: number;
  children: React.ReactNode;
}) {
  const { goTo } = useBooking();
  return (
    <div>
      <h3>
        {title}{" "}
        <button type="button" onClick={() => goTo(step)}>
          Edit
        </button>
      </h3>
      <p>{children}</p>
    </div>
  );
}

export default function Step5() {
  const { data, update, back, submit, sending, submitError } = useBooking();
  const [showConsentError, setShowConsentError] = useState(false);

  const serviceNames = data.services
    .map((id) => SERVICES.find((s) => s.id === id)?.title)
    .join(", ");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.consent) {
      setShowConsentError(true);
      return;
    }
    submit();
  }

  return (
    <>
      <div className="step-label">STEP 5 OF 5</div>
      <h2 tabIndex={-1}>Review your request</h2>
      <p className="description">
        Check your details before sending them to MICRO CLEAN.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="review">
          <ReviewSection title="Customer details" step={1}>
            Name: {data.fullName}
            <br />
            Phone: {data.mobile}
            <br />
            Email: {data.email || "None"}
            <br />
            Address: {data.address}
            <br />
            Postcode: {data.postcode}
          </ReviewSection>
          <ReviewSection title="Service & space" step={2}>
            {serviceNames}
            <br />
            {data.propertyType}
            <br />
            {data.size} sq ft
            <br />
            {data.frequency}
          </ReviewSection>
          <ReviewSection title="Preferred schedule" step={3}>
            {data.date}
            <br />
            {data.time}
            <br />
            {data.flexibility}
          </ReviewSection>
          <ReviewSection title="Instructions" step={4}>
            Pets: {data.pets}
            <br />
            Access Instructions: {data.accessInstructions || "None"}
            <br />
            Special Instructions: {data.specialInstructions || "None"}
          </ReviewSection>
        </div>
        <section className="booking-terms">
          <h3>Booking Terms</h3>
          <ul>
            <li>
              Booking is subject to MICRO CLEAN confirmation and availability.
            </li>
            <li>Preferably book at least 2 days in advance.</li>
            <li>
              Additional charges may apply beyond the normal service area or for
              jobs after 6:00 PM. We will confirm these before you agree.
            </li>
            <li>
              Quotation-based services will be confirmed before work begins.
            </li>
            <li>
              Please secure valuables and personal belongings before the cleaner
              starts the job.
            </li>
          </ul>
        </section>
        <label className="consent">
          <Checkbox
            checked={data.consent}
            onCheckedChange={(checked) => update({ consent: checked === true })}
          />
          <span>
            I confirm the information is correct, accept these booking terms and
            understand this is a booking request subject to MICRO CLEAN
            confirmation. I agree that MICRO CLEAN may use my details to process
            and contact me about this request.
          </span>
        </label>
        {showConsentError && !data.consent && (
          <div className="error" role="alert">
            Please accept the booking terms before submitting.
          </div>
        )}
        {submitError && (
          <div className="error" role="alert">
            Something went wrong. Please try again.
          </div>
        )}
        <div className="actions">
          <button
            type="button"
            className="back"
            onClick={back}
            disabled={sending}
          >
            <ArrowLeft size={17} aria-hidden="true" /> Back
          </button>
          <button type="submit" className="primary" disabled={sending}>
            Send booking request
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
