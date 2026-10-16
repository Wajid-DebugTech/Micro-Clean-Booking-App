"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/booking";

export default function DetailsStep() {
  const { data, update, next } = useBooking();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    next();
  }

  return (
    <>
      <div className="step-label">STEP 1 OF 5</div>
      <h2 tabIndex={-1}>Your details</h2>
      <p className="description">
        A few details so we can follow up on your request.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <label className="field">
            <span>
              Full name<b> *</b>
            </span>
            <input
              type="text"
              required
              placeholder="Your full name"
              maxLength={100}
              autoComplete="name"
              value={data.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
            />
          </label>
          <label className="field">
            <span>
              Mobile number<b> *</b>
            </span>
            <input
              type="tel"
              required
              placeholder="e.g. 012 345 6789"
              pattern="\+?[0-9 ()-]{8,20}"
              maxLength={20}
              autoComplete="tel"
              value={data.mobile}
              onChange={(e) => update({ mobile: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="Optional"
              maxLength={150}
              autoComplete="email"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </label>
          <label className="field">
            <span>
              Postcode<b> *</b>
            </span>
            <input
              type="text"
              required
              placeholder="e.g. 47600"
              pattern="[0-9]{5}"
              maxLength={5}
              autoComplete="postal-code"
              value={data.postcode}
              onChange={(e) => update({ postcode: e.target.value })}
            />
          </label>
          <label className="field full">
            <span>
              Cleaning address <b>*</b>
            </span>
            <textarea
              required
              minLength={10}
              maxLength={500}
              autoComplete="street-address"
              placeholder="Unit, street, city and state"
              value={data.address}
              onChange={(e) => update({ address: e.target.value })}
            />
          </label>
          <p className="small full">
            <ShieldCheck size={15} aria-hidden="true" /> We use these details to
            process and follow up on your cleaning request.
          </p>
        </div>
        <div className="actions">
          <span className="required-note">* Required fields</span>
          <button type="submit" className="primary">
            Continue
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
