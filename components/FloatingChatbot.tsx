"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(""); 
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput, session_id: sessionId }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }

      const assistantMessage = { role: "assistant", content: data.reply || "Sorry, I couldn't get a response." };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = { role: "assistant", content: "Something went wrong. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-[380px] max-w-[90vw] h-[500px] max-h-[80vh] bg-background rounded-lg shadow-xl border flex flex-col overflow-hidden z-50">
          <div className="p-3 border-b font-semibold bg-muted">Rıdvan Yiğit’s Assistant</div>

          <div className="flex-grow p-3 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center text-sm mt-10">
                👋 Hello! I’m Rıdvan’s digital assistant. Ask me anything about my services, projects, or how we can collaborate.
              </p>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg text-sm max-w-[80%] ${
                      m.role === "user" ? "bg-indigo-600 text-white" : "bg-muted text-foreground"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="mb-3 flex justify-start">
                <div className="p-3 rounded-lg text-sm bg-muted text-foreground flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <Button type="button" onClick={sendMessage} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}