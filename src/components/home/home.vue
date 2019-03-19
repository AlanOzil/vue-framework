<template lang="html">
  <!-- <div class="home"> -->
    <div class="scroll-list-wrap" slot="demo" ref="listWrap">
      <scroll ref="scroll"
              :data="items"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp"
              @click="clickItem"
      >
      <ul>
        <li class="list-item" v-for="(item, index) in items" :key="index">{{item}}</li>
      </ul>
      </scroll>
    </div>
  <!-- </div> -->
</template>

<script type="ecmascript-6">
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      items: ['hahahahaha', 'hahahahaha', 'hahahahaha', 'hahahahaha']
    }
  },
  components: {
    Scroll
  },
  watch: {
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullDown()
        } else {
          scroll.closePullDown()
        }
      },
      deep: true
    },
    pullUpLoadObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullUp()
        } else {
          scroll.closePullUp()
        }
      },
      deep: true
    },
    startY() {
      this.rebuildScroll()
    }
  },
  computed: {
    scrollbarObj: () => {
      return {
        fade: true
      }
    },
    pullDownRefreshObj: () => {
      return {
        threshold: 90,
        stop: 40
      }
    },
    pullUpLoadObj: function() {
      return {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      }
    }
  },
  mounted() {
    this.$refs.listWrap.style.height = document.documentElement.clientHeight + 'px'
  },
  methods: {
    autoPullDownRefresh() {
      this.$refs.scroll.autoPullDownRefresh()
    },
    onPullingDown() {
      // 模拟更新数据
      console.log('pulling down and load data')
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        if (Math.random() > 0.5) {
          // 如果有新数据
          // this.items = [...this.items, ...this.items]
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 2000)
    },
    onPullingUp() {
      // 更新数据
      console.log('pulling up and load data')
      setTimeout(() => {
        if (this._isDestroyed) {
          return
        }
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items = [...this.items, ...this.items]
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1500)
    },
    clickItem() {
      // this.$router.back()
    },
    rebuildScroll() {
      this.$nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.list-item
  width: 100%
  height: 60px
  line-height: 60px
  text-align: center
  font-size: 35px

.scroll-list-wrap
  position relative
  transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
  overflow: hidden
</style>
