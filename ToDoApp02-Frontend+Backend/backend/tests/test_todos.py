import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database import get_db, Base
from app.models.todo import Todo

# 创建测试数据库
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

# 创建测试客户端
client = TestClient(app)

@pytest.fixture(scope="function")
def setup_database():
    """为每个测试创建和清理数据库"""
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_root():
    """测试根路径"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Todo App API"
    assert data["version"] == "1.0.0"

def test_health_check():
    """测试健康检查"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_create_todo(setup_database):
    """测试创建待办事项"""
    todo_data = {
        "title": "测试任务",
        "description": "这是一个测试任务"
    }
    response = client.post("/api/v1/todos/", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "测试任务"
    assert data["description"] == "这是一个测试任务"
    assert data["completed"] == False
    assert "id" in data
    assert "created_at" in data
    assert "updated_at" in data

def test_get_todos_empty(setup_database):
    """测试获取空列表"""
    response = client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert data["todos"] == []
    assert data["total"] == 0
    assert data["completed_count"] == 0
    assert data["pending_count"] == 0

def test_get_todos_with_data(setup_database):
    """测试获取有数据的列表"""
    # 创建测试数据
    todo1 = {"title": "任务1", "description": "描述1"}
    todo2 = {"title": "任务2", "description": "描述2", "completed": True}
    
    client.post("/api/v1/todos/", json=todo1)
    client.post("/api/v1/todos/", json=todo2)
    
    # 获取所有任务
    response = client.get("/api/v1/todos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 2
    assert data["total"] == 2
    assert data["completed_count"] == 1
    assert data["pending_count"] == 1

def test_get_todos_filtered(setup_database):
    """测试筛选功能"""
    # 创建测试数据
    todo1 = {"title": "未完成任务", "completed": False}
    todo2 = {"title": "已完成任务", "completed": True}
    
    client.post("/api/v1/todos/", json=todo1)
    client.post("/api/v1/todos/", json=todo2)
    
    # 测试获取已完成任务
    response = client.get("/api/v1/todos/?status=completed")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 1
    assert data["todos"][0]["title"] == "已完成任务"
    
    # 测试获取未完成任务
    response = client.get("/api/v1/todos/?status=pending")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 1
    assert data["todos"][0]["title"] == "未完成任务"

def test_get_todo_by_id(setup_database):
    """测试根据ID获取任务"""
    # 创建任务
    todo_data = {"title": "测试任务", "description": "测试描述"}
    response = client.post("/api/v1/todos/", json=todo_data)
    todo_id = response.json()["id"]
    
    # 获取任务
    response = client.get(f"/api/v1/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "测试任务"
    assert data["description"] == "测试描述"

def test_get_todo_not_found(setup_database):
    """测试获取不存在的任务"""
    response = client.get("/api/v1/todos/999")
    assert response.status_code == 404
    data = response.json()
    assert "待办事项不存在" in data["detail"]

def test_update_todo(setup_database):
    """测试更新任务"""
    # 创建任务
    todo_data = {"title": "原始标题", "description": "原始描述"}
    response = client.post("/api/v1/todos/", json=todo_data)
    todo_id = response.json()["id"]
    
    # 更新任务
    update_data = {
        "title": "更新后的标题",
        "completed": True
    }
    response = client.put(f"/api/v1/todos/{todo_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "更新后的标题"
    assert data["completed"] == True
    assert data["description"] == "原始描述"  # 未更新的字段保持不变

def test_update_todo_not_found(setup_database):
    """测试更新不存在的任务"""
    update_data = {"title": "新标题"}
    response = client.put("/api/v1/todos/999", json=update_data)
    assert response.status_code == 404
    data = response.json()
    assert "待办事项不存在" in data["detail"]

def test_delete_todo(setup_database):
    """测试删除任务"""
    # 创建任务
    todo_data = {"title": "要删除的任务"}
    response = client.post("/api/v1/todos/", json=todo_data)
    todo_id = response.json()["id"]
    
    # 删除任务
    response = client.delete(f"/api/v1/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "待办事项已删除"
    assert data["id"] == todo_id
    
    # 验证任务已被删除
    response = client.get(f"/api/v1/todos/{todo_id}")
    assert response.status_code == 404

def test_delete_todo_not_found(setup_database):
    """测试删除不存在的任务"""
    response = client.delete("/api/v1/todos/999")
    assert response.status_code == 404
    data = response.json()
    assert "待办事项不存在" in data["detail"]

def test_clear_completed_todos(setup_database):
    """测试清除已完成任务"""
    # 创建测试数据
    todo1 = {"title": "未完成任务", "completed": False}
    todo2 = {"title": "已完成任务1", "completed": True}
    todo3 = {"title": "已完成任务2", "completed": True}
    
    client.post("/api/v1/todos/", json=todo1)
    client.post("/api/v1/todos/", json=todo2)
    client.post("/api/v1/todos/", json=todo3)
    
    # 清除已完成任务
    response = client.delete("/api/v1/todos/completed")
    assert response.status_code == 200
    data = response.json()
    assert data["deleted_count"] == 2
    assert "已删除2个已完成的事项" in data["message"]
    
    # 验证只有未完成任务保留
    response = client.get("/api/v1/todos/")
    data = response.json()
    assert len(data["todos"]) == 1
    assert data["todos"][0]["title"] == "未完成任务"

def test_clear_all_todos(setup_database):
    """测试清空所有任务"""
    # 创建测试数据
    todo1 = {"title": "任务1"}
    todo2 = {"title": "任务2"}
    todo3 = {"title": "任务3"}
    
    client.post("/api/v1/todos/", json=todo1)
    client.post("/api/v1/todos/", json=todo2)
    client.post("/api/v1/todos/", json=todo3)
    
    # 清空所有任务
    response = client.delete("/api/v1/todos/all")
    assert response.status_code == 200
    data = response.json()
    assert data["deleted_count"] == 3
    assert "已清空所有事项" in data["message"]
    
    # 验证所有任务已被删除
    response = client.get("/api/v1/todos/")
    data = response.json()
    assert len(data["todos"]) == 0
    assert data["total"] == 0

def test_pagination(setup_database):
    """测试分页功能"""
    # 创建多个任务
    for i in range(5):
        todo_data = {"title": f"任务{i+1}"}
        client.post("/api/v1/todos/", json=todo_data)
    
    # 测试第一页
    response = client.get("/api/v1/todos/?page=1&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 2
    assert data["total"] == 5
    
    # 测试第二页
    response = client.get("/api/v1/todos/?page=2&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 2
    assert data["total"] == 5
    
    # 测试第三页
    response = client.get("/api/v1/todos/?page=3&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert len(data["todos"]) == 1
    assert data["total"] == 5

