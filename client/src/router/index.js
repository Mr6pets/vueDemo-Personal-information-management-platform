import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../components/Landing'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import CreateProfile from '../components/CreateProfile'
import Editprofile from '../components/Editprofile'
import AddExperience from '../components/AddExperience'
import AddEducation from '../components/AddEducation'
//实例化router
Vue.use(VueRouter)

const route = new VueRouter({
  mode: 'history',
  linkActiveClass: "active",
  // base: process.env.BASE_URL,
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: Landing },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/dashboard", component: Dashboard },
    { path: "/createprofile", component: CreateProfile },
    { path: "/editprofile", component: Editprofile },
    { path: "/addexperience", component: AddExperience },
    { path: "/Addeducation", component: AddEducation }
  ]
})
//全局守卫
route.beforeEach((to, from, next) => {
  //获取token
  const isLogin = localStorage.jwtToken ? true : false;
  //如果 访问以下三个 直接执行
  if (to.path == "/login" || to.path == "/register" || to.path == "/") {
    next();
  } else {
    //如果islogin 为真 那么就是登录状态 直接执行 如果是假 那就是未登录状态 那就让他到登录页面
    isLogin ? next() : next("/login");
  }
})

export default route;
