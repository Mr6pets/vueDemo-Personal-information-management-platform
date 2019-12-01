<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Login</h1>
          <p class="lead text-center">Use Your Correct Account Login</p>
          <form @submit.prevent="submit" autocomplete="off" method="post">
            <!-- 组件化登录框邮箱部分 -->
            <TextFieldGroup
              type="email"
              placeholder="Email Address"
              name="email"
              v-model="user.email"
              :errors="errors.email"
            />
            <TextFieldGroup
              type="password"
              placeholder="Password"
              name="password"
              v-model="user.password"
              :errors="errors.password"
            />
            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引入token解析模块
import jwt_decode from "jwt-decode";
//引入组件
import TextFieldGroup from "./common/TextFiledGroup";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  components: {
    TextFieldGroup
  },
  methods: {
    submit() {
      // console.log(this.user);
      // 登录页面 点击开始请求登录的地址
      this.$axios
        .post("/api/users/login", this.user)
        .then(res => {
          // console.log(res.data);
          //{success: true, token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC…jUxfQ.eZMEkoBnVAJkA-5SN-7s2nQB3yRvgVGjlNgVCF49Yeo"}

          //将token存储到localstorage中
          //解构res.data中的token
          const { token } = res.data;
          //将token存储到本地的jewToken中
          window.localStorage.setItem("jwtToken", token);
          //同时要忘了做前端的is-valid的验证

          //解析本地的token
          const decoded = jwt_decode(token);
          // console.log(decoded); //{id: "5dde2a3cd74adee26645dc0e", name: "mutaitons", avatar: "//www.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=200&r=pg&d=mm", iat: 1574869416, exp: 1574873016}

          //当我登录成功后 分发action更改store中的state,改变state中isAuthenticated的授权状态是true
          //这里的思路是：写一个判断函数 拿到decoded的值有内容为true 没有内容为false的函数
          this.$store.dispatch("setIsAuthenticated", !this.isEmpty(decoded));
          this.$store.dispatch("setUser", decoded);

          // 页面跳转
          this.$router.push("/dashboard");
        })
        .catch(err => {
          //如果有报错信息，就把报错信息赋值给errors
          if (err.response.data) {
            this.errors = err.response.data;
          }
        });
    },
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
<style scoped>
</style>