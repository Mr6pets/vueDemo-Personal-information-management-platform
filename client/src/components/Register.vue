<template>
  <div>
    <div class="register">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
            <h1 class="display-4 text-center">Sign Up</h1>
            <p class="lead text-center">Create your DevConnector account</p>
            <form @submit.prevent="submit" autocomplete="off">
              <div class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  required
                  v-model="newUser.name"
                  :class="{'is-invalid':errors.name}"
                />
                <div v-if="errors.name" class="invalid-feedback">{{errors.name}}</div>
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  v-model="newUser.email"
                  :class="{'is-invalid':errors.email}"
                />
                <div v-if="errors.email" class="invalid-feedback">{{errors.email}}</div>
                <small
                  class="form-text text-muted"
                >This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  v-model="newUser.password"
                  :class="{'is-invalid':errors.password}"
                />
                <div v-if="errors.password" class="invalid-feedback">{{errors.password}}</div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  v-model="newUser.password2"
                  :class="{'is-invalid':errors.password2}"
                />
                <div v-if="errors.password2" class="invalid-feedback">{{errors.password2}}</div>
              </div>
              <input type="submit" class="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
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