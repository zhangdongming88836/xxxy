import Vue from 'vue'
import App from './App'
//挂在ui
import uView from "uview-ui";
//挂在请求插件
import http from './utils/request.js'

Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$http = http
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
