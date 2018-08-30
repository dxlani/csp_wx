import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Wxlogin from '../views/Wxlogin'
import wechat from '../components/wechat'
import onroad from '../views/onroad'

declare var $:any;
Vue.use(Router)


 const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Wxlogin'
      }
    },
    {
      path: '/Wxlogin',
      name:'Wxlogin',
      component: Wxlogin,
      meta:{title: 'Wxlogin',requireAuth: false},
    },
    {
      path:'/wechat',
      component: wechat,
      children:[
        {
          path: '',
          component: onroad,
          // meta:{title: 'HomeComponent',requireAuth: true},
        },
        {
          path: 'onroad',
          component: onroad,
        },
      ]
    }
  ],
     // mode:'history'   //去#号 需要服务器支持
      mode:'hash'   //默认
})

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token');
  store.state.token=token;
        //判断是否需要登录权限 以及是否登录
        if (!store.state.token && to.path !== '/Wxlogin') {// 判断是否登录
          next({
              path: '/Wxlogin',
          });
        } else {
          next()
        }
          //路由钩子改标题
        if(to.meta.title){
          document.title = to.meta.title
        }
        
})

router.afterEach((to,from)=>{
  console.log(to.path,from.path)
  $('.ZT').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
// else if(to.path.indexOf("wechat/WxdataAnalysis") != -1) {
//   $('.SJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
// }else if(to.path.indexOf("wechat/WxInquiryReleaseManage") != -1) {
//   $('.XJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
// }else if(to.path.indexOf("wechat/Wxorder") != -1) {
//   $('.DD').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
// }else if(to.path.indexOf("wechat/WxSetting") != -1) {
//   $('.WO').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
// }
})

export default router


