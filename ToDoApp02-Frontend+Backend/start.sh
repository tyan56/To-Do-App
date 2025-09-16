#!/bin/bash

echo "========================================"
echo "    Todo App 启动脚本"
echo "========================================"
echo

echo "正在启动后端服务..."
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "等待后端服务启动..."
sleep 5

echo "正在启动前端服务..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo
echo "========================================"
echo "服务启动完成！"
echo "后端API: http://localhost:8000"
echo "前端应用: http://localhost:3000"
echo "API文档: http://localhost:8000/docs"
echo "========================================"
echo

# 等待用户中断
trap "echo '正在停止服务...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait

