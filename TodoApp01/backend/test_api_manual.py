#!/usr/bin/env python3
"""
手动API测试脚本
用于验证API服务是否正常工作
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_api():
    print("🚀 开始API手动测试...")
    
    # 等待服务器启动
    print("⏳ 等待服务器启动...")
    time.sleep(3)
    
    try:
        # 1. 测试健康检查
        print("\n1. 测试健康检查端点")
        response = requests.get(f"{BASE_URL}/health")
        print(f"状态码: {response.status_code}")
        print(f"响应: {response.json()}")
        
        # 2. 测试根端点
        print("\n2. 测试根端点")
        response = requests.get(f"{BASE_URL}/")
        print(f"状态码: {response.status_code}")
        print(f"响应: {response.json()}")
        
        # 3. 创建待办事项
        print("\n3. 创建待办事项")
        todo_data = {
            "title": "测试任务",
            "description": "这是一个手动测试任务"
        }
        response = requests.post(f"{BASE_URL}/api/todos", json=todo_data)
        print(f"状态码: {response.status_code}")
        created_todo = response.json()
        print(f"响应: {created_todo}")
        
        if response.status_code == 201:
            todo_id = created_todo["data"]["id"]
            
            # 4. 获取待办事项列表
            print("\n4. 获取待办事项列表")
            response = requests.get(f"{BASE_URL}/api/todos")
            print(f"状态码: {response.status_code}")
            print(f"响应: {response.json()}")
            
            # 5. 获取单个待办事项
            print(f"\n5. 获取单个待办事项 (ID: {todo_id})")
            response = requests.get(f"{BASE_URL}/api/todos/{todo_id}")
            print(f"状态码: {response.status_code}")
            print(f"响应: {response.json()}")
            
            # 6. 更新待办事项
            print(f"\n6. 更新待办事项 (ID: {todo_id})")
            update_data = {
                "title": "更新后的任务",
                "description": "任务已更新",
                "completed": False
            }
            response = requests.put(f"{BASE_URL}/api/todos/{todo_id}", json=update_data)
            print(f"状态码: {response.status_code}")
            print(f"响应: {response.json()}")
            
            # 7. 切换完成状态
            print(f"\n7. 切换完成状态 (ID: {todo_id})")
            response = requests.patch(f"{BASE_URL}/api/todos/{todo_id}/toggle")
            print(f"状态码: {response.status_code}")
            print(f"响应: {response.json()}")
            
            # 8. 过滤测试
            print("\n8. 测试过滤功能")
            for filter_type in ["all", "active", "completed"]:
                response = requests.get(f"{BASE_URL}/api/todos", params={"filter_type": filter_type})
                print(f"过滤器 {filter_type}: {response.status_code} - {len(response.json()['data'])} 项")
            
            # 9. 删除待办事项
            print(f"\n9. 删除待办事项 (ID: {todo_id})")
            response = requests.delete(f"{BASE_URL}/api/todos/{todo_id}")
            print(f"状态码: {response.status_code}")
            print(f"响应: {response.json()}")
        
        print("\n✅ API测试完成！")
        
    except requests.exceptions.ConnectionError:
        print("❌ 无法连接到服务器，请确保服务器已启动 (python run.py)")
    except Exception as e:
        print(f"❌ 测试过程中出现错误: {e}")

if __name__ == "__main__":
    test_api()