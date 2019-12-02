<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <a class="btn btn-light mb-3 float-left" @click.prevent="$router.go(-1)">返回个人信息</a>
        </div>
      </div>
      <ProfileHeader v-if="profile" :profile="profile" />
      <ProfileAbout v-if="profile" :profile="profile" />
      <ProfileCreds
        v-if="profile &&(profile.education||profile.experience)"
        :education="profile.education"
        :experience="profile.experience"
      />
      <ProfileGithub v-if="profile && profile.githubusername" :username="profile.githubusername" />
    </div>
  </div>
</template>
<script>
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
export default {
  name: "profile",
  data() {
    return {
      profile: ""
    };
  },
  components: {
    ProfileHeader,
    ProfileAbout,
    ProfileCreds,
    ProfileGithub
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 参数：通过to.params.handle拿到数据
      vm.getProfileByHandle(to.params.handle);
    });
  },
  methods: {
    getProfileByHandle(handle) {
      this.$axios
        .get(`/api/profile/handle/${handle}`)
        .then(res => {
          this.profile = res.data;
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