<template>
  <div class="btn-group mb-4">
    <router-link to="/editprofile" class="btn btn-light">
      <i class="fas fa-user-circle text-info mr-1"></i>
      编辑个人信息
    </router-link>
    <router-link to="/addexperience" class="btn btn-light">
      <i class="fas fa-user-circle text-info mr-1"></i>
      添加个人经历
    </router-link>
    <router-link to="/addeducation" class="btn btn-light">
      <i class="fas fa-user-circle text-info mr-1"></i>
      添加教育经历
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
