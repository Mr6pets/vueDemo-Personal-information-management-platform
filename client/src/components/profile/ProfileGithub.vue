<template>
  <div class="profileGithub">
    <hr />
    <h3 class="mb-4">Github仓库信息</h3>
    <div v-for="repo in repos" :key="repo.id" class="card card-body mb-2">
      <div class="row">
        <div class="col-md-6">
          <h4>
            <a :href="repo.html_url" class="text-info" target="_blank">{{repo.name}}</a>
          </h4>
          <p>{{repo.description}}</p>
        </div>
        <div class="col-md-6">
          <span class="badge badge-info mr-1">Stars: {{repo.stargazers_count}}</span>
          <span class="badge badge-secondary mr-1">Watchers: {{repo.watchers_count}}</span>
          <span class="badge badge-success">Forks: {{repo.forks_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "profileGithub",
  data() {
    return {
      clientId: "c782de3e5ca2b2ca1665",
      client_secret: "de571f490c09b5c7a8672ca50da915ba913281f2",
      count: 9, //0表示展示所有仓库
      sort: "created: desc", //升序
      repos: [] //存放仓库在这里
    };
  },
  props: {
    username: String
  },
  created() {
    // https://api.github.com/users/username/repos?per_page=count&sort=sort&client_id=clientId&client_secret=client_secret
    fetch(
      `https://api.github.com/users/${this.username}/repos?per_page=${this.count}&sort=${this.sort}&client_id=${this.clientId}&client_secret=${this.client_secret}`
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.repos = data;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }
};
</script>
<style scoped>
</style>