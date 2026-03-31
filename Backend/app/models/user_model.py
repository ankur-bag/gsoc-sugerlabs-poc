from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime, timezone

class UserOnboarding(BaseModel):
    clerkId: str
    name: str
    ageGroup: str 
    interests: List[str] 
    currentFocus: str 
    skillLevel: str 

class UserInDB(UserOnboarding):
    id: Optional[str] = Field(alias="_id", default=None)
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "name": "Ankur",
                "ageGroup": "9-12",
                "interests": ["coding", "music"],
                "currentFocus": "coding",
                "skillLevel": "beginner",
                "thinkingStyle": "guided",
                "goal": "build games"
            }
        }
    )
