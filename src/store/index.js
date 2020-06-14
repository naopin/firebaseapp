import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user:""
  },
  mutations: {
    login(state,user) {
      state.user = user
    }
  },
  getters: {
    user: state => state.user
  },
  actions: {
  },
  modules: {
  }
})