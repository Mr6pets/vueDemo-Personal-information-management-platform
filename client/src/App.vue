<template>
  <div id="app">
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Footer></Footer>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Loading from "./components/common/Loading";
//引入token解析模块
import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {
    NavBar,
    Landing,
    Footer,
    Loading
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  //当登录成功的时候，页面刷新后 store中的状态就变回原来的状态了
  //所以要在每次刷新页面的时候，执行一个created的钩子函数判断本地有没有点击登录时候存储下的token
  created() {
    //如果存在本地token，就解析这个token,同样。通过分发改变store中的授权和user信息
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);

      //处理token过期时间
      //获取当前的时间(/1000毫秒转化为秒)
      const currentTime = Date.now() / 1000;
      //检测token是否过期(如果decoded中的过期时间小于当前的时间)就表示过期了
      //例子：3点登陆 过期时间1个小时 就是4点过期 那么现在的时间是5点  当前时间大于过期时间 表示过期了
      if (decoded.exp < currentTime) {
        //如果过期了 那就清除请求头 清空登录信息 并且跳转登录页面
        // this.$store.dispatch("setIsAuthenticated", false);
        // this.$store.dispatch("setUser", {});

        //点击退出按钮一次性清除所有的信息
        this.$store.dispatch("clearCurrentState");

        this.$router.push("/login");
      } else {
        this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
        this.$store.dispatch("setUser", decoded);
      }
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value) === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
</style>
