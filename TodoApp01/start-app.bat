@echo off
echo ========================================
echo     待办事项管理系统启动脚本
echo ========================================
echo.

echo 1. 启动后端API服务器...
cd /d "%~dp0backend"
start "后端API服务" cmd /k "python run.py"
echo    后端服务启动中... (http://localhost:8000)
echo.

echo 2. 等待后端服务启动...
timeout /t 5 /nobreak > nul
echo.

echo 3. 启动前端React应用...
cd /d "%~dp0front"
start "前端React应用" cmd /k "npm start"
echo    前端应用启动中... (http://localhost:3000)
echo.

echo ========================================
echo 服务启动完成！
echo.
echo 前端应用: http://localhost:3000
echo API文档:  http://localhost:8000/docs
echo API健康:  http://localhost:8000/health
echo.
echo 按任意键关闭此窗口...
pause > nul