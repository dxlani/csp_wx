import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import wxFooter from '../wxFooter'
import './wechat.scss'
  @Component({
    name: 'wechat',
    template: require('./wechat.html'),
    components:{
      "wx-footer":wxFooter,
    },
  // watch: {
  //   // 防止跳过登录直接进系统
  //   $route (newVal, oldVal) {
  //     if (!this.$store.state.token && newVal.path !== '/login') {
  //       this.$router.push('/login')
  //       alert('请登录')
  //     }
  //   }
  // }
})

export default class wechat extends Vue {


}

