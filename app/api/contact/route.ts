import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1️⃣ Google Apps Script'e JSON gönder (Bu kısım zaten çalışıyor)
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
      // Pushover'a gitmeden burada duracağı için bildirim hatası almazsınız.
      return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
    }

    // 2️⃣ Pushover bildirimi gönder (Düzeltilmiş kısım)
    
    // Ortama göre doğru base URL'i belirle
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}` // Vercel'de çalışıyorsa
      : process.env.NEXT_PUBLIC_BASE_URL;  // Yerelde çalışıyorsa

    await fetch(`${baseUrl}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Contact Form Submission",
        message: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}