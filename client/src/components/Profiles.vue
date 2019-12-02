<template>
  <div class="profiles">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="display-4 text-center">开发者们</h1>
          <p class="lead text-center">hello world</p>
          <!-- 开发者的显示区域  v-if="profiles.length>0"-->
          <ProfileItem
            v-for="(profileItem,index) in profiles"
            :key="index"
            :profileItem="profileItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileItem from "./common/ProfileItem";
export default {
  name: "profiles",
  data() {
    return {
      profiles: []
    };
  },
  //获取所有开发人员的信息
  created() {
    this.getProfiles();
  },
  methods: {
    getProfiles() {
      this.$axios
        .get("/api/profile/all")
        .then(res => {
          console.log(res.data);
          //将从后台请求来的开发人员的数据分发到vuex中
          this.$store.dispatch("setProfiles", res.data);
          this.profiles = res.data;
        })
        .catch(err => {
          this.$store.dispatch("setProfiles", []);
          this.profiles = [];
        });
    }
  },
  components: {
    ProfileItem
  }
};
</script>
<style scoped>
</style>