<template>
  <div class="create-profile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
          <h1 class="display-4 text-center">创建个人资料</h1>
          <p class="lead text-center">填写您的个人资料，让我们了解你</p>
          <small class="d-block pb-3">* 表示必填项</small>
          <form @submit.prevent="submit">
            <TextFieldGroup
              type="text"
              placeholder=" pro handle"
              v-model="msgInfo.handle"
              name="handle"
              info="此处的handle是在后端接口中需要用来查询数据 通常写你email的名字"
              :errors="errors.handle"
            />
            <SelectGroup
              name="status"
              :errors="errors.status"
              v-model="msgInfo.status"
              :options="options"
              info="请告知您目前从事的职业"
            />
            <TextFieldGroup
              type="text"
              name="company"
              placeholder="公司"
              v-model="msgInfo.company"
              :errors="errors.company"
              info="可以是你自己的公司或者是你的在职公司"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="website"
              placeholder="网址"
              v-model="msgInfo.website"
              :errors="errors.website"
              info="你公司网址或者是你在职公司网址"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="location"
              placeholder="位置"
              v-model="msgInfo.location"
              :errors="errors.location"
              info="你所在的城市及所在区 (例如. 北京市昌平区)"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="skills"
              placeholder="* 编程语言技能"
              v-model="msgInfo.skills"
              :errors="errors.skills"
              info="请使用逗号隔开你所掌握的语言 (例如: HTML,CSS,JavaScript,PHP)"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="githubusername"
              placeholder="Github 用户名"
              v-model="msgInfo.githubusername"
              :errors="errors.githubusername"
              info="如果你希望将你的项目分享给大家, 可以填写你的github用户名"
            ></TextFieldGroup>
            <TextAreaGroup
              placeholder="自我介绍"
              name="bio"
              v-model="msgInfo.bio"
              :errors="errors.bio"
              info="简单介绍一下自己"
            ></TextAreaGroup>
            <div class="mb-3">
              <button class="btn btn-light" @click="displaySocialInput=!displaySocialInput">添加社交账号</button>
              <span class="text-muted">选项</span>
            </div>
            <div v-show="displaySocialInput">
              <InputGroup
                placeholder="微信公众号"
                name="wechat"
                v-model="msgInfo.wechat"
                :errors="errors.weichat"
                icon="fab fa-weixin"
              ></InputGroup>

              <InputGroup
                placeholder="QQ"
                name="QQ"
                v-model="msgInfo.QQ"
                :errors="errors.QQ"
                icon="fab fa-qq"
              ></InputGroup>

              <InputGroup
                placeholder="腾讯课堂网址"
                name="tengxunkt"
                v-model="msgInfo.tengxunkt"
                :errors="errors.tengxunkt"
                icon="fab fa-wechat"
              ></InputGroup>

              <InputGroup
                placeholder="网易课堂网址"
                name="wangyikt"
                v-model="msgInfo.wangyikt"
                :errors="errors.wangyikt"
                icon="fab fa-wechat"
              ></InputGroup>
            </div>
            <input type="submit" class="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextFieldGroup from "./common/TextFiledGroup";
import TextAreaGroup from "./common/TextAreaGroup";
import SelectGroup from "./common/SelectGroup";
import InputGroup from "./common/InputGroup";
export default {
  name: "createProfile",
  data() {
    return {
      msgInfo: {
        handle: "",
        company: "",
        website: "",
        location: "",
        status: "请选择您的职业",
        skills: "",
        githubusername: "",
        bio: "",
        wechat: "",
        QQ: "",
        tengxunkt: "",
        wangyikt: ""
      },
      errors: {},
      options: [
        { label: "0", value: "请选择您的职业" },
        { label: "Junior Developer", value: "前端初级工程师" },
        { label: "Senior Developer", value: "前端中级工程师" },
        { label: "HighDeveloper", value: "前端高级工程师" },
        { label: "Manager", value: "前端管理" },
        { label: "backend Developer", value: "后端开发" },
        { label: "Python machine learning", value: "Python机器学习" },
        { label: "Other", value: "其他" }
      ],
      displaySocialInput: false
    };
  },
  components: {
    TextFieldGroup,
    TextAreaGroup,
    SelectGroup,
    InputGroup
  },
  methods: {
    submit() {
      this.$axios
        .post("/api/profile", this.msgInfo)
        .then(res => {
          this.$store.dispatch("setProfile", res.data);
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.errors = err.response.data;
        });
    }
  }
};
</script>
<style scoped>
</style>


