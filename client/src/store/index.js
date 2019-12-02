import Vue from 'vue'
import Vuex from 'vuex'
//导入 所有内容 以getters为别名 从本文件夹下的getters.js文件中
import * as getters from "./getters"
import * as mutations from "./mutations"
import * as actions from "./actions"

//使用vuex
Vue.use(Vuex)

//管理的状态
const state = {
  isAuthenticated: false,//是否认证成功，是否可以请求我们的页面
  user: {},//存储用户信息
  profile: {},//存储用户个人信息
  loading: false,
  profiles: []//存储开发者数据
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
