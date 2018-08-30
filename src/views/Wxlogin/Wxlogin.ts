import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_login from '../../api/api_login'
import './Wxlogin.scss'

declare var $:any;
declare var unescape: any;
@Component({
  name:'Wxlogin',
  template: require('./Wxlogin.html'),
})
export default class Wxlogin extends Vue {
  user = {
    userName: "",
    password: "",
    weChatOpenid: ""
}



mounted () {
    this.user = {
        userName: "货准达测试账户",
        password: "123456",
        weChatOpenid: ""
    }

    function GetQueryString(names) {
        var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    };
    /**微信公众号绑定 */
    var myCode = GetQueryString("code");
    if (myCode != null && myCode.toString().length > 1) {
        GetQueryString("code")
        api_login.User.GetOpenidForCode(myCode).then((res) => {
            this.user.weChatOpenid = res.openid;
            if (this.user.weChatOpenid != undefined) {
                window.sessionStorage.setItem("openid", this.user.weChatOpenid);
                api_login.User.GetUserInfo(this.user.weChatOpenid).then(
                    (res) => {
                        var Wdata = res;
                        if (Wdata != null) {
                            var UserName = Wdata.userName;
                            var password = Wdata.password;
                            var weChatOpenid = Wdata.weChatOpenid;
                            var loginData;
                            $.showLoading('登录中...');
                            api_login.User.login({UserName, password, weChatOpenid}).then((res) => {
                                console.log('res',res)
                                window.sessionStorage.setItem("token",res.jwtToken);
                                loginData = res;
                                window.sessionStorage.setItem("logined", "yes");
                                var userInfo = JSON.stringify(loginData);
                                window.sessionStorage.setItem("userInfo", userInfo);
                                window.sessionStorage.setItem("userName", res.userName);
                                window.sessionStorage.setItem("isContract",loginData.isContract);
                                window.sessionStorage.setItem("isAdmin",res.isAdmin);
                                window.sessionStorage.setItem("weChatAuthorize",res.weChatAuthorize);
                                $.hideLoading();
                                if(loginData.isContract){
                                    this.$router.push('/wechat/onroad'); 
                                }else{
                                $.modal({
                                    title: "货准达用户协议",
                                    text: 
                                    `
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货准达（下文简称CSP）由丹阳飓风物流股份有限公司（下文简称飓风股份）自主研发运营，提供物流过程管控、智能数据分析等服务。用户方使用货准达服务平台前，应仔细阅读并接受本协议。一经登录即视为用户方接受本协议。</p>
                                    <p><b>一、服务条款</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份有权在必要时修改本服务条款，服务条款一旦发生变动，将会在相关页面上公布修改后的服务条款。如果不同意所改动的内容，用户应主动停止使用CSP物流服务平台。如果用户继续使用，则视为接受服务条款的变动。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份与货准达用户之间为业务合作关系。用户为飓风股份提供物流需求后，飓风股份根据需求为用户提供物流服务和基础数据的分析支持。</p>
                                    <p><b>二、用户账号及管理</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP账户所有权归飓风股份所有，用户完成开户（及飓风股份确立合作关系，由飓风股份为用户开启CSP账户）后获得CSP账户的使用权。CSP用户名为用户单位简称（例：江苏XX有限公司，用户名为：江苏XX），初始密码为“666666”。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、CSP账户仅能由飓风股份确定的特定用户使用，用户不得将账号、密码转让或出借给第三方企业或个人。如用户发现其账号遭他人非法使用，应当立即通知飓风股份。因用户管理账户不当或第三人恶意盗取账户情况，飓风股份不承担任何责任</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份承诺未获得用户明确授权不对外公开用户账号信息。</p>
                                    <p><b>三、业务数据保密</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP用户为飓风股份提供原始需求数据（以下简称需求数据），用户对需求数据享有所有权。飓风股份对用户需求数据承担严格保密义务，不得将用户提供原始需求数据展示、出售给第三方企业或个人。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份对除用户原始需求数据外的其他数据，享有排他性质的所有权。CSP用户应当将飓风股份提供数据信息作为商业机密进行保护。用户CSP数据信息应当仅为用户指定业务相关人知晓。若因为用户疏忽或怠于行使保密义务导致信息泄露的，用户应当承担数据泄露给飓风股份带来的损失。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份承诺对用户需求、发生、成本、质量等相关数据进行保密，未经用户授权许可不得在公开场合（在场人数超过500人或有地级市媒体在场视为公开场合）、与用户方存在竞争或供求关系方在场时进行展示。</p>
                                    <p><b>四、数据分析成果独立</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份有权对用户内部业务需求、发生、成本、质量等指标进行筛选分析，形成可表达用户供求、成本关系的数据分析结果。该数据分析结果由飓风公司与用户共同享有所有权。数据分析结果不因用户方要求进行删除，用户方有权要求飓风股份分享与自身业务相关的数据分析结果。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份有权对同类用户业务需求、发生、成本、质量等指标进行筛选分析，形成可表达特定产业供求、成本关系的数据分析成果。对于该数据分析成果飓风股份享有独立的所有权。数据分析成果不因用户方要求进行删除，飓风股份保证数据分析成果仅作为内部业务分析使用，用户方无权取得该部分成果。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、用户方不得将获取的数据结果交给与飓风股份存在业务竞争或业务合作关系的第三方企业或个人。</p>
                                    <p><b>五、结果送达</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP用户有权获取与自身相关的业务数据信息，但由于数据信息的敏感性，用户需以书面函件的形式发起需求。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份以PDF形式发送至用户指定邮箱，用户应当保证该邮箱为指定业务相关人使用。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、PDF数据信息应当作为飓风股份商业机密进行保护。</p>
                                    <p><b>六、服务免责条款</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、用户未及时修改初始密码或自身原因导致用户需求信息泄露的，用户方不得要求飓风股份承担违约责任。上述行为给飓风股份造成损失的，用户方应当承担飓风股份的全部损失（包括直接与间接损失）。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份应司法、行政机关要求或命令，免于遵守本协议规定的保密义务。</p>
                                    <p><b>七、协议终止</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份与用户方终止合作后，本协议不自动终止。数据提供方有权要求数据存储方永久删除与自身业务相关的数据信息。</p>
                                    <p><b>八、其他</b></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向飓风股份所在地的人民法院提起诉讼。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请您在发现任何违反本服务协议以及其他任何单项服务的服务条款、飓风股份各类公告之情形时，通知飓风股份。您可以通过如下联络方式同飓风股份取得联系∶</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;江苏省镇江市丹阳市丹北镇金润大道旁珠峰路1号</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;飓风股份大数据中心</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：0511-86339868</p>
                                    `,
                                    buttons: [
                                      { text: "不同意", className: "default", onClick: function(){
                                        window.sessionStorage.removeItem("logined")//退出登陆后清除登陆信息
                                        window.sessionStorage.removeItem("userInfo");
                                        window.sessionStorage.removeItem("userName");
                                        window.sessionStorage.removeItem("isContract");
                                      } },
                                      { text: "同意并继续", onClick: function(){ 
                                        api_login.User.contract().then((res)=>{
                                         window.sessionStorage.setItem("isContract",'true');
                                         this.$router.push.go('/wechat/onroad'); 
                                        })
                                      } },
                                    ]
                                  });
                                }
                            }, function (err) {
                                console.log(err)
                            });
                        } else {
                            return;
                        }
                    }, function (err) {
                        console.log(err)
                    });
            }else{
                return;
            }
        }, function (err) {
            console.log(err)
        });

    }
}
login () {
    if ($('#wxlogin_wxloginBtn').hasClass('weui-btn_disabled')) {
        $.toptip('请输入用户名和密码！', 'warning');
        return;
    }
    var loginData;
    $.showLoading('登录中...');
    api_login.User.login(this.user).then((res) => {
        if (!(res && res.jwtToken)) {
            $.toptip(res.errorMessage, 'error');
            $.hideLoading();
            return;
        }

        loginData = res;
        window.sessionStorage.setItem("token",res.jwtToken);
        window.sessionStorage.setItem("logined", "yes");

        var userInfo = JSON.stringify(loginData);

        window.sessionStorage.setItem("userInfo", userInfo);
        window.sessionStorage.setItem("userName", res.userName);
        window.sessionStorage.setItem("isContract",loginData.isContract);
        window.sessionStorage.setItem("isAdmin",res.isAdmin);
        window.sessionStorage.setItem("weChatAuthorize",res.weChatAuthorize);
        
        $.hideLoading();
        if(loginData.isContract){
            this.$router.push('/wechat/onroad'); 
        }else{
        $.modal({
            title: "货准达用户协议",
            text: 
            `
            <div class="xieyi">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货准达（下文简称CSP）由丹阳飓风物流股份有限公司（下文简称飓风股份）自主研发运营，提供物流过程管控、智能数据分析等服务。用户方使用货准达服务平台前，应仔细阅读并接受本协议。一经登录即视为用户方接受本协议。</p>
            <p><b>一、服务条款</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份有权在必要时修改本服务条款，服务条款一旦发生变动，将会在相关页面上公布修改后的服务条款。如果不同意所改动的内容，用户应主动停止使用CSP物流服务平台。如果用户继续使用，则视为接受服务条款的变动。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份与货准达用户之间为业务合作关系。用户为飓风股份提供物流需求后，飓风股份根据需求为用户提供物流服务和基础数据的分析支持。</p>
            <p><b>二、用户账号及管理</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP账户所有权归飓风股份所有，用户完成开户（及飓风股份确立合作关系，由飓风股份为用户开启CSP账户）后获得CSP账户的使用权。CSP用户名为用户单位简称（例：江苏XX有限公司，用户名为：江苏XX），初始密码为“666666”。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、CSP账户仅能由飓风股份确定的特定用户使用，用户不得将账号、密码转让或出借给第三方企业或个人。如用户发现其账号遭他人非法使用，应当立即通知飓风股份。因用户管理账户不当或第三人恶意盗取账户情况，飓风股份不承担任何责任</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份承诺未获得用户明确授权不对外公开用户账号信息。</p>
            <p><b>三、业务数据保密</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP用户为飓风股份提供原始需求数据（以下简称需求数据），用户对需求数据享有所有权。飓风股份对用户需求数据承担严格保密义务，不得将用户提供原始需求数据展示、出售给第三方企业或个人。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份对除用户原始需求数据外的其他数据，享有排他性质的所有权。CSP用户应当将飓风股份提供数据信息作为商业机密进行保护。用户CSP数据信息应当仅为用户指定业务相关人知晓。若因为用户疏忽或怠于行使保密义务导致信息泄露的，用户应当承担数据泄露给飓风股份带来的损失。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份承诺对用户需求、发生、成本、质量等相关数据进行保密，未经用户授权许可不得在公开场合（在场人数超过500人或有地级市媒体在场视为公开场合）、与用户方存在竞争或供求关系方在场时进行展示。</p>
            <p><b>四、数据分析成果独立</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份有权对用户内部业务需求、发生、成本、质量等指标进行筛选分析，形成可表达用户供求、成本关系的数据分析结果。该数据分析结果由飓风公司与用户共同享有所有权。数据分析结果不因用户方要求进行删除，用户方有权要求飓风股份分享与自身业务相关的数据分析结果。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份有权对同类用户业务需求、发生、成本、质量等指标进行筛选分析，形成可表达特定产业供求、成本关系的数据分析成果。对于该数据分析成果飓风股份享有独立的所有权。数据分析成果不因用户方要求进行删除，飓风股份保证数据分析成果仅作为内部业务分析使用，用户方无权取得该部分成果。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、用户方不得将获取的数据结果交给与飓风股份存在业务竞争或业务合作关系的第三方企业或个人。</p>
            <p><b>五、结果送达</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、CSP用户有权获取与自身相关的业务数据信息，但由于数据信息的敏感性，用户需以书面函件的形式发起需求。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份以PDF形式发送至用户指定邮箱，用户应当保证该邮箱为指定业务相关人使用。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、PDF数据信息应当作为飓风股份商业机密进行保护。</p>
            <p><b>六、服务免责条款</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、用户未及时修改初始密码或自身原因导致用户需求信息泄露的，用户方不得要求飓风股份承担违约责任。上述行为给飓风股份造成损失的，用户方应当承担飓风股份的全部损失（包括直接与间接损失）。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、飓风股份应司法、行政机关要求或命令，免于遵守本协议规定的保密义务。</p>
            <p><b>七、协议终止</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、飓风股份与用户方终止合作后，本协议不自动终止。数据提供方有权要求数据存储方永久删除与自身业务相关的数据信息。</p>
            <p><b>八、其他</b></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向飓风股份所在地的人民法院提起诉讼。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、飓风股份未行使或执行本服务协议任何权利或规定，不构成对前述权利或权利之放弃。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4、如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请您在发现任何违反本服务协议以及其他任何单项服务的服务条款、飓风股份各类公告之情形时，通知飓风股份。您可以通过如下联络方式同飓风股份取得联系∶</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;江苏省镇江市丹阳市丹北镇金润大道旁珠峰路1号</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;飓风股份大数据中心</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：0511-86339868</p>
            </div>
            `,
            buttons: [
              { text: "不同意", className: "default", onClick: function(){
                window.sessionStorage.removeItem("logined")//退出登陆后清除登陆信息
                window.sessionStorage.removeItem("userInfo");
                window.sessionStorage.removeItem("userName");
                window.sessionStorage.removeItem("isContract");

              } },
              { text: "同意并继续", onClick: ()=>{ 
                 api_login.User.contract().then((res)=>{
                    window.sessionStorage.setItem("isContract",'true');
                    this.$router.push('/wechat/onroad'); 
                })
              } },
            ]
          });
        }
    }, function (err) {
        console.log(err)
    });
}
}

