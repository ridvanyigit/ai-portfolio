"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Mesaj arayüzü tipi
interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function FloatingChatbot() {
  // Pencerenin açık/kapalı durumu için state
  const [open, setOpen] = useState(false);

  // Sohbet arayüzünün state'leri
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sohbeti en alta kaydırma fonksiyonu
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Sadece pencere açıkken sohbeti kaydır
    if (open) {
      scrollToBottom();
    }
  }, [messages, isLoading, open]);

  // Mesaj gönderme fonksiyonu
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          session_id: sessionId,
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      if (data.session_id && !sessionId) {
        setSessionId(data.session_id);
      }
      const assistantMsg: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMsg: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. SAĞ ALTTAKİ CHATBOT İKONU */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition z-50 hover:bg-indigo-700"
        aria-label="Toggle Chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* 2. İKONA TIKLANDIĞINDA AÇILAN KÜÇÜK PENCERE */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[400px] max-w-[90vw] h-[600px] max-h-[80vh] bg-background rounded-xl shadow-2xl border flex flex-col overflow-hidden z-50">
          
          {/* BU PENCERENİN İÇİNDEKİ AVATARLI VE ŞIK ARAYÜZ */}
          <div className="p-4 border-b font-semibold bg-muted flex items-center gap-3">
             <div className="relative w-10 h-10">
                <Image src="/avatar.png" alt="Assistant Avatar" layout="fill" className="rounded-full" />
             </div>
            <div>
              <h2 className="text-base font-bold">Rıdvan's Assistant</h2>
              <p className="text-xs text-muted-foreground">AI-powered digital twin</p>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground text-sm mt-10 px-4">
                <p>Hello! I’m Rıdvan’s digital assistant. Ask me anything about his projects, skills, or experience.</p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex gap-3 items-end ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden relative">
                      <Image src="/avatar.png" alt="Assistant Avatar" layout="fill" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${ m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-muted text-foreground rounded-bl-none" }`}>
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
               <div className="flex gap-3 items-end">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden relative">
                    <Image src="/avatar.png" alt="Assistant Avatar" layout="fill" />
                  </div>
                  <div className="bg-muted rounded-2xl p-3 rounded-bl-none">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2 bg-background">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
              className="flex-1"
              autoFocus
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