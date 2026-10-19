"use client";

import { ArrowRight, CircleCheck } from "lucide-react";
import { useBooking } from "@/context/booking";

export default function BookingSuccess() {
  const { submitted, reset } = useBooking();
  if (!submitted) return null;

  return (
    <section className="success">
      <CircleCheck size={56} aria-hidden="true" />
      <div className="eyebrow">REQUEST SAVED</div>
      <h2>Your cleaning request is in.</h2>
      <p>
        Reference <strong>{submitted.reference}</strong>
      </p>
      <div className="notice">
        Your request is pending confirmation. The date and price are not
        confirmed, and no payment has been taken.
      </div>
      <dl>
        <dt>Service</dt>
        <dd>{submitted.services}</dd>
        <dt>Preferred date</dt>
        <dd>{submitted.date}</dd>
        <dt>Time preference</dt>
        <dd>{submitted.time}</dd>
      </dl>
      <p className="small">
        Keep your reference number for follow-up. Automated email and WhatsApp
        notifications are not enabled yet.
      </p>
      <button type="button" className="primary" onClick={reset}>
        Start another request <ArrowRight size={18} aria-hidden="true" />
      </button>
    </section>
  );
}
