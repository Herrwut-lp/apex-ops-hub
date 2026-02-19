import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: "Good morning Alex! You have 4 overdue invoices totalling $6,800 and 7 unanswered emails. Want me to draft a payment reminder for Nova Brands?",
  },
  {
    role: "user",
    text: "Yes, draft the reminder for Nova Brands.",
  },
  {
    role: "assistant",
    text: "Here's a draft based on your Invoice Reminder template: 'Hi [Contact], I wanted to follow up on Invoice #INV-042 for $3,200 due Feb 16...'. Shall I send it for your approval?",
  },
  {
    role: "user",
    text: "Looks good, send for approval.",
  },
  {
    role: "assistant",
    text: "Done — the draft is in your Approvals queue. Anything else I can help with?",
  },
];

const CANNED_REPLIES = [
  "I've pulled up the latest data for you. Anything else you'd like to explore?",
  "On it! I'll draft that now. Would you like me to use your standard template?",
  "Great idea. I can also flag this for follow-up in 3 days if that helps.",
  "Done! I've logged this action and updated the project timeline accordingly.",
  "Sure thing — I'll check your calendar and suggest the best time to schedule that.",
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)];
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded panel */}
      {open && (
        <div
          className="mb-3 w-[380px] bg-card rounded-2xl overflow-hidden flex flex-col"
          style={{
            height: "520px",
            boxShadow: "0 8px 48px 0 hsl(217 91% 30% / 0.22)",
            animation: "slideUp 0.22s ease-out",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-card shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles size={15} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground leading-tight">Ops Assistant</p>
                <p className="text-[10px] text-muted-foreground leading-tight">Powered by Claude</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X size={14} className="text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-muted/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <Sparkles size={10} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed
                    ${m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <Sparkles size={10} className="text-primary" />
                </div>
                <div className="bg-secondary px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
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
          <div className="px-3 py-3 border-t border-border bg-card shrink-0">
            <div className="flex items-center gap-2 bg-muted/40 rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything about your projects..."
                className="flex-1 bg-transparent text-[12.5px] text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity hover:bg-primary/90"
              >
                <Send size={12} className="text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg
          hover:bg-primary/90 transition-all duration-200 hover:scale-105
          ${open ? "scale-100" : "animate-pulse-slow"}`}
        style={{ boxShadow: "0 4px 24px 0 hsl(217 91% 55% / 0.45)" }}
      >
        <Sparkles size={22} className="text-primary-foreground" />
        {!open && (
          <span className="absolute -top-1 -right-1 bg-primary-foreground text-primary text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-primary">
            AI
          </span>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 4px 24px 0 hsl(217 91% 55% / 0.45); }
          50% { box-shadow: 0 4px 32px 8px hsl(217 91% 55% / 0.65); }
        }
        .animate-pulse-slow { animation: pulse-slow 2.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
