<template>
  <div class="experience">
    <h4 class="mb-2">个人履历</h4>
    <table class="table">
      <thead>
        <tr>
          <th>公司</th>
          <th>职位</th>
          <th>年份</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in experience" :key="index">
          <td>{{item.company}}</td>
          <td>{{item.title}}</td>
          <td>{{item.from}} ~ {{item.to}}</td>
          <td>
            <button @click="deleteExperience(item._id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "experience",
  data() {
    return {};
  },
  props: {
    experience: Array
  },
  methods: {
    deleteExperience(id) {
      //子组件不建议这里操作父组件传递过来的数据
      // this.$axios
      //   .delete(`/api/profile/experience/${id}`)
      //   .then(res => {
      //     this.experience=res.data.experience
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      // 通过$emit 传递方法才是正确的步骤
      this.$emit("deleteExperience", id);
    }
  }
};
</script>

<style scoped>
</style>
