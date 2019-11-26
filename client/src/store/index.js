import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)

//管理的状态
const state = {
  isAuthenticated: false,//是否认证成功，是否可以请求我们的页面
  user: {}
}

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
