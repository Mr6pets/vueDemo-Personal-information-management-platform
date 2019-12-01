<template>
  <div class="form-group">
    <select
      class="form-control form-control-lg"
      :name="name"
      :value="value"
      :class="{'is-invalid':errors}"
      @input="$emit('input',$event.target.value)"
    >
      <option v-for="(option,index) in options" :key="index" :value="option.value">{{option.value}}</option>
    </select>
    <div v-if="errors" class="invalid-feedback">{{errors}}</div>
    <small v-if="info" class="form-text text-muted">{{info}}</small>
  </div>
</template>
<script>
export default {
  name: "textfiledgroup",
  props: {
    value: String,
    name: String,
    errors: String,
    info: String,
    disabled: String,
    options: Array
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>