"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  BookingData,
  DEFAULT_BOOKING,
  SERVICES,
  submitBooking,
} from "@/lib/booking";

export const TOTAL_STEPS = 5;

export type SubmittedBooking = {
  reference: string;
  services: string;
  date: string;
  time: string;
};

type BookingContextValue = {
  data: BookingData;
  step: number;
  furthestStep: number;
  sending: boolean;
  submitError: boolean;
  submitted: SubmittedBooking | null;
  update: (patch: Partial<BookingData>) => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  submit: () => Promise<void>;
  reset: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BookingData>(DEFAULT_BOOKING);
  const [step, setStep] = useState(1);
  const [furthestStep, setFurthestStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitted, setSubmitted] = useState<SubmittedBooking | null>(null);

  const update = useCallback((patch: Partial<BookingData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const goTo = useCallback((target: number) => {
    setStep(Math.min(Math.max(target, 1), TOTAL_STEPS));
  }, []);

  const next = useCallback(() => {
    setStep((s) => {
      const target = Math.min(s + 1, TOTAL_STEPS);
      setFurthestStep((f) => Math.max(f, target));
      return target;
    });
  }, []);

  const back = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  const submit = useCallback(async () => {
    setSending(true);
    setSubmitError(false);
    try {
      const { reference } = await submitBooking(data);
      const services = data.services
        .map((id) => SERVICES.find((s) => s.id === id)?.title)
        .join(", ");
      setSubmitted({ reference, services, date: data.date, time: data.time });
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
  }, [data]);

  const reset = useCallback(() => {
    setData(DEFAULT_BOOKING);
    setStep(1);
    setFurthestStep(1);
    setSending(false);
    setSubmitError(false);
    setSubmitted(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        data,
        step,
        furthestStep,
        sending,
        submitError,
        submitted,
        update,
        goTo,
        next,
        back,
        submit,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
