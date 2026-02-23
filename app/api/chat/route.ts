import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, session_id } = body;
    const currentSessionId = session_id || crypto.randomUUID();

    // .env.local dosyasındaki bilgileri alıyoruz
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "http://127.0.0.1:5678/webhook/chat";
    const n8nApiKey = process.env.N8N_API_KEY!;

    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-n8n-api-key": n8nApiKey // İŞTE EKSİK OLAN ŞİFRE KİLİDİ BURASIYDI!
      },
      body: JSON.stringify({
        chatInput: message,
        session_id: currentSessionId,
      }),
    });

    // Eğer n8n Forbidden (403) veya başka hata verirse:
    if (!response.ok) {
      console.error("n8n bağlantıyı reddetti. Durum:", response.status);
      return NextResponse.json({ reply: "n8n error: " + response.statusText });
    }

    // n8n'den gelen cevabı DÜZ METİN olarak alıyoruz
    const replyText = await response.text();

    if (!replyText || replyText.trim() === "") {
      return NextResponse.json({ 
        reply: "n8n çalışıyor ama Agent cevap üretemedi.", 
        session_id: currentSessionId 
      });
    }

    // Başarılı Cevap!
    return NextResponse.json({ 
      reply: replyText, 
      session_id: currentSessionId 
    });

  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ reply: "System Error. Check terminal." }, { status: 500 });
  }
}