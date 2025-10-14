import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Google Apps Script'e JSON gönder
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbyhWIr1KHeInHbvI-LdFjb7pNZTFTarrE27kWwNLO-dmx1GSHHcm0OJ5xJAOt-3WNV4/exec";

    const sheetResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!sheetResponse.ok) {
      const errorText = await sheetResponse.text();
      console.error("Google Sheet error:", errorText);
      return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
    }

    // Pushover bildirimi gönder
    const requestHeaders = req.headers;
    const host = requestHeaders.get('host');
    const protocol = requestHeaders.get('x-forwarded-proto') ?? 'http';
    const baseUrl = `${protocol}://${host}`;

    const notifyResponse = await fetch(`${baseUrl}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Contact Form Submission",
        message: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      }),
    });

    if (!notifyResponse.ok) {
      const errorBody = await notifyResponse.text();
      console.error("Pushover notification failed inside /api/contact:", errorBody);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}