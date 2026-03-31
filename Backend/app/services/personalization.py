from app.models.user_model import UserInDB
from app.utils.prompts import SYSTEM_PROMPT_TEMPLATE

def get_tone_for_age(age_group: str) -> str:
    if age_group == "6-8":
        return "playful and highly encouraging, using simple words"
    elif age_group == "13+":
        return "analytical, respectful, and slightly complex, treating them as a young adult"
    return "supportive and clear"

def format_system_prompt(user: UserInDB, activity_type: str, project_name: str) -> str:
    return SYSTEM_PROMPT_TEMPLATE.format(
        name=user.name,
        age_group=user.ageGroup,
        activity_type=activity_type,
        project_name=project_name
    )
