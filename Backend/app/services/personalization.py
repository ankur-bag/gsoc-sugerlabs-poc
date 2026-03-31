from app.models.user_model import UserInDB
from app.utils.prompts import SYSTEM_PROMPT_TEMPLATE

def get_tone_for_age(age_group: str) -> str:
    if age_group == "6-8":
        return "playful and highly encouraging, using simple words"
    elif age_group == "13+":
        return "analytical, respectful, and slightly complex, treating them as a young adult"
    return "supportive and clear"

def format_system_prompt(user: UserInDB, activity_type: str, current_stage: str) -> str:
    # 1. Adaptive Tone
    tone = get_tone_for_age(user.ageGroup)
    
    # 2. Mismatch Handling (Smart Contextual Adaptation)
    mismatch_context = ""
    user_interests = [i.lower() for i in user.interests]
    if activity_type.lower() not in user_interests:
        mismatch_context = f"Note: The user usually focuses on {', '.join(user.interests)}, but is currently exploring {activity_type}. Acknowledge this new exploration if relevant."
        
    # 3. Context Memory (Simulated placeholder for DB query of `reflections` collection)
    context_memory = "No past reflections yet."
        
    return SYSTEM_PROMPT_TEMPLATE.format(
        name=user.name,
        age_group=user.ageGroup,
        activity_type=activity_type,
        current_stage=current_stage,
        mismatch_context=mismatch_context,
        context_memory=context_memory
    )
