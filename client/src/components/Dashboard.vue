<template>
  <div class="dashboard">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4">仪表盘</h1>
          <p v-if="user!=null" class="lead text-muted">welcome {{user.name}}</p>
          <div v-if="profile!=null">
            <!-- 编辑个人信息&添加个人经历&添加教育经历 -->
            <ProfileActived></ProfileActived>
            <!-- 个人履历 -->
            <Experience :experience="profile.experience" @deleteExperience="deleteExp" />
            <!-- 教育经历 -->
            <Education :education="profile.education" @deleteEducation="deleteEdu" />
            <!-- 删除账户按钮 -->
            <div>
              <button class="btn btn-danger" @click="deleteClick">删除当前账户</button>
            </div>
          </div>
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
import ProfileActived from "./common/ProfileActived";
import AddExperience from "./AddExperience";
import Experience from "./common/Experience";
import Education from "./common/Education";
export default {
  name: "dashboard",
  data() {
    return {
      profile: []
    };
  },
  components: {
    ProfileActived,
    AddExperience,
    Experience,
    Education
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
          // console.log(res.data);
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
    },
    deleteClick() {
      this.$axios
        .delete("/api/profile")
        .then(res => {
          this.profile = null;
          this.$store.dispatch("clearCurrentState");
          this.$router.push("/login");
        })
        .catch(err => console.log(err));
    },
    // 子组件传递过来的方法
    deleteExp(id) {
      this.$axios
        .delete(`/api/profile/experience/${id}`)
        .then(res => {
          this.profile = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteEdu(id) {
      this.$axios
        .delete(`/api/profile/education/${id}`)
        .then(res => {
          this.profile = res.data;
        })
        .catch(err => {
          console.log(err);
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