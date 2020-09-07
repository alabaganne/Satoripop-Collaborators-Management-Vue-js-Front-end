import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },

  getters: {
    authenticated(state) {
      return state.token !== null; // returns true if the user is logged in
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
    attempt({ commit }, token) {
      if (!token) {
        return; // there's no point of sending a token to retrieve the user info if token is null
      }
      commit("SET_TOKEN", token);
      return new Promise((resolve) => {
        axios
          .get("/auth/me", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            commit("SET_USER", response.data);
            axios.defaults.headers["Authorization"] = `Bearer ${token}`;
            resolve(null); // ? Resolve with null
          })
          .catch((err) => {
            if (err.response.status === 401) {
              commit("SET_TOKEN", null);
              localStorage.removeItem("token");
            }
            resolve(err); // ! Resolve with error
          });
      });
    },

    logout({ commit }) {
      return axios.post("/api/auth/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      });
    },
  },
};
