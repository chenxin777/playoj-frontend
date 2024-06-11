import { StoreOptions } from "vuex";

export default {
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "noAuth",
    },
  }),
  getters: {},
  actions: {
    getLoginUser({ commit, state }, payload) {
      // Todo 远程获取登录信息
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
