import { createStore } from 'vuex'

export default createStore({
  state: {
    auth:"0"
  },
  mutations: {
   
      setAuth(state, auth) {
        state.auth = auth
  
      },
  },
  actions: {
  },
  modules: {
  }
})
