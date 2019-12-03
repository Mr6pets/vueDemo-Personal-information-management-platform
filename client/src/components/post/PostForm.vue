<template>
  <div class="post-form mb-3">
    <div class="card card-info">
      <div class="card-header bg-info text-white">留下你的想法</div>
      <div style="box-sizing:border-box; padding:10px 20px;">
        <form @submit.prevent="submit">
          <TextAreaGroup name="text" placeholder="留下你的想法" v-model="text" :error="errors.text" />
          <input type="submit" class="btn btn-dark" />
        </form>
      </div>
      <div class="card-body"></div>
    </div>
  </div>
</template>
<script>
import TextAreaGroup from "../common/TextAreaGroup";
export default {
  name: "postForm",
  data() {
    return {
      text: "",
      errors: {}
    };
  },
  methods: {
    submit() {
      //拿到store中的user的数据
      const user = this.$store.getters.user;
      const newPost = {
        text: this.text,
        name: user.name,
        avatar: user.avatar
      };
      //添加评论
      this.$axios
        .post("/api/posts", newPost)
        .then(res => {
          this.errors = {};
          this.text = "";
          //评论添加成功，回调父级的请求，实现实时更行
          this.$emit("update");
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  components: {
    TextAreaGroup
  }
};
</script>
<style scoped>
</style>