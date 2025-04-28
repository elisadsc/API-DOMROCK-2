import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { ModalAvaliacao } from "@/components/modal-avaliacao";

interface Message {
  id: string;
  llm_name: string;
  role: string;
  text: string;
}

export default function AloisChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [otherMessage, setOtherMessage] = useState<Message | null>(null);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      llm_name: "Usuário",
      role: "Você",
      text: prompt,
    };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    const response = await fetch("http://localhost:8000/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const replies: Message[] = data.responses.map((r: any) => ({
      id: crypto.randomUUID(),
      llm_name: r.llm_name,
      role: r.llm_name,
      text: r.text,
    }));

    setMessages((prev) => [...prev, ...replies]);
  };

  const handleSelectMessage = (msg: Message) => {
    const others = messages.filter((m) => m.id !== msg.id && m.role !== "Você");
    setSelectedMessage(msg);
    setOtherMessage(others.length > 0 ? others[0] : null);
    setShowModal(true);
  };

  const handleConfirmEvaluation = () => {
    setShowEvaluationForm(true);
  };

  const handleSubmitEvaluation = (nota: Record<string, number>, justificativa: string) => {
    console.log("Avaliação enviada:", { nota, justificativa });

    // Remove a outra resposta
    if (otherMessage) {
      setMessages((prev) => prev.filter((m) => m.id !== otherMessage.id));
    }

    setShowModal(false);
    setSelectedMessage(null);
    setOtherMessage(null);
    setShowEvaluationForm(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(to bottom right, #e9e0f1, #d7c8ea)", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "900px", height: "90vh", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ background: "linear-gradient(90deg, #6e519d 0%, #957dc2 100%)", color: "white", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>ALOIS CHAT</h1>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button>🌙</Button>
            <Button>ℹ️</Button>
          </div>
        </header>

        <div style={{ flex: "1", overflowY: "auto", padding: "1.5rem", backgroundColor: "#f1e9f7" }}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                maxWidth: "700px",
                marginLeft: msg.role === "Você" ? "auto" : "0",
                marginRight: msg.role !== "Você" ? "auto" : "0",
                backgroundColor: msg.role === "Você" ? "#d7c8ea" : "#ffffff",
                color: "#333",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "1rem",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                cursor: msg.role !== "Você" ? "pointer" : "default",
              }}
              onClick={() => msg.role !== "Você" && handleSelectMessage(msg)}
            >
              <strong style={{ display: "block", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                {msg.role}
              </strong>
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div style={{ backgroundColor: "#e5d7f0", padding: "1rem", display: "flex", gap: "1rem" }}>
          <Input
            placeholder="Como posso te ajudar hoje?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{ flex: "1", borderRadius: "50px", padding: "1rem", backgroundColor: "#d9cbe6" }}
          />
          <Button onClick={handleSend} style={{ borderRadius: "50%", backgroundColor: "#6e519d", color: "white" }}>
            <Send style={{ width: "20px", height: "20px" }} />
          </Button>
        </div>
      </div>

      {selectedMessage && (
        <ModalAvaliacao
          open={showModal}
          resposta={selectedMessage}
          showEvaluationForm={showEvaluationForm}
          onConfirm={handleConfirmEvaluation}
          onSubmit={handleSubmitEvaluation}
          onClose={() => {
            setShowModal(false);
            setSelectedMessage(null);
            setOtherMessage(null);
            setShowEvaluationForm(false);
          }}
        />
      )}
    </main>
  );
}
