"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useBooking } from "@/context/booking";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FREQUENCIES, SERVICES, toggleService } from "@/lib/booking";

export default function Step2() {
  const { data, update, next, back } = useBooking();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.services.length === 0) return;
    next();
  }

  return (
    <>
      <div className="step-label">STEP 2 OF 5</div>
      <h2 tabIndex={-1}>What needs cleaning?</h2>
      <p className="description">
        Choose your space and tell us how often you need a clean.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="service-catalog">
          {SERVICES.map((service) => {
            const selected = data.services.includes(service.id);
            return (
              <label
                key={service.id}
                className={`catalog-card ${selected ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() =>
                    update({
                      services: toggleService(data.services, service.id),
                    })
                  }
                />
                <span className="catalog-icon" aria-hidden="true">
                  {service.icon}
                </span>
                <strong>{service.title}</strong>
                <p>{service.description}</p>
                <b>{service.price}</b>
              </label>
            );
          })}
        </div>
        <p className="small">
          Basic Cleaning and Deep Cleaning cannot be selected together. You can
          add other services.
        </p>
        <h3>Cleaning frequency</h3>
        <RadioGroup
          className="grid gap-3 choices"
          value={data.frequency}
          onValueChange={(value) =>
            update({ frequency: value as (typeof FREQUENCIES)[number] })
          }
        >
          {FREQUENCIES.map((frequency, i) => (
            <label
              key={frequency}
              className={`choice ${data.frequency === frequency ? "selected" : ""}`}
            >
              <RadioGroupItem value={frequency} id={`frequency${i}`} />
              <span>{frequency}</span>
            </label>
          ))}
        </RadioGroup>
        <div className="notice">
          Starting rates are indicative. Final scope, duration, number of
          cleaners and any additional charges will be confirmed in your
          quotation.
        </div>
        {data.services.length === 0 && (
          <div className="error" role="alert">
            Select at least one cleaning service.
          </div>
        )}
        <div className="actions">
          <button type="button" className="back" onClick={back}>
            <ArrowLeft size={17} aria-hidden="true" /> Back
          </button>
          <button type="submit" className="primary">
            Continue
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
