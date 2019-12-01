<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">仪表盘</h1>
          <p v-if="user!=null" class="lead text-muted">welcome {{user.name}}</p>
          <h4 v-if="profile!=null">显示数据:{{profile.location}}</h4>
          <div v-else>
            <p>目前还没有相关的数据，请添加个人信息</p>
            <router-link class="btn btn-lg btn-info" to="/createprofile">添加个人信息</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  data() {
    return {
      profile: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getProfileData() {
      this.$axios
        .get("/api/profile")
        .then(res => {
          console.log(res.data);
          //赋值
          // this.profile = res.data;

          //更新store中的profile状态
          this.$store.dispatch("setProfile", res.data);
          this.profile = res.data;
        })

        .catch(err => {
          // console.log(err.response.data);
          this.$store.dispatch("setProfile", null);
        });
    }
  },
  //钩子函数需要手动刷新添加的数据
  created() {
    // this.getProfileData();
  },
  //这里选择导航守卫，beforeRouteEnter,好处是每次进入这个路由都会执行这个方法，这样可以做到添加的数据实时更新
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getProfileData();
    });
  }
};
</script>
<style scoped>
</style>