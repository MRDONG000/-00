import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gender:1,
    uuid:'/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4',
    rankingIndex:0,
    catArrayUrl:'',
    navIndex:0,
    active:0,
    nightState:false,
  },
  getters: {
  },
  mutations: {
    updateCount(state, params) {
      //params: 载荷, 组件提交mutations携带的参数
      console.log('state ==> ', state);
      console.log('params ==> ', params);
      state.gender = params.gender;
    },
    updateUUid(state, params) {
      //params: 载荷, 组件提交mutations携带的参数
      console.log('state ==> ', state);
      console.log('params ==> ', params);
      state.uuid = '/store/show.json?uuid=' + params.uuid;
    },
    upRankingIndex(state, params){
      state.rankingIndex = params.index
    },
    upNavIndex(state, params){
      state.navIndex = params.navIndex
    },
    upActive(state, params){
      state.active = params.active
    },
    upNightState(state,params){
      state.nightState = params.nightState
    }
  },
  actions: {
  },
  modules: {
  }
})
