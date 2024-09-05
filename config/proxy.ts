// export default {
//     '/api': {
//       target: 'http://sgin-shop.biggerforum.org', //目标服务器地址
//       changeOrigin: true,
//     },
//     '/public': {
//       target: 'http://sgin-shop.biggerforum.org', //目标服务器地址
//       changeOrigin: true,
//     },
// };
  
export default {
  '/api': {
    target: 'http://localhost:8081', //目标服务器地址
    changeOrigin: true,
  },
  '/public': {
    target: 'http://localhost:8081', //目标服务器地址
    changeOrigin: true,
  },
};
