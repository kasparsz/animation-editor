export const playbackPosition = (state) => {
    return Math.max(0, state.position);
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

export const playbackPlaying = (state) => {
    return state.playing;
};

export default {
    playbackPosition,
    playbackMinimum,
    playbackMaximum,
    playbackLength,
    playbackPlaying
};
