import getters from './getters.js';
import actions from './actions.js';

const VIEW_OFFSET = 57;


const state = {
    projections: {
        screen: {
            translate: {x: VIEW_OFFSET /* px */, y: 40 /* px */},
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
    viewPan (state, vector) {
        state.projections.screen.translate.x = Math.min(VIEW_OFFSET, vector.x);
        state.projections.screen.translate.y = vector.y;
    },

    viewZoom (state, vector) {
        // 24px per 200ms - 480px per 200ms
        state.projections.screen.scale.x = Math.min(480, Math.max(24, vector.x));
        state.projections.screen.scale.y = Math.min(100, Math.max(0.01, vector.y));
    }
};


export default {
    state,
    mutations,
    getters,
    actions
};
