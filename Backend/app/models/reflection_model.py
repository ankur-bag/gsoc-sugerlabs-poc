from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime, timezone

class Message(BaseModel):
    role: str # "user" or "assistant"
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReflectionSession(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    user_id: str
    project_name: str = "Untitled Project"
    activity_type: str 
    current_stage: str # "experience", "reflection", "conceptualization", "experimentation"
    mode: str # "guided", "creative", "critical"
    messages: List[Message] = []
    summary: Optional[str] = None
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(populate_by_name=True)
