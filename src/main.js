import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element'
import './utils/request'

// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 解决冲突 Added non-passive event listener to a scroll-blocking 'mousewheel' event
import 'default-passive-events'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
