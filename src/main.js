import Vue from "vue";
import App from "./App.vue";
import router from "./router";
require("bootstrap");

// !Store
import store from "./store/index";
require("@/store/subscriber");

// !Axios
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
window.axios = axios;
// !Charts
import Chart from 'chart.js'
Chart.defaults.global.defaultFontFamily = "Comfortaa";
Chart.defaults.global.maintainAspectRatio = false;

// TODO: Refresh the token when it's expired

// * Re-authenticate the user if a valid token is present on the Local Storage
const token = localStorage.getItem('token');
Vue.config.productionTip = false;

Vue.filter('clean', (value) => {
  if(!value) return '';
  value = value.toString() && value.replace('_', ' ');

  return value.charAt(0).toUpperCase() + value.slice(1);
})

store.dispatch('auth/attempt', token).catch(error => {
  if(error.response.status === 401) {
    console.error('AUTH ERROR ON "main.js"');
  } else {
    console.error(error.response);
  }
}).finally(() => {
  new Vue({
    router,
    store,
    render: function(h) {
      return h(App);
    },
  }).$mount('#app');
});