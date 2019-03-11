<template lang="html">
  <div class="home">
    <div class="cal-trigger" @click="editDate">
      <div class="cal-result">
        <div class="start-date">
          <span class="date-time">{{getSelectedDate(startDate)}}</span>
          <span class="date-days">今天</span>
        </div>
        <div class="blank">
          —
        </div>
        <div class="end-date">
          <span class="date-time">{{getSelectedDate(endDate)}}</span>
          <span class="date-days">明天</span>
        </div>
      </div>
      <div class="cal-total" v-if="dayGap">
        共{{dayGap}}晚
      </div>
    </div>
    <calendar @getHoliday="_getHoliday" @change="getCal" v-if="calendarVisible" ref="calendar"></calendar>
  </div>
</template>

<script type="ecmascript-6">
import Calendar from 'base/calendar/calendar'
import {
  getHoliday
} from 'api/calendar/calendar'
import {
  dateFtt
} from '@/utils/date.js'
export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      dayGap: 1,
      calendarVisible: false
    }
  },
  components: {
    Calendar
  },
  mounted() {
    let now = new Date()
    this.getCal(now, new Date(`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate() + 1}`), 1)
  },
  methods: {
    editDate() {
      this.calendarVisible = true
      this.$nextTick(() => {
        this.$refs.calendar.editDate()
      })
    },
    getCal(startDate, endDate, dayGap) {
      this.startDate = startDate
      this.endDate = endDate
      this.dayGap = dayGap
    },
    getSelectedDate(date) {
      return dateFtt('MM月dd日', date)
    },
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
.cal-trigger
  flex(row, center, space-between)
  // padding: 0 15px
  height: 30px
  padding: 5px 15px
  .cal-result
    flex(row, center, space-around)
    .date-time
      font-size: 14px
    .date-days
      font-size: 12px
      color:rgba(153,153,153,0.7)
    .blank
      margin: 0 12px
  .cal-total
    font-size:12px
    color:rgba(153,153,153,1)
</style>
