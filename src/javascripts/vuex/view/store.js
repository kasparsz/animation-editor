import { VIEW_PAN, VIEW_ZOOM } from '../mutation-types.js';

import getters from './getters.js';

const state = {
    projections: {
        screen: {
            translate: {x: 40 /* px */, y: 40 /* px */},
            scale: {x: 240 /* px */, y: 240 /* px */}
        },
        unit: {
            translate: {x: 0, y: 0},
            scale: {x: 200 /* ms per 240px */, y: 100 /* units per 240px */}
        }
    }
};

// mutations
const mutations = {
    [VIEW_PAN] (state, vector) {
        state.projections.screen.translate.x = vector.x;
        state.projections.screen.translate.y = vector.y;
    },

    [VIEW_ZOOM] (state, vector) {
        state.projections.screen.scale.x = vector.x;
        state.projections.screen.scale.y = vector.y;
    }
};


export default {
    state,
    mutations,
    getters
};
