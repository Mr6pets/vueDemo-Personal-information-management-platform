//请求的JS文件
import axios from 'axios';

//请求拦截，设置统一的header
axios.interceptors.request.use(config => {
  //如果本地的localStorage中有token值那么config的请求头就带上一个许可为token值
  if (localStorage.jwtToken) {
    config.headers.Authorization = localStorage.jwtToken;
  }
  return config;
})
//暴露出去让所有的组件都可以使用axios的请求
export default axios;