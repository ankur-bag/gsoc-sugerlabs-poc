from app.models.reflection_model import ReflectionSession, Message
from app.models.user_model import UserInDB
from app.services.llm_service import generate_chat_response
from app.services.personalization import format_system_prompt
from app.services.stage_detector import get_next_stage

async def process_next_question(session: ReflectionSession, user: UserInDB) -> str:
    """Generate the next question based on current stage and history."""
    
    # Strict child-friendly progression: exactly 4 user messages total to complete the 4 Kolb stages.
    user_msg_count = sum(1 for m in session.messages if m.role == "user")
    
    if user_msg_count == 0:
        session.current_stage = "experience"
    elif user_msg_count == 1:
        session.current_stage = "reflection"
    elif user_msg_count == 2:
        session.current_stage = "conceptualization"
    elif user_msg_count == 3:
        session.current_stage = "experimentation"
    else:
        session.current_stage = "done"
        
    if session.current_stage == "done":
        return "You've completed the reflection cycle! Click Summarize to see what you learned."

    system_prompt = format_system_prompt(user, session.activity_type, session.current_stage)
    
    if not session.messages:
        history = []
        new_message = f"Hello! The student has just finished {session.activity_type}. Start the '{session.current_stage}' stage reflection."
    else:
        history = [{"role": msg.role, "content": msg.content} for msg in session.messages]
        last_msg = history.pop()
        
        if last_msg.get("role") == "user":
            new_message = last_msg["content"]
        else:
            history.append(last_msg)
            new_message = "Please ask the next follow-up question."

    response_text = await generate_chat_response(system_prompt, history, new_message)
    return response_text

async def generate_summary(session: ReflectionSession, user: UserInDB) -> str:
    """Summarize the reflection session."""
    system_prompt = """You are an expert reflection assistant.
Your task is to convert a conversation into a high-quality reflective journal entry.
Follow these rules strictly:

Structure:
1. Start with what the user did
2. Include how they felt
3. Include what went well or challenges
4. Include what they learned
5. End with what they will do next

Style:
- Write in FIRST PERSON ("I")
- Make it sound natural and human, not robotic
- Keep it concise (80–120 words)
- Do NOT use bullet points
- Do NOT repeat phrases
- No emojis
- No exaggeration or praise
- Maintain a thoughtful and reflective tone

Quality:
- Connect ideas smoothly (use transitions)
- Infer meaning if needed (but do not hallucinate)
- Make it sound like a real student reflection

Output:
A single well-written paragraph."""
    
    history = [{"role": msg.role, "content": msg.content} for msg in session.messages]
    
    response_text = await generate_chat_response(system_prompt, history, "Please synthesize my reflection journal entry based on our conversation.")
    return response_text
