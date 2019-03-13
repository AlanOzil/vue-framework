<template lang="html">
  <div class="slide-container" :style="containerStyle">
    <transition name="slide">
      <div class="slide-wrapper" v-if="show" :style="wrapperStyle">
        <div class="slide-mask" @click="hideSlide" ref="slideMask"></div>
        <div class="slide-main" ref="slideMain">
          <div class="sm-header" ref="slideHeader">
            <slot name="header"></slot>
          </div>
          <div class="sm-main" ref="smMain">
            <slot name="main"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="ecmascript-6">
export default {
  data() {
    return {
      screenHeight: 0,
      show: false,
      zIndex: -1
    }
  },
  props: {
    maxHeight: {
      type: String,
      default: '0.5'
    },
    background: {
      type: String,
      default: 'rgba(0,0,0,0.1)'
    }
  },
  computed: {
    containerStyle() {
      return `height: ${this.screenHeight}px; z-index: ${this.zIndex};`
    },
    wrapperStyle() {
      return `height: ${this.screenHeight}px; z-index: ${this.zIndex};background: ${this.background}`
    }
  },
  mounted() {
    this.screenHeight = window.screen.height
  },
  methods: {
    showSlide() {
      this.show = true
      this.zIndex = 9
      this._setHeight()
    },
    hideSlide() {
      this.show = false
      this.zIndex = -1
      this.$emit('hide')
    },
    _setHeight() {
      this.$nextTick(() => {
        let slideHeight = this.$refs.slideMain.clientHeight
        if (slideHeight > this.screenHeight * parseFloat(this.maxHeight)) {
          this.$refs.slideMask.style.height = this.screenHeight - this.screenHeight * parseFloat(this.maxHeight) + 'px'
        } else {
          this.$refs.slideMask.style.height = this.screenHeight - slideHeight + 'px'
        }

        this.$refs.smMain.style.height = this.screenHeight - this.$refs.slideMask.clientHeight - this.$refs.slideHeader.clientHeight + 'px'
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.slide-container
  position: absolute
  top: 0
  z-index: -1
  width: 100%
  overflow: hidden
  .slide-wrapper
    width: 100%
    .slide-main
      background-color: #fff
      border-top-left-radius: 16px
      border-top-right-radius: 16px
      position: relative
      box-shadow: 1px -1px 20px 0px #ababab
      .sm-header
        font-size: 14px
        height: 40px
        line-height: 40px
        color: #666
      .sm-main
        overflow: auto

.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(0, 100%, 0)
</style>
