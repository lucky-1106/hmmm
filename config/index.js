module.exports = {
  dev: {
    proxyTable: {
      '/api': {
        // 需要代理的接口
        target: 'http://159.75.11.233/heimamm/public', // 目标服务器
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 重定向
        }
      }
    }
  }
}
