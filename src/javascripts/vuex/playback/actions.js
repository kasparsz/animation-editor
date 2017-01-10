export const playbackToggle = (store) => {
    store.dispatch(store.state.playing ? 'playbackPause' : 'playbackPlay');
};

export const playbackPlay = (store) => {
    const playing = !store.state.playing;

    if (playing) {
        // If current position is at the end, then reset to the start
        const min      = store.state.min || 0;
        const max      = store.state.max !== null ? store.state.max : state.length;
        const position = store.state.position;

        if (position < min || position >= max) {
            store.dispatch('playbackPosition', min);
        }

        // Loop
        let lasttime = Date.now();

        requestAnimationFrame(function tick () {
            if (store.state.playing) {
                const min      = store.state.min || 0;
                const max      = store.state.max !== null ? store.state.max : state.length;
                const time     = Date.now();
                let   position = (time - lasttime) + store.state.position;

                lasttime = time;

                if (position > max) {
                    if (store.state.loop) {
                        position = (position - min) % (max - min) + min;
                    } else {
                        position = max;

                        // Pause
                        store.dispatch('playbackPause');
                    }
                }

                store.dispatch('playbackPosition', position);
                requestAnimationFrame(tick);
            }
        });
    }

    store.commit('playbackState', true);
};

export const playbackPause = (store) => {
    store.commit('playbackState', false);
};

export const playbackPosition = (store, position) => {
    store.commit('playbackPosition', position);
};

export const playbackMinimum = (store, position) => {
    store.commit('playbackMinimum', position);
};

export const playbackMaximum = (store, position) => {
    store.commit('playbackMaximum', position);
};

export default {
    playbackToggle,
    playbackPlay,
    playbackPause,
    playbackPosition,
    playbackMinimum,
    playbackMaximum
};
