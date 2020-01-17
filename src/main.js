// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './mint-ui/index.js'

/*import AvatarUpload from './plugins/avatar_upload'
Vue.use(AvatarUpload);*/

import global_ from './components/common/Global'//引用文件
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

import axios from 'axios'
Vue.prototype.$http = axios;



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
