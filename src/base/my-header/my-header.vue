<template lang="html">
  <div class="my-header" :style="getStyle">
    <slot></slot>
  </div>
</template>

<script type="ecmascript-6">
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getStyle() {
      return `position: ${this.fixed ? 'fixed' : 'block'}`
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.my-header
  height: 88px
  width: 100%
  top: 0
  left: 0
  background-color: #fff
</style>
