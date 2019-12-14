// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router/routes';
import {store} from "./store/store";

window.Bus = new Vue();
window.axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8001/api/';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
