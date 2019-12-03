<template>
  <div class="postFeed">
    <div class="posts">
      <!-- Post Item -->
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-2">
            <a href="profile.html">
              <img style="width:100px" class="rounded-circle d-nonse d-md-block" :src="post.avatar" />
            </a>
            <br />
            <p class="text-center">{{post.name}}</p>
          </div>
          <div class="col-md-10">
            <p class="lead">{{post.text}}</p>
            <span>
              <button type="button" @click="likeClick(post._id)" class="btn btn-light mr-1">
                <i class="text-info fas fa-thumbs-up"></i>
                <span class="badge badge-light">{{post.likes.length}}</span>
              </button>
              <button type="button" @click="unlikeClick(post._id)" class="btn btn-light mr-1">
                <i class="text-secondary fas fa-thumbs-down"></i>
              </button>
              <router-link :to="'/post/'+post._id" class="btn btn-info mr-1">鼓励留言</router-link>
              <button
                @click="deleteCur(post._id)"
                v-if="user!=null && user.id==post.user"
                type="button"
                class="btn btn-danger mr-1"
              >
                <i class="fas fa-times" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "postFeed",
  props: {
    post: Object
  },
  computed: {
    //获取到当前状态的登录用户
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    //删除当前的评论
    deleteCur(id) {
      this.$axios
        .delete(`/api/posts/${id}`)
        .then(res => {
          this.$emit("update");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    likeClick(id) {
      this.$axios
        .post(`/api/posts/like/${id}`)
        .then(res => {
          this.$emit("update");
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    unlikeClick(id) {
      this.$axios
        .post(`/api/posts/unlike/${id}`)
        .then(res => {
          this.$emit("update");
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