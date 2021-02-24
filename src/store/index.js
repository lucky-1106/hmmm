import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: '',
    username: '',
    avatar: ''
  },
  mutations: {
    setUserId (state, data) {
      state.id = data
    },
    setUserName (state, data) {
      state.username = data
    },
    setAvatar (state, data) {
      state.avatar = data
    }
  },
  actions: {},
  modules: {}
})
