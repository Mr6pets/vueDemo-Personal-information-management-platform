import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../components/Landing'
import Login from '../components/Login'
import Register from '../components/Register'
//实例化router
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkActiveClass: "active",
  // base: process.env.BASE_URL,
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: Landing },
    { path: "/Login", component: Login },
    { path: "/Register", component: Register }
  ]
})


