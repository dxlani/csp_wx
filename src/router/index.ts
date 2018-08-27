import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import Wxlogin from '../views/Wxlogin'

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
        }
          //路由钩子改标题
        if(to.meta.title){
          document.title = to.meta.title
        }
        
})

router.afterEach((to,from)=>{
  // //登录页加背景图
  // if(to.path=="/login"){
  //   $('body').addClass('body-bg')
  // }else{
  //   $('body').removeClass('body-bg')
  // }
})

export default router


