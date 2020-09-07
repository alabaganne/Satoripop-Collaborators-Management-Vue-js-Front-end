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

store
  .dispatch("auth/attempt", localStorage.getItem("token"))
  .then(function(err) {
    if (err) {
      console.log(err);
    }
    new Vue({
      router,
      store,
      render: function(h) {
        return h(App);
      },
    }).$mount("#app");
  });
