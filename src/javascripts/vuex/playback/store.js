import getters from './getters.js';

const state = {
    position: 0, // current playback position in ms
    length: 400,   // total animation length in ms
    min: 100,      // playback limit, minimum in ms
    max: 300,      // playback limit, maximum in ms
};


export default {
    state,
    getters
};
