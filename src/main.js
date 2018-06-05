import Vue from 'vue'
import App from './site/App'
import router from './router/index'


import BootstrapVue from 'bootstrap-vue'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from "./env";

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.axios.defaults.baseURL = env.API_URL;

// Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     config.headers.set('Access-Control-Allow-Origin', '*')
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// Vue.http.interceptors.push((request, next) => {
//     if(localStorage.getItem('token'))
//         request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
//
//     next(response => {
//         if(response.status === 400 || response.status === 401 || response.status === 403)
//             router.push({path: '/login'});
//     });
// });

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})