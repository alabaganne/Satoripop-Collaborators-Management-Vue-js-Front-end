import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
require("bootstrap");
import axios from "axios";

require("@/store/subscriber");

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
window.axios = axios;

Vue.config.productionTip = false;

new Vue({
  created() {
    store.dispatch("auth/attempt", localStorage.getItem("token"));
  }, // !
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
