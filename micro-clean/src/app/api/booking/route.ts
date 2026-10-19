export async function POST(request: Request) {
    const body = await request.json();

    if (!body.consent || !Array.isArray(body.services) || body.services.length === 0) {
        return Response.json({ error: "Invalid request" }, { status: 400 });
    }

    console.log("Booking request: ", body);

    const reference =
        "MC-" + crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
    return Response.json({ reference });
}