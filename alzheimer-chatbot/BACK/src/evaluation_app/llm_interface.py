import os
import requests
import uuid
import json

def get_llm_responses(prompt: str):
    results = []

    # ---------- 1. DeepSeek via OpenRouter ----------
    try:
        print("🔵 Enviando requisição para DeepSeek R1 (OpenRouter)...")
        deepseek_response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "deepseek/deepseek-r1:free",
                "messages": [{"role": "user", "content": prompt}]
            })
        )

        if deepseek_response.status_code == 200:
            deepseek_data = deepseek_response.json()
            deepseek_text = deepseek_data['choices'][0]['message']['content']
            results.append({
                "id": str(uuid.uuid4()),
                "llm_name": "DeepSeek R1 (OpenRouter)",
                "text": deepseek_text
            })
        else:
            results.append({
                "id": str(uuid.uuid4()),
                "llm_name": "DeepSeek R1 (OpenRouter)",
                "text": f"[Erro DeepSeek] {deepseek_response.status_code} {deepseek_response.text}"
            })
    except Exception as e:
        results.append({
            "id": str(uuid.uuid4()),
            "llm_name": "DeepSeek R1 (OpenRouter)",
            "text": f"[Erro DeepSeek] {str(e)}"
        })

    # ---------- 2. Gemini 1.5 Pro ----------
    try:
        print("🟣 Enviando requisição para Gemini 1.5 Pro...")
        gemini_response = requests.post(
            url=f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={os.getenv('GOOGLE_API_KEY')}",
            headers={
                "Content-Type": "application/json"
            },
            data=json.dumps({
                "contents": [{"parts": [{"text": prompt}]}]
            })
        )

        if gemini_response.status_code == 200:
            gemini_data = gemini_response.json()
            gemini_text = gemini_data['candidates'][0]['content']['parts'][0]['text']
            results.append({
                "id": str(uuid.uuid4()),
                "llm_name": "Gemini 1.5 Pro",
                "text": gemini_text
            })
        else:
            results.append({
                "id": str(uuid.uuid4()),
                "llm_name": "Gemini 1.5 Pro",
                "text": f"[Erro Gemini] {gemini_response.status_code} {gemini_response.text}"
            })
    except Exception as e:
        results.append({
            "id": str(uuid.uuid4()),
            "llm_name": "Gemini 1.5 Pro",
            "text": f"[Erro Gemini] {str(e)}"
        })

    print("✅ Resultados:", results)
    return results
