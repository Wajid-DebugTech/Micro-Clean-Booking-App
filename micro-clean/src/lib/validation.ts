import {
    FLEXIBILITY_OPTIONS,
    FREQUENCIES,
    PET_OPTIONS,
    PROPERTY_TYPES,
    SERVICES,
    EXCLUSIVE_SERVICES,
    getEarliestDate,
    type BookingData,
} from "./booking";

export const LIMITS = {
    nameMax: 100,
    mobilePattern: "\\+?[0-9 ()-]{8,20}",
    mobileMax: 20,
    emailMax: 150,
    postcodePattern: "[0-9]{5}",
    postcodeLength: 5,
    addressMin: 10,
    addressMax: 500,
    sizeMin: 1,
    sizeMax: 9999999,
    notesMax: 1500,
} as const;

const matches = (pattern: string, value: string) =>
    new RegExp(`^(?:${pattern})$`).test(value);

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// gives a list of the steps (by number) where there is invalid data
export function validateBooking(input: unknown): number[] {
    const d = (input ?? {}) as Record<string, unknown>;
    const text = (key: string) => (typeof d[key] === "string" ? (d[key] as string) : "");
    const invalid = new Set<number>();

    // step 1: details
    const email = text("email");
    if (
        !text("fullName") || text("fullName").length > LIMITS.nameMax ||
        !matches(LIMITS.mobilePattern, text("mobile")) ||
        (email && (!EMAIL.test(email) || email.length > LIMITS.emailMax)) ||
        !matches(LIMITS.postcodePattern, text("postcode")) ||
        text("address").length < LIMITS.addressMin ||
        text("address").length > LIMITS.addressMax
    ) {
        invalid.add(1);
    }

    // step 2: services
    const services = Array.isArray(d.services) ? d.services : [];
    const validIds: string[] = SERVICES.map((s) => s.id);
    if (
        services.length === 0 ||
        !services.every((s) => typeof s === "string" && validIds.includes(s)) ||
        new Set(services).size !== services.length ||
        services.filter((s) => (EXCLUSIVE_SERVICES as string[]).includes(s)).length > 1
    ) {
        invalid.add(2);
    }

    // step 3: schedule
    const date = text("date");
    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < getEarliestDate() ||
        !/^\d{2}:\d{2}$/.test(text("time")) ||
        !(FLEXIBILITY_OPTIONS as readonly string[]).includes(text("flexibility")) ||
        !(FREQUENCIES as readonly string[]).includes(text("frequency"))
    ) {
        invalid.add(3);
    }

    // step 4: info
    const size = text("size");
    const sizeNum = Number(size);
    if (
        !(PROPERTY_TYPES as readonly string[]).includes(text("propertyType")) ||
        size === "" || !Number.isInteger(sizeNum) ||
        sizeNum < LIMITS.sizeMin || sizeNum > LIMITS.sizeMax ||
        !(PET_OPTIONS as readonly string[]).includes(text("pets")) ||
        text("accessInstructions").length > LIMITS.notesMax ||
        text("specialInstructions").length > LIMITS.notesMax
    ) {
        invalid.add(4);
    }

    return [...invalid].sort((a, b) => a - b);
}

export const isConsentGiven = (input: unknown) =>
    (input as Partial<BookingData> | null)?.consent === true;