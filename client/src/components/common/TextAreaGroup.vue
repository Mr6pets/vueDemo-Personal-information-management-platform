<template>
  <div class="form-group">
    <textarea
      class="form-control form-control-lg"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      :class="{'is-invalid':errors}"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="errors" class="invalid-feedback">{{errors}}</div>
    <small v-if="info" class="form-text text-muted">{{info}}</small>
  </div>
</template>
<script>
export default {
  name: "textfiledgroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value: String,
    name: String,
    errors: String,
    info: String,
    disabled: String
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>