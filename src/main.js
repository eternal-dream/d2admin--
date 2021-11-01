// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'
import axios from 'axios'

// 菜单和路由设置
import router from './router'

//深拷贝lodash
import _ from 'lodash'

import { axiosRequest, axiosOptions } from '@/api/service'
import * as echarts from 'echarts';

Vue.prototype.$axios = axios
Vue.prototype.$axiosRequest = axiosRequest
Vue.prototype.$axiosOptions = axiosOptions
Vue.prototype.$lodash = _
Vue.prototype.$echarts = echarts
//引入自定义指令
import hasRole from '@/directive/permission/hasRole'
import hasPermi from '@/directive/permission/hasPermi'
//全局注册自定义的指令
Vue.directive('hasRole', hasRole)
Vue.directive('hasPermi', hasPermi)
// 核心插件
Vue.use(d2Admin)

//vxe-table
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

//图标


Vue.use(VXETable)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
