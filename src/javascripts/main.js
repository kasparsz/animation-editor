import Vue from 'vue';
import App from './components/app.vue';
import store from './vuex/store';

window.v = new Vue({
    el: '#app',
    store,
    ...App
});
