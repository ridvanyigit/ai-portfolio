// /Users/ridvanyigit/Desktop/ai-portfolio/app/api/chat/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendUrl =
      "https://xrw1mt1a0l.execute-api.eu-central-1.amazonaws.com/chat";

    // Pass the session_id from the frontend to the AWS backend
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message,
        session_id: body.session_id,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AWS Chat API error:", errorText);
      await sendNotification("Chatbot API Error", errorText);
      return NextResponse.json(
        { error: "Chatbot API failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    const reply = data.response ?? "";
    const sessionId = data.session_id ?? "";

    // Notify if the user has entered contact information or if the response is empty
    const isContactInfo =
      /\b(\+?\d{6,}|\S+@\S+\.\S+|linkedin\.com|twitter\.com|https?:\/\/)/i.test(
        body.message
      );

    if (!reply || isContactInfo) {
      await sendNotification(
        isContactInfo ? "New Contact Info" : "Unanswered Chat Message",
        body.message
      );
    }

    // EKSİK OLAN VE EKLENEN KRİTİK SATIR:
    // Bu satır, AWS'ten gelen cevabı tarayıcıya geri gönderir.
    return NextResponse.json({ reply, session_id: sessionId });
    
  } catch (err) {
    console.error("Chat route error:", err);
    await sendNotification("Chat Route Error", String(err));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function sendNotification(title: string, message: string) {
  try {
    // NEXT_PUBLIC_BASE_URL, Vercel ortam değişkenlerinden gelir.
    // Eğer ayarlı değilse, canlı site adresini kullanır.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ridvanyigit.com";
    await fetch(`${baseUrl}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message }),
    });
  } catch (e) {
    console.error("Pushover send error:", e);
  }
}