from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()


@router.get("/todos", response_model=schemas.TodoListResponse)
def get_todos(
    filter_type: str = Query("all", pattern="^(all|active|completed)$", description="过滤条件"),
    db: Session = Depends(get_db)
):
    """获取待办事项列表"""
    try:
        todos = crud.get_todos(db, filter_type=filter_type)
        return schemas.TodoListResponse(
            data=todos,
            total=len(todos)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/todos", response_model=schemas.TodoSingleResponse, status_code=201)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    """创建新的待办事项"""
    try:
        db_todo = crud.create_todo(db=db, todo=todo)
        return schemas.TodoSingleResponse(data=db_todo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/todos/{todo_id}", response_model=schemas.TodoSingleResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """获取单个待办事项"""
    db_todo = crud.get_todo(db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return schemas.TodoSingleResponse(data=db_todo)


@router.put("/todos/{todo_id}", response_model=schemas.TodoSingleResponse)
def update_todo(todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db)):
    """更新待办事项"""
    db_todo = crud.update_todo(db=db, todo_id=todo_id, todo_update=todo_update)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return schemas.TodoSingleResponse(data=db_todo)


@router.patch("/todos/{todo_id}/toggle", response_model=schemas.TodoSingleResponse)
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    """切换待办事项完成状态"""
    db_todo = crud.toggle_todo(db=db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return schemas.TodoSingleResponse(data=db_todo)


@router.delete("/todos/{todo_id}", response_model=schemas.TodoDeleteResponse)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """删除单个待办事项"""
    success = crud.delete_todo(db=db, todo_id=todo_id)
    if not success:
        raise HTTPException(status_code=404, detail="待办事项不存在")
    return schemas.TodoDeleteResponse(message="待办事项已删除")


@router.delete("/todos/batch/completed", response_model=schemas.TodoBatchDeleteResponse)
def delete_completed_todos(db: Session = Depends(get_db)):
    """批量删除已完成的待办事项"""
    try:
        deleted_count = crud.delete_completed_todos(db=db)
        return schemas.TodoBatchDeleteResponse(
            message=f"已删除{deleted_count}个已完成的待办事项",
            deleted_count=deleted_count
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/todos/batch/all", response_model=schemas.TodoBatchDeleteResponse)
def delete_all_todos(db: Session = Depends(get_db)):
    """清除所有待办事项"""
    try:
        deleted_count = crud.delete_all_todos(db=db)
        return schemas.TodoBatchDeleteResponse(
            message=f"已删除所有待办事项",
            deleted_count=deleted_count
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))