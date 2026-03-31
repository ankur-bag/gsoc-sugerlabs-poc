from app.models.reflection_model import ReflectionSession
from app.models.user_model import UserInDB
from app.services.llm_service import generate_chat_response
from app.services.personalization import format_system_prompt


async def process_next_question(session: ReflectionSession, user: UserInDB) -> str:
    """Generate the next question based on current stage and history (5-question limit)."""
    
    # 5 specific stages: Description, Feelings, Evaluation, Learning, Next Steps.
    # user_msg_count tracks how many stages have been answered by the child.
    user_msg_count = sum(1 for m in session.messages if m.role == "user")
    
    if user_msg_count == 0:
        session.current_stage = "description"
    elif user_msg_count == 1:
        session.current_stage = "feelings"
    elif user_msg_count == 2:
        session.current_stage = "evaluation"
    elif user_msg_count == 3:
        session.current_stage = "learning"
    elif user_msg_count == 4:
        session.current_stage = "next steps"
    else:
        session.current_stage = "done"
        
    if session.current_stage == "done":
        return "You've completed the reflection journal! Thank you for sharing your thoughts! "

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
