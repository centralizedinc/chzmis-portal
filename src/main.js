import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/ant-design-vue.js'
import mixins from '@/plugins/mixins.js'
import '@/assets/css/chzmis.scss'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false
Vue.use(mixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')