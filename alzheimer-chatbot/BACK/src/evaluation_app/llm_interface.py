import os
import requests
import uuid
from dotenv import load_dotenv

load_dotenv()

# Pegando as chaves específicas de cada modelo
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")
GEMMA_API_KEY = os.getenv("GEMMA_API_KEY")

# Prefixo padrão para os prompts
PREFIXO_PT = "Responda em português, de forma clara e objetiva: "

# Modelos configurados
LLMS = [
    {
        "id": "deepseek",
        "name": "DeepSeek V3",
        "model": "deepseek/deepseek-chat-v3-0324:free",
        "url": "https://openrouter.ai/api/v1/chat/completions",
        "api_key": DEEPSEEK_API_KEY
    },
    {
        "id": "gemma",
        "name": "Gemma 3 12B",
        "model": "google/gemma-3-12b-it:free",
        "url": "https://openrouter.ai/api/v1/chat/completions",
        "api_key": GEMMA_API_KEY
    }
]

def get_llm_responses(user_prompt: str):
    results = []

    for llm in LLMS:
        try:
            response_id = str(uuid.uuid4())
            full_prompt = PREFIXO_PT + user_prompt

            headers = {
                "Authorization": f"Bearer {llm['api_key']}",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "Alois Chat",
                "Content-Type": "application/json"
            }

            body = {
                "model": llm["model"],
                "messages": [
                    {
                        "role": "user",
                        "content": full_prompt
                    }
                ]
            }

            response = requests.post(llm["url"], json=body, headers=headers, timeout=20)

            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
            else:
                content = f"[Erro {llm['name']}] {response.status_code} {response.text}"

        except Exception as e:
            content = f"[Erro {llm['name']}] {str(e)}"

        results.append({
            "id": response_id,
            "llm_name": llm["name"],
            "text": content
        })

    return results
