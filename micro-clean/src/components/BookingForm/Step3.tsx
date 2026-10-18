"use client";

import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useBooking } from "@/context/booking";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FLEXIBILITY_OPTIONS,
  PROPERTY_TYPES,
  getEarliestDate,
  type BookingData,
} from "@/lib/booking";

export default function Step3() {
  const { data, update, next, back } = useBooking();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    next();
  }

  return (
    <>
      <div className="step-label">STEP 3 OF 5</div>
      <h2 tabIndex={-1}>Property &amp; Schedule</h2>
      <p className="description">
        Choose your property and preferred cleaning time.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <label className="field">
            <span>Property type</span>
            <select
              value={data.propertyType}
              onChange={(e) =>
                update({
                  propertyType: e.target.value as BookingData["propertyType"],
                })
              }
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>
              Approximate size (sq ft) <b>*</b>
            </span>
            <input
              required
              type="number"
              min={1}
              max={9999999}
              step={1}
              value={data.size}
              onChange={(e) => update({ size: e.target.value })}
            />
          </label>
          <label className="field">
            <span>
              Preferred date <b>*</b>
            </span>
            <input
              required
              type="date"
              min={getEarliestDate()}
              value={data.date}
              onChange={(e) => update({ date: e.target.value })}
            />
          </label>
          <label className="field">
            <span>
              Preferred time <b>*</b>
            </span>
            <input
              required
              type="time"
              value={data.time}
              onChange={(e) => update({ time: e.target.value })}
            />
          </label>
        </div>
        <h3>If that date is taken</h3>
        <RadioGroup
          className="grid gap-3 choices"
          value={data.flexibility}
          onValueChange={(value) =>
            update({ flexibility: value as BookingData["flexibility"] })
          }
        >
          {FLEXIBILITY_OPTIONS.map((option, i) => (
            <label
              key={option}
              className={`choice ${data.flexibility === option ? "selected" : ""}`}
            >
              <RadioGroupItem value={option} id={`flex${i}`} />
              <span>{option}</span>
            </label>
          ))}
        </RadioGroup>
        <div className="notice">
          <CalendarDays size={20} aria-hidden="true" />
          <span>
            <strong>Booking note:</strong> Preferably book at least 2 days in
            advance. Standard operating hours are 8:00 AM to 6:00 PM. Different
            rates may apply after 6:00 PM. Your preferred time is subject to
            confirmation.
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
