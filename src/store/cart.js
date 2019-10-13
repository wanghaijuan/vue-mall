import ca from '@/service/cart'

export default {
  state: {
    
  },
  mutations: {
    setLoginState(state, flag) {
      state.isLogin = flag
    }
  },
  // 只要是异步行为都要在actions执行
  actions: {
    login({commit}, user) {
      return us.login(user).then(res => {
        const { code, token } = res.data;
        if(code) {
          commit('setLoginState', true);
          localStorage.setItem('token', token);
        }
        return code;
      })
    },
    logout ({commit}) {
      // 清缓存
      localStorage.removeItem('token');
      // 重置状态
      commit('setLoginState', false);
    }
  }
}
