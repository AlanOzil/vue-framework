import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import 'assets/css/index.styl'
import router from './router'
import VueI18n from 'vue-i18n'
// import '@/utils/flexible'
import '@/assets/font/iconfont.css'
// import Mint from 'mint-ui'
// import 'mint-ui/lib/style.css'

// 通过插件的形式挂载
Vue.use(VueI18n)
// Vue.use(Mint)

const i18n = new VueI18n({
  locale: 'cn', // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'cn': require('../static/lang/zh'), // 中文语言包
    'en': require('../static/lang/en') // 英文语言包
  }
})

// Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  // Calendar,
  render: h => h(App)
})
