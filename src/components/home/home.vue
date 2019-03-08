<template lang="html">
  <div class="home">
    <my-header fixed class="my-header">
      <div class="mh-left">
        <div class="logo"></div>
      </div>
      <div class="mh-right">
        <div class="lang">English</div>
        <div class="user"><span class="iconfont">&#xe619;</span></div>
      </div>
    </my-header>
    <div class="main">
      <calendar @getHoliday="_getHoliday"></calendar>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import MyHeader from 'base/my-header/my-header'
import Calendar from 'vue-mobile-hotel-calendar'
import {
  getHoliday
} from 'api/calendar/calendar'
export default {
  components: {
    Calendar,
    MyHeader
  },
  methods: {
    _getHoliday(time, dayObj) {
      getHoliday(time).then((res) => {
        if (res) {
          dayObj.type = res.data === 0 ? 'normal' : res.data === 3 ? 'weekend' : 'holiday'
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~assets/css/mixin'
.my-header
  flex(row, center, space-between)
  .mh-left
    position: relative
    margin-left: 30px
    .logo
      background-image: url('~assets/img/logo.png')
      background-repeat: no-repeat
      background-size: contain
      width: 256px
      height: 50px
  .mh-right
    flex(row, center, space-between)
    width: 180px
    height: 57px
    margin-right: 30px
    .lang
      font-size: 30px
    .user
      .iconfont
        font-size: 36px
        color: #D70D19
.main
  margin-top: 88px
</style>
