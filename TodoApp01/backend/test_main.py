import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from app.main import app
from app.database import get_db, Base


# Create test database
SQLITE_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLITE_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    # Create test database
    Base.metadata.create_all(bind=engine)
    yield
    # Clean up test database
    Base.metadata.drop_all(bind=engine)
    try:
        if os.path.exists("test.db"):
            os.remove("test.db")
    except PermissionError:
        pass  # 忽略权限错误


@pytest.fixture(autouse=True)
def clean_database():
    """Clean database before each test"""
    db = TestingSessionLocal()
    try:
        # Delete all todos
        from app.models import Todo
        db.query(Todo).delete()
        db.commit()
    finally:
        db.close()


def test_root_endpoint():
    """测试根端点"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


def test_health_check():
    """测试健康检查端点"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_create_todo():
    """测试创建待办事项"""
    todo_data = {
        "title": "测试任务",
        "description": "这是一个测试任务"
    }
    response = client.post("/api/todos", json=todo_data)
    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["data"]["title"] == "测试任务"
    assert data["data"]["completed"] is False


def test_get_todos():
    """测试获取待办事项列表"""
    # 首先创建一个待办事项
    todo_data = {"title": "测试任务", "description": "测试描述"}
    client.post("/api/todos", json=todo_data)
    
    # 获取列表
    response = client.get("/api/todos")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["total"] == 1
    assert len(data["data"]) == 1


def test_get_todos_with_filter():
    """测试过滤待办事项"""
    # 创建已完成和未完成的任务
    client.post("/api/todos", json={"title": "未完成任务"})
    response = client.post("/api/todos", json={"title": "已完成任务"})
    todo_id = response.json()["data"]["id"]
    
    # 标记为已完成
    client.patch(f"/api/todos/{todo_id}/toggle")
    
    # 测试过滤器
    response = client.get("/api/todos?filter_type=active")
    assert response.status_code == 200
    assert response.json()["total"] == 1
    
    response = client.get("/api/todos?filter_type=completed")
    assert response.status_code == 200
    assert response.json()["total"] == 1


def test_get_single_todo():
    """测试获取单个待办事项"""
    # 创建待办事项
    response = client.post("/api/todos", json={"title": "单个任务"})
    todo_id = response.json()["data"]["id"]
    
    # 获取单个任务
    response = client.get(f"/api/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["title"] == "单个任务"


def test_get_nonexistent_todo():
    """测试获取不存在的待办事项"""
    response = client.get("/api/todos/999")
    assert response.status_code == 404


def test_update_todo():
    """测试更新待办事项"""
    # 创建待办事项
    response = client.post("/api/todos", json={"title": "原标题"})
    todo_id = response.json()["data"]["id"]
    
    # 更新
    update_data = {"title": "新标题", "completed": True}
    response = client.put(f"/api/todos/{todo_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["data"]["title"] == "新标题"
    assert data["data"]["completed"] is True


def test_toggle_todo():
    """测试切换待办事项状态"""
    # 创建待办事项
    response = client.post("/api/todos", json={"title": "切换任务"})
    todo_id = response.json()["data"]["id"]
    
    # 切换为完成
    response = client.patch(f"/api/todos/{todo_id}/toggle")
    assert response.status_code == 200
    assert response.json()["data"]["completed"] is True
    
    # 再次切换为未完成
    response = client.patch(f"/api/todos/{todo_id}/toggle")
    assert response.status_code == 200
    assert response.json()["data"]["completed"] is False


def test_delete_todo():
    """测试删除待办事项"""
    # 创建待办事项
    response = client.post("/api/todos", json={"title": "要删除的任务"})
    todo_id = response.json()["data"]["id"]
    
    # 删除
    response = client.delete(f"/api/todos/{todo_id}")
    assert response.status_code == 200
    assert response.json()["success"] is True
    
    # 确认已删除
    response = client.get(f"/api/todos/{todo_id}")
    assert response.status_code == 404


def test_delete_completed_todos():
    """测试批量删除已完成的待办事项"""
    # 创建多个待办事项
    response1 = client.post("/api/todos", json={"title": "任务1"})
    response2 = client.post("/api/todos", json={"title": "任务2"})
    response3 = client.post("/api/todos", json={"title": "任务3"})
    
    # 标记部分为已完成
    client.patch(f"/api/todos/{response1.json()['data']['id']}/toggle")
    client.patch(f"/api/todos/{response2.json()['data']['id']}/toggle")
    
    # 删除已完成的
    response = client.delete("/api/todos/batch/completed")
    assert response.status_code == 200
    data = response.json()
    assert data["deleted_count"] == 2
    
    # 验证还有一个未完成的
    response = client.get("/api/todos")
    assert response.json()["total"] == 1


def test_delete_all_todos():
    """测试清除所有待办事项"""
    # 创建多个待办事项
    client.post("/api/todos", json={"title": "任务1"})
    client.post("/api/todos", json={"title": "任务2"})
    client.post("/api/todos", json={"title": "任务3"})
    
    # 删除所有
    response = client.delete("/api/todos/batch/all")
    assert response.status_code == 200
    data = response.json()
    assert data["deleted_count"] == 3
    
    # 验证列表为空
    response = client.get("/api/todos")
    assert response.json()["total"] == 0


def test_create_todo_validation():
    """测试创建待办事项的数据验证"""
    # 测试空标题
    response = client.post("/api/todos", json={"title": ""})
    assert response.status_code == 422
    
    # 测试缺少标题
    response = client.post("/api/todos", json={"description": "只有描述"})
    assert response.status_code == 422