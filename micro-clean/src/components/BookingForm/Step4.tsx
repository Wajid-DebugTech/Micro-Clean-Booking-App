"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useBooking } from "@/context/booking";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PET_OPTIONS, type BookingData } from "@/lib/booking";

export default function StepInfo() {
  const { data, update, next, back } = useBooking();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    next();
  }

  return (
    <>
      <div className="step-label">STEP 4 OF 5</div>
      <h2 tabIndex={-1}>A little more information</h2>
      <p className="description">
        Help us understand your space before preparing a quotation.
      </p>
      <form onSubmit={handleSubmit}>
        <h3>Pets at the property?</h3>
        <RadioGroup
          className="grid gap-3 choices"
          value={data.pets}
          onValueChange={(value) =>
            update({ pets: value as BookingData["pets"] })
          }
        >
          {PET_OPTIONS.map((option, i) => (
            <label
              key={option}
              className={`choice ${data.pets === option ? "selected" : ""}`}
            >
              <RadioGroupItem value={option} id={`pets${i}`} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        <label className="field">
          <span>Access and parking instructions</span>
          <textarea
            maxLength={1500}
            placeholder="Please avoid sharing door codes or sensitive details"
            value={data.accessInstructions}
            onChange={(e) => update({ accessInstructions: e.target.value })}
          />
        </label>
        <label className="field">
          <span>
            Special instructions <small>(optional)</small>
          </span>
          <textarea
            maxLength={1500}
            placeholder="Tell us about rooms, priority areas, access, parking or pets. Please avoid sharing door codes or sensitive details."
            value={data.specialInstructions}
            onChange={(e) => update({ specialInstructions: e.target.value })}
          />
        </label>
        <div className="notice">
          <Sparkles size={20} aria-hidden="true" />
          <span>
            Include the areas that matter most to you, so the team can clarify
            scope and equipment needs.
          </span>
        </div>
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
