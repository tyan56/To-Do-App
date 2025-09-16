from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from app.database import get_db
from app.models.todo import Todo
from app.schemas import (
    TodoCreate, 
    TodoUpdate, 
    TodoResponse, 
    TodoListResponse,
    TodoDeleteResponse,
    TodoBatchDeleteResponse,
    ErrorResponse
)

router = APIRouter(prefix="/todos", tags=["todos"])

@router.get("/", response_model=TodoListResponse)
async def get_todos(
    status: str = Query("all", description="Filter by status: all, completed, pending"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(50, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    """获取待办事项列表"""
    try:
        # 构建查询
        query = db.query(Todo)
        
        # 根据状态筛选
        if status == "completed":
            query = query.filter(Todo.completed == True)
        elif status == "pending":
            query = query.filter(Todo.completed == False)
        
        # 计算总数
        total = query.count()
        
        # 分页
        offset = (page - 1) * limit
        todos = query.offset(offset).limit(limit).all()
        
        # 计算统计信息
        completed_count = db.query(Todo).filter(Todo.completed == True).count()
        pending_count = db.query(Todo).filter(Todo.completed == False).count()
        
        return TodoListResponse(
            todos=todos,
            total=total,
            completed_count=completed_count,
            pending_count=pending_count
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"获取待办事项失败: {str(e)}"
        )

@router.post("/", response_model=TodoResponse, status_code=201)
async def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    """创建新的待办事项"""
    try:
        db_todo = Todo(
            title=todo.title,
            description=todo.description,
            completed=False
        )
        db.add(db_todo)
        db.commit()
        db.refresh(db_todo)
        return db_todo
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"创建待办事项失败: {str(e)}"
        )

@router.get("/{todo_id}", response_model=TodoResponse)
async def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """获取单个待办事项"""
    todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(
            status_code=404,
            detail="待办事项不存在"
        )
    return todo

@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: int, 
    todo_update: TodoUpdate, 
    db: Session = Depends(get_db)
):
    """更新待办事项"""
    try:
        todo = db.query(Todo).filter(Todo.id == todo_id).first()
        if not todo:
            raise HTTPException(
                status_code=404,
                detail="待办事项不存在"
            )
        
        # 更新字段
        update_data = todo_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(todo, field, value)
        
        db.commit()
        db.refresh(todo)
        return todo
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"更新待办事项失败: {str(e)}"
        )

@router.delete("/{todo_id}", response_model=TodoDeleteResponse)
async def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """删除单个待办事项"""
    try:
        todo = db.query(Todo).filter(Todo.id == todo_id).first()
        if not todo:
            raise HTTPException(
                status_code=404,
                detail="待办事项不存在"
            )
        
        db.delete(todo)
        db.commit()
        
        return TodoDeleteResponse(
            message="待办事项已删除",
            id=todo_id
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"删除待办事项失败: {str(e)}"
        )

@router.delete("/completed", response_model=TodoBatchDeleteResponse)
async def clear_completed_todos(db: Session = Depends(get_db)):
    """批量删除已完成的事项"""
    try:
        # 查询已完成的事项
        completed_todos = db.query(Todo).filter(Todo.completed == True).all()
        deleted_count = len(completed_todos)
        
        # 删除已完成的事项
        for todo in completed_todos:
            db.delete(todo)
        
        db.commit()
        
        return TodoBatchDeleteResponse(
            message=f"已删除{deleted_count}个已完成的事项",
            deleted_count=deleted_count
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"清除已完成事项失败: {str(e)}"
        )

@router.delete("/all", response_model=TodoBatchDeleteResponse)
async def clear_all_todos(db: Session = Depends(get_db)):
    """清空所有事项"""
    try:
        # 查询所有事项
        all_todos = db.query(Todo).all()
        deleted_count = len(all_todos)
        
        # 删除所有事项
        for todo in all_todos:
            db.delete(todo)
        
        db.commit()
        
        return TodoBatchDeleteResponse(
            message=f"已清空所有事项",
            deleted_count=deleted_count
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"清空所有事项失败: {str(e)}"
        )

