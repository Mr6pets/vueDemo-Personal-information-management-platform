<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Login</h1>
          <p class="lead text-center">Use Your Correct Account Login</p>
          <form @submit.prevent="submit" autocomplete="off" method="post">
            <div class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email Address"
                name="email"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                name="password"
                v-model="user.password"
              />
            </div>
            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
  methods: {
    submit() {
      // console.log(this.user.email);
      this.$axios
        .post("/api/users/login", this.user)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }
  }
};
</script>
<style scoped>
</style>