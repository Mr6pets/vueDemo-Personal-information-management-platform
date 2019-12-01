<template>
  <div class="section add-education">
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
              name="school"
              placeholder="* 学校或培训"
              v-model="msgInfo.school"
              :error="errors.school"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="degree"
              placeholder="* 学历"
              v-model="msgInfo.degree"
              :error="errors.degree"
            ></TextFieldGroup>

            <TextFieldGroup
              type="text"
              name="fieldofstudy"
              placeholder="专业"
              v-model="msgInfo.fieldofstudy"
              :error="errors.fieldofstudy"
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
              <label class="form-check-label" for="current">当前在校</label>
            </div>

            <TextAreaGroup
              placeholder="在校表现"
              name="description"
              v-model="msgInfo.description"
              :error="errors.description"
              info="说说你在学习过程的经历"
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
  name: "addeducation",
  data() {
    return {
      msgInfo: {
        scholl: "",
        degree: "",
        fieldofstudy: "",
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
      //当在我提交之前，入股disabled是被点击的时间to定义为在校
      if (this.msgInfo.current) {
        this.msgInfo.to = "在校";
      }
      this.$axios
        .post("/api/profile/education", this.msgInfo)
        .then(res => {
          this.errors = {};
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