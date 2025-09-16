// 启动脚本，用于抑制弃用警告
const { spawn } = require('child_process');
const path = require('path');

// 设置环境变量来抑制弃用警告
process.env.NODE_OPTIONS = '--no-deprecation --no-warnings';

// 启动开发服务器
const child = spawn('npx', ['craco', 'start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-deprecation --no-warnings'
  }
});

child.on('error', (error) => {
  console.error('启动失败:', error);
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`进程退出，代码: ${code}`);
  process.exit(code);
});
