"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        session_id: sessionId, // Send the current session_id
      }),
    });

    const data = await res.json();
    
    if (data.reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    }
    
    // Update session_id with the one from the backend
    if (data.session_id) {
      setSessionId(data.session_id);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-accent text-white p-3 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-[380px] max-w-[90vw] h-[500px] max-h-[80vh] bg-background rounded-lg shadow-xl border flex flex-col overflow-hidden z-50">
          <div className="p-3 border-b font-semibold bg-muted">Rıdvan Yiğit’s Assistant</div>

          <div className="flex-grow p-3 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center text-sm mt-10">
                👋 Hello! I’m Rıdvan’s digital assistant. You can ask me anything about my services, projects, technical expertise, or how we can collaborate.
              </p>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 mb-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-lg max-w-xs ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {m.content}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button type="button" onClick={sendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}