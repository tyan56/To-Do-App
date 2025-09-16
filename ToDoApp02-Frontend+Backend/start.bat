@echo off
echo ========================================
echo    Todo App 启动脚本
echo ========================================
echo.

echo 正在启动后端服务...
cd backend
start "Todo Backend" cmd /k "pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo 等待后端服务启动...
timeout /t 5 /nobreak > nul

echo 正在启动前端服务...
cd ..\frontend
start "Todo Frontend" cmd /k "npm install && npm start"

echo.
echo ========================================
echo 服务启动完成！
echo 后端API: http://localhost:8000
echo 前端应用: http://localhost:3000
echo API文档: http://localhost:8000/docs
echo ========================================
echo.
pause

