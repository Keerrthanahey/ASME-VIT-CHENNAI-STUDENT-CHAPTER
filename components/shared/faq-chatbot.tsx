"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FAQ_DATA } from "@/lib/constants";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function findAnswer(query: string): string {
  const q = query.toLowerCase();
  const match = FAQ_DATA.find(
    (faq) =>
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      q.split(" ").some((word) => word.length > 3 && faq.question.toLowerCase().includes(word))
  );

  if (match) return match.answer;

  if (q.includes("join") || q.includes("member")) {
    return "You can join ASME VIT Chennai by registering through our member portal with your VIT email. Click 'Join ASME' on the homepage to get started!";
  }
  if (q.includes("event") || q.includes("workshop")) {
    return "We regularly organize technical talks, workshops, industrial visits, and competitions. Check our Events page for upcoming activities!";
  }
  if (q.includes("contact") || q.includes("email")) {
    return "You can reach us at asme.vit@vit.ac.in or visit our Contact page for more details including faculty contacts and social media links.";
  }

  return "I'm the ASME VIT assistant! I can help with membership, events, workshops, and general questions. Try asking about joining ASME, upcoming events, or membership benefits.";
}

export function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the ASME VIT assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: "user", content: input };
    const answer = findAnswer(input);
    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: answer },
    ]);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-asme-blue/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-asme-cyan" />
                <span className="font-semibold text-sm">ASME Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-asme-blue text-white"
                        : "bg-white/5 text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="glow">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-asme-blue to-asme-cyan text-white shadow-lg shadow-asme-blue/30"
        aria-label="Open FAQ chatbot"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
}
