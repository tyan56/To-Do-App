module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // 解决webpack-dev-server弃用警告
      if (env === 'development') {
        // 移除弃用的配置选项
        if (webpackConfig.devServer) {
          delete webpackConfig.devServer.onAfterSetupMiddleware;
          delete webpackConfig.devServer.onBeforeSetupMiddleware;
        }
      }
      
      return webpackConfig;
    },
  },
};
