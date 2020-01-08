import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem 适配
import 'amfe-flexible'
// 引入vant模块
import './utils/model-vant'
// 引入样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
