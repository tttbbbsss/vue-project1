import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

// 导入axios包
import axios from 'axios'
// 设置请求根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'

// 通过接口获取菜单数据
// axios请求拦截
axios.interceptors.request.use(config=>{
  // 为请求对象,添加token验证的Authorization字段
  config.headers.Authorization=window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})

// 挂载在原型对象上
Vue.prototype.$http=axios

Vue.config.productionTip = false

// Vue.component('tree-table',TreeTable)把TreeTable注册为全局可用组件,'tree-table'为自定义更换的组件名
Vue.component('tree-table',TreeTable)

// 注册全局过滤器
Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)

  const y=dt.getFullYear()
  const m=(dt.getMonth()+1+'').padStart(2,'0')
  const d=(dt.getDate()+'').padStart(2,'0')

  const hh=(dt.getHours()+'').padStart(2,'0')
  const mm=(dt.getMinutes()+'').padStart(2,'0')
  const ss=(dt.getSeconds()+'').padStart(2,'0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
