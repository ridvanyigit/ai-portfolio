import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, message } = await req.json();

    const token = process.env.PUSHOVER_API_TOKEN;
    const user = process.env.PUSHOVER_USER_KEY;

    if (!token || !user) {
      console.error("Pushover env variables are missing");
      return NextResponse.json({ error: "Missing Pushover credentials" }, { status: 500 });
    }

    const pushoverResponse = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token,
        user,
        title: title ?? "New Notification",
        message: message ?? "",
      }),
    });

    if (!pushoverResponse.ok) {
      const errorText = await pushoverResponse.text();
      console.error("Pushover error:", errorText);
      return NextResponse.json({ error: "Pushover failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Notify route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
