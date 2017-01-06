export const playbackPosition = (state) => {
    return Math.min(state.max !== null ? state.max : state.length, Math.max(state.min || 0, state.position));
};

export const playbackMinimum = (state) => {
    return state.min || 0;
};

export const playbackMaximum = (state) => {
    return state.max !== null ? state.max : state.length;
};

export const playbackLength = (state) => {
    return state.length;
};

export default {
    playbackPosition,
    playbackMinimum,
    playbackMaximum,
    playbackLength
};
