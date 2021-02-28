/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue').default;


require('./bootstrap');

import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter)


const app = new Vue({
    el: '#app',
    router: new VueRouter(routes),
});
