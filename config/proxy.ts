export default {
    '/api': {
      target: 'http://127.0.0.1:8081/', //目标服务器地址
      changeOrigin: true,
    },
    '/public': {
      target: 'http://127.0.0.1:8081/', //目标服务器地址
      changeOrigin: true,
    },
};
  