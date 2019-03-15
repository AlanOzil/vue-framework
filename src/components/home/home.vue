<template lang="html">
  <div class="home">
    <slide-panel ref="slidePanel" :autoClose="false"></slide-panel>
  </div>
</template>

<script type="ecmascript-6">
import SlidePanel from 'base/mobile-slide/slide-panel'
export default {
  components: {
    SlidePanel
  },
  mounted() {
    this.$refs.slidePanel.showSlide()
  },
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~assets/css/mixin'

</style>
