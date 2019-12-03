<template>
  <div class="post">
    <div class="feed">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!-- 评论表单 -->
            <PostForm @update="getPosts" />
            <!-- 展示评论内容 -->
            <PostFeed v-for="(post,index) in posts" :key="index" :post="post" @update="getPosts"></PostFeed>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
export default {
  name: "post",
  data() {
    return {
      posts: [],
      errors: {}
    };
  },
  //进入这个路由执行数据请求
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPosts();
    });
  },
  methods: {
    getPosts() {
      this.$axios
        .get("/api/posts")
        .then(res => {
          this.posts = res.data;
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  },
  components: {
    PostForm,
    PostFeed
  }
};
</script>
<style scoped>
</style>