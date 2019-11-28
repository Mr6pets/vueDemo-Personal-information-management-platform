<template>
  <div>
    <div class="register">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <h1 class="display-4 text-center">Sign Up</h1>
            <p class="lead text-center">Create your DevConnector account</p>
            <form @submit.prevent="submit" autocomplete="off">
              <!-- 组件化的用户名 -->
              <TextFieldGroup
                type="text"
                placeholder="Name"
                name="name"
                v-model="newUser.name"
                :errors="errors.name"
              />
              <!-- 组件化的邮箱 -->
              <TextFieldGroup
                type="email"
                placeholder="Email Address"
                name="email"
                v-model="newUser.email"
                :errors="errors.email"
                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
              />
              <!-- 组件化的密码 -->
              <TextFieldGroup
                type="password"
                placeholder="Password"
                name="Password"
                v-model="newUser.password"
                :errors="errors.password"
              />
              <!-- 组件化的确认密码 -->
              <TextFieldGroup
                type="password"
                placeholder="Confirm Password"
                name="password2"
                v-model="newUser.password2"
                :errors="errors.password2"
              />
              <input type="submit" class="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextFieldGroup from "./common/TextFiledGroup";
export default {
  name: "Register",
  components: {
    TextFieldGroup
  },
  data() {
    return {
      newUser: {
        name: "",
        email: "",
        password: "",
        password2: ""
      },
      errors: ""
    };
  },
  methods: {
    submit() {
      // console.log(this.newUser);
      // console.log(this.$store.getters.isAuthenticated);// 获取到getters中的授权
      //拿到页面上所有的注册信息 通过axios请求到后台
      this.$axios
        .post("/api/users/register", this.newUser)
        .then(res => {
          // console.log(res.data);
          //当我请求成功的时候执行mutations 操作的分发
          //执行操作到mutation中，执行mutaitons中的setUser方法 然后将res.data的前端传递过去
          // this.$store.commit("setUser", res.data);

          //执行action异步中操作
          //执行actions中的分发操作setUser,并且带上注册的值
          this.$store.dispatch("setUser", res.data);
          //页面跳转到成功的地址
          this.$router.push("/login");
        })
        .catch(err => {
          if (errors.response.data) {
            this.errors = err.response.data;
          }
          // console.log(this.errors);
        });
    }
  }
};
</script>
<style scoped>
</style>