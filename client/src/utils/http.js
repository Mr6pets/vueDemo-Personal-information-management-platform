//请求的JS文件
import axios from 'axios';
import store from "../store"

//请求拦截，设置统一的header
axios.interceptors.request.use(config => {
  // 当我开始请求的时候显示loading 这里的store分发写法是因为引入了store下index.js文件 可以直接store
  store.dispatch("setLoading", true)
  //如果本地的localStorage中有token值那么config的请求头就带上一个许可为token值
  if (localStorage.jwtToken) {
    config.headers.Authorization = localStorage.jwtToken;
  }
  return config;
})

//响应拦截，设置统一的header
axios.interceptors.response.use(
  response => {
    // 当我开始请求的时候显示loading
    store.dispatch("setLoading", false)
    return response;
  },
  error => {
    store.dispatch("setLoading", false)
  }
)

//暴露出去让所有的组件都可以使用axios的请求
export default axios;