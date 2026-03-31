STAGES = ["description", "feelings", "evaluation", "learning", "next steps"]

def get_next_stage(current_stage: str) -> str:
    """Returns the next stage in Kolb's cycle, or 'done' if completed."""
    if current_stage not in STAGES:
        return STAGES[0] 
        
    index = STAGES.index(current_stage)
    if index + 1 < len(STAGES):
        return STAGES[index + 1]
    return "done"
