import getters from './getters.js';
import actions from './actions.js';

const MINIMAL_PLAYBACK_LENGTH = 16;

const state = {
    position: 150,  // current playback position in ms
    length: 400,    // total animation length in ms
    min: 100,       // playback limit, minimum in ms
    max: 300,       // playback limit, maximum in ms
    playing: false, // current playback state
    loop: false     // loop
};

// mutations
const mutations = {
    playbackState (state, playing) {
        state.playing = playing;
    },

    playbackPosition (state, position) {
        state.position = Math.max(0, position);
    },

    playbackMinimum (state, position) {
        state.min = Math.min(state.max - MINIMAL_PLAYBACK_LENGTH, Math.max(0, position));
    },

    playbackMaximum (state, position) {
        state.max = Math.max(state.min + MINIMAL_PLAYBACK_LENGTH, position);
    }
};


export default {
    state,
    getters,
    mutations,
    actions
};
