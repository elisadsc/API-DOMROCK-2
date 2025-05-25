const API_URL = "http://localhost:8000";

export async function sendPrompt(prompt: string) {
  const response = await fetch(`${API_URL}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) throw new Error("Erro ao enviar prompt");
  return response.json();
}

export async function sendFeedback(chatHistoryId: string, feedback: string) {
  const response = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_history_id: chatHistoryId,
      feedback,
    }),
  });

  if (!response.ok) throw new Error("Erro ao enviar feedback");
  return response.json();
}

export async function submitEvaluation(data: {
  llm_response_1_id: string;
  llm_response_2_id: string;
  scores_1: number[];
  scores_2: number[];
  preferred: string;
  justification: string;
}) {
  const response = await fetch(`${API_URL}/evaluation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Erro ao enviar avaliação");
  return response.json();
}

export async function getChatHistory() {
  const response = await fetch(`${API_URL}/history`);
  if (!response.ok) throw new Error("Erro ao buscar histórico");
  return response.json();
}
