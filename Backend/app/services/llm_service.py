import os
import google.generativeai as genai
from typing import List, Dict

# Assuming you have an API key set in ENV
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")

if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)

MODEL_NAME = "gemini-2.5-flash"

async def generate_chat_response(system_instruction: str, history: List[Dict[str, str]], new_message: str) -> str:
    """
    history format: [{"role": "user"|"assistant", "content": "..."}]
    new_message: The latest user input.
    """
    if not GENAI_API_KEY:
        return "I am in offline mode. Please configure the GEMINI_API_KEY."

    model = genai.GenerativeModel(
        model_name=MODEL_NAME,
        system_instruction=system_instruction
    )
    
    formatted_history = []
    for msg in history:
        role = "model" if msg["role"] == "assistant" else "user"
        formatted_history.append({"role": role, "parts": [msg["content"]]})
        
    try:
        chat = model.start_chat(history=formatted_history)
        response = chat.send_message(new_message)
        return response.text
    except Exception as e:
        if "429" in str(e) or "quota" in str(e).lower():
            return "Hey there! My AI brain ran out of energy (Google API Rate Limit reached). Please try again in a minute!"
        raise
