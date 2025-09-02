@echo off
echo ========================================
echo Todo Application Backend Startup Script
echo ========================================

echo.
echo Checking Java installation...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking Maven installation...
mvn -version
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Cleaning and compiling project...
mvn clean compile
if %errorlevel% neq 0 (
    echo ERROR: Compilation failed
    pause
    exit /b 1
)

echo.
echo Running tests...
mvn test
if %errorlevel% neq 0 (
    echo WARNING: Some tests failed, but continuing with startup...
)

echo.
echo Starting Todo Application Backend...
echo Application will be available at: http://localhost:8000
echo Swagger UI will be available at: http://localhost:8000/swagger-ui.html
echo.
echo Press Ctrl+C to stop the application
echo.

mvn spring-boot:run -Dspring-boot.run.profiles=dev

pause
