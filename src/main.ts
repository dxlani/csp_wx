import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import { Component, Vue} from 'vue-property-decorator'
import './main.scss' /* 全局样式 */
Vue.config.productionTip = false
var jqueryweui = require('jqueryweui');
var bootstrap = require('bootstrap');
//引入js
import  "../node_modules/ali-oss/dist/aliyun-oss-sdk.min.js"
import  "../node_modules/vee-validate/dist/locale/zh_CN.js"
import  "../src/services/Validator"  /* 校验器 */

new Vue({
  el: '#App',
  router,
  store,
  //components: { App } /*  vue1.0的写法 */
   //render: h => h(App)   /*  vue2.0的写法 */
  // components: {
  //   'app-header':header,
  //   'app-footer':footer,
  //   'app-nav':navbar
  // }
}).$mount('#App');
