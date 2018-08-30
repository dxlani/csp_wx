import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './wxFooter.css'
declare var $:any;
  @Component({
    name: 'wxFooter',
    template: require('./wxFooter.html'),
    watch: {
    $route (newVal, oldVal) {
      if (newVal.path == '/wechat/onroad') {
        $('.ZT').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
      }
      if (newVal.path == '/wechat/wxInquiry') {
        $('.XJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
      }
      if (newVal.path == '/wechat/WxdataAnalysis') {
        $('.SJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
      }
      if (newVal.path == "/wechat/Wxorder") {
        $('.DD').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
      }
      if (newVal.path == "/wechat/WxSetting") {
        $('.WO').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
      }
    }
  }
})

export default class wxFooter extends Vue {
    
  mounted() {
    if (location.href.indexOf("wechat/onroad") != -1) {
        $('.ZT').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
    }
    if (location.href.indexOf("wechat/WxSetting") != -1) {
        $('.WO').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
    }
    if (location.href.indexOf("wechat/WxdataAnalysis") != -1) {
        $('.SJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
    }
    if (location.href.indexOf("wechat/wxInquiry") != -1) {
        $('.XJ').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
    }
    if (location.href.indexOf("wechat/Wxorder") != -1) {
        $('.DD').addClass('weui-bar__item--on').siblings('a').removeClass('weui-bar__item--on');
    }
    $('.weui-tabbar__item').click(function(){
        $(this).addClass('weui-bar__item--on').siblings('.weui-tabbar__item').removeClass('weui-bar__item--on');
    })
}
   
clear(){
    window.sessionStorage.removeItem('orderQueryTotal');
    window.sessionStorage.removeItem('orderQuery');
}

}

