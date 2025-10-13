export async function sendPushoverNotification(message: string) {
    const user = process.env.PUSHOVER_USER_KEY;
    const token = process.env.PUSHOVER_API_TOKEN;
  
    if (!user || !token) return;
  
    await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token,
        user,
        message,
      }),
    });
  }
  