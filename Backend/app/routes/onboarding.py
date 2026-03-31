from fastapi import APIRouter, HTTPException, status
from app.models.user_model import UserOnboarding, UserInDB
from app.db.mongo import get_database

router = APIRouter()

@router.post("/onboarding", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def submit_onboarding(user_data: UserOnboarding):
    db = get_database()
    user_dict = user_data.model_dump(by_alias=True, exclude_none=True)
    
    result = await db.users.insert_one(user_dict)
    
    inserted_user = await db.users.find_one({"_id": result.inserted_id})
    if not inserted_user:
        raise HTTPException(status_code=500, detail="Failed to retrieve inserted user.")
        
    inserted_user["_id"] = str(inserted_user["_id"])
    return UserInDB(**inserted_user)

@router.get("/user/{clerk_id}", response_model=UserInDB)
async def get_user(clerk_id: str):
    db = get_database()
    user_dict = await db.users.find_one({"clerkId": clerk_id})
    if not user_dict:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_dict["_id"] = str(user_dict["_id"])
    return UserInDB(**user_dict)
