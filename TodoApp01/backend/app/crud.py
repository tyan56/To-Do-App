from sqlalchemy.orm import Session
from sqlalchemy import and_
from . import models, schemas
from typing import List, Optional


def get_todos(db: Session, filter_type: str = "all") -> List[models.Todo]:
    """获取待办事项列表，支持过滤"""
    query = db.query(models.Todo)
    
    if filter_type == "active":
        query = query.filter(models.Todo.completed == False)
    elif filter_type == "completed":
        query = query.filter(models.Todo.completed == True)
    
    return query.order_by(models.Todo.created_at.desc()).all()


def get_todo(db: Session, todo_id: int) -> Optional[models.Todo]:
    """根据ID获取单个待办事项"""
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def create_todo(db: Session, todo: schemas.TodoCreate) -> models.Todo:
    """创建新的待办事项"""
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description,
        completed=False
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def update_todo(db: Session, todo_id: int, todo_update: schemas.TodoUpdate) -> Optional[models.Todo]:
    """更新待办事项"""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    update_data = todo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)
    
    db.commit()
    db.refresh(db_todo)
    return db_todo


def toggle_todo(db: Session, todo_id: int) -> Optional[models.Todo]:
    """切换待办事项完成状态"""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return None
    
    db_todo.completed = not db_todo.completed
    db.commit()
    db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int) -> bool:
    """删除单个待办事项"""
    db_todo = get_todo(db, todo_id)
    if not db_todo:
        return False
    
    db.delete(db_todo)
    db.commit()
    return True


def delete_completed_todos(db: Session) -> int:
    """删除所有已完成的待办事项"""
    completed_todos = db.query(models.Todo).filter(models.Todo.completed == True).all()
    count = len(completed_todos)
    
    for todo in completed_todos:
        db.delete(todo)
    
    db.commit()
    return count


def delete_all_todos(db: Session) -> int:
    """删除所有待办事项"""
    all_todos = db.query(models.Todo).all()
    count = len(all_todos)
    
    for todo in all_todos:
        db.delete(todo)
    
    db.commit()
    return count