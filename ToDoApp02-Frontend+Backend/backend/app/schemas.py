from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TodoResponse(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TodoListResponse(BaseModel):
    todos: List[TodoResponse]
    total: int
    completed_count: int
    pending_count: int

class TodoDeleteResponse(BaseModel):
    message: str
    id: int

class TodoBatchDeleteResponse(BaseModel):
    message: str
    deleted_count: int

class ErrorResponse(BaseModel):
    detail: str
    error_code: str
    timestamp: datetime

