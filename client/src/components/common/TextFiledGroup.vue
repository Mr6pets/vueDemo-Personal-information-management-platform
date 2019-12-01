<template>
  <div class="form-group">
    <!-- 说明 对于一个带有v-modul的组件 第一：接收一个 value 第二：pro触发 input 事件，并传入新值 -->
    <!-- 利用 $emit 触发 input 事件： -->
    <!-- @input="$emit('input',$event.target.value)：说明：绑定一个input事件 通过$emit触发 input事件并且带值 -->
    <input
      :type="type"
      class="form-control form-control-lg"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      :disabled="disabled"
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
    name: String,
    value: String,
    errors: String,
    info: String,
    disabled: Boolean
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
</style>