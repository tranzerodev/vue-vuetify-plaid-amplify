
export default {
  namespaced: true,
  state: {
    user: null,
    signedIn: false,
    items: []
  },
  mutations: {
    // insert(state, payload) {
    //   state.items.push(payload);
    // },
    // update(state, payload) {
    //   state.items = state.items.map(item => {
    //     if (item.id === payload.id) {
    //       item = { ...item, ...payload.sets };
    //     }
    //     return item;
    //   });
    // }
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_SIGNEDIN (state, payload) {
      state.signedIn = payload
    },
  },
  actions: {
    async insert({ dispatch, commit, state }, payload) {
      const res = await AjaxApiService.post("/api/v2/leads/insert", {
        sets: payload
      });
      commit("insert", res.lead);
      return res.lead;
    },

  }
};
