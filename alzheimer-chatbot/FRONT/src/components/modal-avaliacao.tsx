import React, { useState } from "react";

interface ModalAvaliacaoProps {
  open: boolean;
  resposta: {
    id: string;
    llm_name: string;
    role: string;
    text: string;
  };
  showEvaluationForm: boolean;
  onConfirm: () => void;
  onSubmit: (nota: Record<string, number>, justificativa: string) => void;
  onClose: () => void;
}

export function ModalAvaliacao({ open, resposta, showEvaluationForm, onConfirm, onSubmit, onClose }: ModalAvaliacaoProps) {
  const [notas, setNotas] = useState<Record<string, number>>({
    coerencia: 0,
    clareza: 0,
    relevancia: 0,
    utilidade: 0,
    confiabilidade: 0,
  });
  const [justificativa, setJustificativa] = useState("");

  if (!open) return null;

  const handleChangeNota = (campo: string, valor: number) => {
    setNotas((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div style={{ backgroundColor: "white", borderRadius: "12px", padding: "2rem", maxWidth: "500px", width: "100%" }}>
        {!showEvaluationForm ? (
          <>
            <h2 style={{ marginBottom: "1rem" }}>Você escolheu a resposta do <strong>{resposta.llm_name}</strong>. Deseja avaliar esta resposta?</h2>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button onClick={onConfirm} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#6e519d", color: "white", borderRadius: "8px", border: "none" }}>
                Sim, desejo avaliar
              </button>
              <button onClick={onClose} style={{ flex: 1, padding: "0.75rem", backgroundColor: "#ccc", color: "#333", borderRadius: "8px", border: "none" }}>
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: "1rem" }}>Avalie a resposta</h2>
            {["coerencia", "clareza", "relevancia", "utilidade", "confiabilidade"].map((campo) => (
              <div key={campo} style={{ marginBottom: "1rem" }}>
                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                <select
                  value={notas[campo]}
                  onChange={(e) => handleChangeNota(campo, parseInt(e.target.value))}
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                >
                  <option value={0}>Selecione</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            ))}
            <div style={{ marginBottom: "1rem" }}>
              <label>Justificativa:</label>
              <textarea
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem", minHeight: "100px" }}
              />
            </div>
            <button
              onClick={() => onSubmit(notas, justificativa)}
              style={{ width: "100%", padding: "0.75rem", backgroundColor: "#6e519d", color: "white", borderRadius: "8px", border: "none" }}
            >
              Enviar Avaliação
            </button>
          </>
        )}
      </div>
    </div>
  );
}
