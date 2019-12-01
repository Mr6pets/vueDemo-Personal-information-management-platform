<template>
  <div class="education">
    <h4 class="mb-2">教育经历</h4>
    <table class="table">
      <thead>
        <tr>
          <th>学校</th>
          <th>学历</th>
          <th>年份</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in education" :key="index">
          <td>{{item.school}}</td>
          <td>{{item.degree}}</td>
          <td>{{item.from}} ~ {{item.to}}</td>
          <td>
            <button @click="deleteEducation(item._id)" class="btn btn-danger">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "education",
  data() {
    return {};
  },
  props: {
    education: Array
  },
  methods: {
    deleteEducation(id) {
      this.$emit("deleteEducation", id);
    }
  }
};
</script>

<style scoped>
</style>
