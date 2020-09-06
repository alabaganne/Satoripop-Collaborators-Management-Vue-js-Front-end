import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  getters: {
    authenticated(state) {
      return state.token !== null;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }

      if (!state.token) {
        return; // * there's no point of sending a token to get users info if there's no token passed to attempt
      }

      return new Promise((resolve, reject) => {
        // this time resolve takes an error or null
        axios // !
          .get("/auth/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            commit("SET_USER", response.data);
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            resolve(response);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              // * Invalid token
              localStorage.removeItem("token");
            }
            reject(error);
          });
      });
    },
    logout({ commit }) {
      commit("SET_TOKEN", null);
      commit("SET_USER", null);

      return new Promise((resolve) => {
        resolve();
      });
    },
  },
};
