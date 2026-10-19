export const SERVICES = [
    { id: "basic", icon: "🏠", title: "Basic Cleaning", description: "Regular home cleaning", price: "From RM70" },
    { id: "deep", icon: "✨", title: "Deep Cleaning", description: "More detailed cleaning", price: "RM35 / cleaner / hour" },
    { id: "mattress", icon: "🛏️", title: "Mattress Cleaning", description: "Shampoo & extraction", price: "From RM90" },
    { id: "sofa", icon: "🛋️", title: "Sofa Cleaning", description: "Fabric upholstery cleaning", price: "From RM80" },
    { id: "renovation", icon: "🏗️", title: "Post-Renovation", description: "After renovation cleaning", price: "Quotation" },
    { id: "move-in", icon: "📦", title: "Move-In Cleaning", description: "Before moving in", price: "Quotation" },
    { id: "move-out", icon: "🚚", title: "Move-Out Cleaning", description: "Before handover", price: "Quotation" },
    { id: "office", icon: "🏢", title: "Office / Commercial", description: "One-time or recurring", price: "From RM70" },
    { id: "other", icon: "🧹", title: "Other Cleaning", description: "Tell us what you need", price: "Quotation" },
] as const;

export type ServiceId = (typeof SERVICES)[number]["id"];

// these two are mutually exclusive. maybe could have been a toggle switch instead?
export const EXCLUSIVE_SERVICES: ServiceId[] = ["basic", "deep"];

export const FREQUENCIES = ["One-time", "Weekly", "Every two weeks", "Monthly"] as const;

export const PROPERTY_TYPES = [
    "Condominium / Apartment",
    "Terrace / Link house",
    "Semi-detached house",
    "Bungalow",
    "Office / Commercial",
    "Other",
] as const;

export const FLEXIBILITY_OPTIONS = [
    "Only this date",
    "1–2 days either side",
    "Flexible this week",
] as const;

export const PET_OPTIONS = ["No", "Yes"] as const;

export type BookingData = {
    // Step 1
    fullName: string;
    mobile: string;
    email: string;
    postcode: string;
    address: string;
    // Step 2
    services: ServiceId[];
    frequency: (typeof FREQUENCIES)[number];
    // Step 3
    propertyType: (typeof PROPERTY_TYPES)[number];
    size: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    flexibility: (typeof FLEXIBILITY_OPTIONS)[number];
    // Step 4
    pets: (typeof PET_OPTIONS)[number];
    accessInstructions: string;
    specialInstructions: string;
    // Step 5
    consent: boolean;
};

export const DEFAULT_BOOKING: BookingData = {
    fullName: "",
    mobile: "",
    email: "",
    postcode: "",
    address: "",
    services: ["basic"],
    frequency: "One-time",
    propertyType: PROPERTY_TYPES[0],
    size: "",
    date: "",
    time: "08:00",
    flexibility: "Only this date",
    pets: "No",
    accessInstructions: "",
    specialInstructions: "",
    consent: false,
};

// earliest selectable date is tomorrow in the user's local time (YYYY-MM-DD)
export function getEarliestDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function toggleService(current: ServiceId[], id: ServiceId): ServiceId[] {
    if (current.includes(id)) return current.filter((s) => s !== id);

    // selecting Basic or Deep removes the other one since they are mutually exclusive
    if (EXCLUSIVE_SERVICES.includes(id)) {
        return [...current.filter((s) => !EXCLUSIVE_SERVICES.includes(s)), id];
    }

    return [...current, id];
}

export async function submitBooking(data: BookingData): Promise<{ reference: string }> {
    const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to send booking request");
    return res.json();
}