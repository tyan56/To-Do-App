from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class TodoBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="待办事项标题")
    description: Optional[str] = Field(None, description="待办事项描述")


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    completed: Optional[bool] = None


class TodoToggle(BaseModel):
    completed: bool


class TodoResponse(TodoBase):
    id: int
    completed: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TodoListResponse(BaseModel):
    success: bool = True
    data: List[TodoResponse]
    total: int


class TodoSingleResponse(BaseModel):
    success: bool = True
    data: TodoResponse


class TodoDeleteResponse(BaseModel):
    success: bool = True
    message: str


class TodoBatchDeleteResponse(BaseModel):
    success: bool = True
    message: str
    deleted_count: int


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict