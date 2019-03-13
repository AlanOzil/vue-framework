<template lang="html">
  <div class="home">
    <div class="lang" @click="showDropdown">{{dropdownValue}}</div>
    <dropdown multiple ref="dropdown" v-if="dropdownVisible" :data="lang" @change="dpChange"></dropdown>
  </div>
</template>

<script type="ecmascript-6">
import MyHeader from 'base/my-header/my-header'
import Calendar from 'vue-mobile-hotel-calendar'
import Dropdown from 'base/dropdown/dropdown'
import {
  getHoliday
} from 'api/calendar/calendar'
export default {
  data() {
    return {
      dropdownValue: 'Chinese',
      dropdownKey: 'ch',
      dropdownVisible: false,
      lang: [{
        value: 'English',
        key: 'en'
      }, {
        value: 'Chinese',
        key: 'ch'
      }]
    }
  },
  components: {
    Calendar,
    MyHeader,
    Dropdown
  },
  methods: {
    showDropdown() {
      this.dropdownVisible = true
      this.$nextTick(() => {
        this.$refs.dropdown.showDropdown(this.dropdownKey)
      })
    },
    dpChange(value, key) {
      this.dropdownValue = value
      this.dropdownKey = key
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

</style>
