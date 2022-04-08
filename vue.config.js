module.exports = {
  // 关闭eslint校验
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        ws: true,
        changeOrigin: true
      }
    }
  }
}