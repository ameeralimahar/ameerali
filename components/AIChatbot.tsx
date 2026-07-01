"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "ai"; content: string };

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi! I'm Ameer's AI assistant. Ask me anything about his projects, skills, experience, or how to get in touch. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply ?? "Sorry, I couldn't process that." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl border border-line/60 bg-surface shadow-2xl shadow-black/40 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line/60 bg-surface2 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/15 border border-teal/20 text-sm">
                🤖
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-ink">Ask Ameer&apos;s AI</div>
                <div className="font-mono text-[9px] text-teal uppercase tracking-widest flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-teal animate-pulse" />
                  Powered by Gemini
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-ink transition-colors text-lg leading-none">
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${
                    m.role === "user"
                      ? "chat-bubble-user text-teal rounded-br-sm"
                      : "chat-bubble-ai text-ink/90 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-bubble-ai rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="border-t border-line/60 p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills..."
              className="flex-1 rounded-xl border border-line bg-surface px-3 py-2 font-body text-sm text-ink placeholder:text-muted focus:border-teal/50 focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-teal px-3 py-2 font-mono text-xs text-bg font-semibold transition-all hover:opacity-90 disabled:opacity-40"
            >
              ↑
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal shadow-lg shadow-teal/25 transition-all hover:scale-110 hover:shadow-teal/40 glow-teal"
        aria-label="Open AI chat"
      >
        {open ? (
          <span className="text-bg text-lg font-bold">×</span>
        ) : (
          <span className="text-bg text-xl">🤖</span>
        )}
      </button>
    </>
  );
}
