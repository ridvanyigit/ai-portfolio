// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1) Google Apps Script (Sheets) kaydı
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyhWIr1KHeInHbvI-LdFjb7pNZTFTarrE27kWwNLO-dmx1GSHHcm0OJ5xJAOt-3WNV4/exec";

    const sheetResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!sheetResponse.ok) {
      const errText = await sheetResponse.text();
      console.error("Google Sheet error:", errText);
      // yine de devam edebiliriz veya hata dönebiliriz; burada hata döndürüyoruz:
      return NextResponse.json({ error: "Failed to submit to Google Sheets", detail: errText }, { status: 500 });
    }

    // 2) Pushover bildirimi — doğrudan bu fonksiyondan gönder
    const token = process.env.PUSHOVER_API_TOKEN;
    const user = process.env.PUSHOVER_USER_KEY;

    if (!token || !user) {
      console.error("Pushover env missing", { token, user });
      // Burada hata dönüyoruz ki Vercel loglarında kolayca görsün
      return NextResponse.json({ error: "Pushover credentials missing on server" }, { status: 500 });
    }

    const messageTitle = `New contact form: ${data.name ?? "No name"}`;
    const messageBody = `Name: ${data.name ?? "-"}\nEmail: ${data.email ?? "-"}\nMessage: ${data.message ?? "-"}`;

    const pushoverRes = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token,
        user,
        title: messageTitle,
        message: messageBody,
      }),
    });

    const pushoverText = await pushoverRes.text();
    if (!pushoverRes.ok) {
      console.error("Pushover send failed:", pushoverText);
      return NextResponse.json({ error: "Pushover failed", detail: pushoverText }, { status: 500 });
    }

    // Başarılıysa success dön
    return NextResponse.json({ success: true, pushover: pushoverText });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal Server Error", detail: String(err) }, { status: 500 });
  }
}
