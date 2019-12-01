<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text">
        <i :class="icon"></i>
      </span>
    </div>
    <input
      :placeholder="placeholder"
      class="form-control form-control-lg"
      :value="value"
      :name="name"
      :class="{'is-invalid':errors}"
      @input="$emit('input',$event.target.value)"
    />
    <div v-if="errors" class="invalid-feedback">{{errors}}</div>
  </div>
</template>
<script>
export default {
  name: "inputgroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    placeholder: String,
    value: String,
    name: String,
    errors: String,
    icon: String
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>