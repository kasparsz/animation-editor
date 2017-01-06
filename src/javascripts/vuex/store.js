import Vue from 'vue'
import Vuex from 'vuex'
import view from './view/store'
import playback from './playback/store'
// import createLogger from 'vuex/logger'

Vue.use(Vuex);
Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        view,
        playback
    },
    strict: debug
    // middlewares: debug ? [createLogger()] : []
})
