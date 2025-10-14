"use client";

import React, { useEffect, useRef, useState } from "react";

type Msg = { id: string; sender: "user" | "assistant"; text: string; time?: string };

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const msgsRef = useRef<HTMLDivElement | null>(null);

  // Load session id from localStorage on mount
  useEffect(() => {
    const sid = localStorage.getItem("chat_session_id");
    if (sid) setSessionId(sid);
  }, []);

  // keep sessionId in localStorage
  useEffect(() => {
    if (sessionId) localStorage.setItem("chat_session_id", sessionId);
  }, [sessionId]);

  // autoscroll when messages change
  useEffect(() => {
    if (msgsRef.current) {
      msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const userMsg: Msg = { id: String(Date.now()), sender: "user", text };
    setMessages((m) => [...m, userMsg]);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      const data = await res.json();
      // backend returns { reply: "...", session_id: "..." } (or { response, session_id })
      const reply = data.reply ?? data.response ?? "";
      const returnedSessionId = data.session_id ?? null;

      if (returnedSessionId && returnedSessionId !== sessionId) {
        setSessionId(returnedSessionId);
        localStorage.setItem("chat_session_id", returnedSessionId);
      }

      const botMsg: Msg = { id: String(Date.now() + 1), sender: "assistant", text: reply };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error("Chat send error:", err);
      setMessages((m) => [...m, { id: String(Date.now()), sender: "assistant", text: "Error contacting chatbot." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen((s) => !s)}
        className="fixed right-6 bottom-6 z-50 rounded-full bg-indigo-600 text-white p-3 shadow-lg"
      >
        Chat
      </button>

      {open && (
        <div className="fixed right-6 bottom-20 z-50 w-80 md:w-96 h-[520px] bg-white dark:bg-slate-900 border rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold">Rıdvan's Digital Twin</div>
            <button onClick={() => setOpen(false)} className="text-sm text-muted-foreground">Close</button>
          </div>

          <div ref={msgsRef} className="flex-1 p-3 overflow-auto space-y-3 bg-[whitesmoke] dark:bg-slate-800">
            {messages.map((m) => (
              <div key={m.id} className={`rounded-md p-2 ${m.sender === "user" ? "bg-indigo-50 self-end" : "bg-white dark:bg-slate-700"}`}>
                <div className="text-sm">{m.text}</div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              className="flex-1 px-3 py-2 rounded-md border outline-none"
              placeholder="Type your message..."
            />
            <button disabled={sending} onClick={sendMessage} className="px-3 py-2 rounded-md bg-indigo-600 text-white">
              {sending ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
