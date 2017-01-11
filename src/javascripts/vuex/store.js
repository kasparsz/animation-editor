import Vue from 'vue'
import Vuex from 'vuex'
import view from './view/store'
import data from './data/store'
import playback from './playback/store'

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        view,
        data,
        playback
    },
    strict: debug
})
