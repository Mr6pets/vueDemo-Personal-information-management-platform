import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'

//axios 全局化
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
