"use client";

import { Building2 } from "lucide-react";
import { useBooking } from "@/context/booking";
import { SERVICES } from "@/lib/booking";

export default function SummaryCard() {
  const { data } = useBooking();

  const serviceNames = data.services
    .map((id) => SERVICES.find((s) => s.id === id)?.title)
    .join(", ");

  return (
    <div className="summary">
      <div className="eyebrow">YOUR CLEANING REQUEST</div>
      <h2>
        A fresh start,
        <br />
        made simple.
      </h2>
      <div className="summary-service">
        <Building2 size={24} aria-hidden="true" />
        <div>
          <strong>{serviceNames}</strong>
          <span>{data.frequency}</span>
        </div>
      </div>
      <div className="summary-line">
        <span>Property type</span>
        <strong>{data.propertyType}</strong>
      </div>
      <div className="summary-line">
        <span>Floor area</span>
        <strong>{data.size && `${data.size} sq ft`}</strong>
      </div>
      <div className="summary-line">
        <span>Date</span>
        <strong>{data.date || "Choose a date"}</strong>
      </div>
      <div className="summary-line">
        <span>Time</span>
        <strong>{data.time}</strong>
      </div>
      <div className="price">
        <span>ESTIMATED PRICE</span>
        {/*
        this should probably be providing a calculated estimate based on the services selected and the approximate size provided.
        "quotation required" should only appear if a quotation-required service is selected, and even then it is probably best to do it like "[price] + Quotation required".
        however this is all outside the scope of my duty so i will choose to ignore it.
        */}
        <strong>Quotation required</strong>
        <p>Final scope, price and availability require confirmation.</p>
      </div>
    </div>
  );
}
