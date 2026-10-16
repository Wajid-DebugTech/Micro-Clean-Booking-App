"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { BookingData, DEFAULT_BOOKING } from "@/lib/booking";

export const TOTAL_STEPS = 5;

type BookingContextValue = {
  data: BookingData;
  step: number;
  furthestStep: number;
  update: (patch: Partial<BookingData>) => void;
  goTo: (step: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<BookingData>(DEFAULT_BOOKING);
  const [step, setStep] = useState(1);
  const [furthestStep, setFurthestStep] = useState(1);

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

  const reset = useCallback(() => {
    setData(DEFAULT_BOOKING);
    setStep(1);
    setFurthestStep(1);
  }, []);

  return (
    <BookingContext.Provider
      value={{ data, step, furthestStep, update, goTo, next, back, reset }}
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
