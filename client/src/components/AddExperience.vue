<template>
  <div class="section add-experience">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a class="btn btn-light" @click.prevent="$router.go(-1)">返回</a>
          <h1 class="display-4 text-center">添加个人经历</h1>
          <p class="lead text-center">有关于工作的任何经验</p>
          <small class="d-block pb-3">* 为必填项</small>
          <form @submit.prevent="submit">
            <TextFieldGroup
              type="text"
              name="title"
              placeholder="工作内容"
              v-model="msgInfo.title"
              :errors="errors.title"
            ></TextFieldGroup>
            <TextFieldGroup
              type="text"
              name="company"
              placeholder="* 公司"
              v-model="msgInfo.company"
              :error="errors.company"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="location"
              placeholder="地点"
              v-model="msgInfo.location"
              :error="errors.location"
            ></TextFieldGroup>

            <h6>开始时间</h6>
            <TextFieldGroup type="date" name="from" v-model="msgInfo.from" :error="errors.from"></TextFieldGroup>

            <h6>结束时间</h6>
            <TextFieldGroup
              type="date"
              name="to"
              v-model="msgInfo.to"
              :error="errors.to"
              :disabled="msgInfo.current"
            ></TextFieldGroup>

            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                name="current"
                v-model="msgInfo.current"
                id="current"
              />
              <label class="form-check-label" for="current">当前在职</label>
            </div>
            <TextAreaGroup
              placeholder="工作描述"
              name="description"
              v-model="msgInfo.description"
              :error="errors.description"
              info="其他工作职责等"
            ></TextAreaGroup>
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
export default {
  name: "addexperience",
  data() {
    return {
      msgInfo: {
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
      },
      errors: {}
    };
  },
  components: {
    TextFieldGroup,
    TextAreaGroup
  },
  methods: {
    submit() {
      //当在我提交之前，入股disabled是被点击的时间to定义为在职
      if (this.msgInfo.current) {
        this.msgInfo.to = "在职";
      }
      this.$axios
        .post("/api/profile/experience", this.msgInfo)
        .then(res => {
          this.errors = {};
          this.msgInfo.to = "在职";
          this.$router.push("/dashboard");
        })
        .catch(err => {
          if (err.response.data) {
            this.errors = errors.response.data;
          }
        });
    }
  }
};
</script>
<style scoped>
</style>