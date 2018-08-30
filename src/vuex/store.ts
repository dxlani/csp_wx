import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Dingxiaolin',
    token:'',
    isLogin:''
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token;
    }
},
actions: {     
},

})
export default store
