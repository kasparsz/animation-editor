export const viewPan = (store, pan) => {
    store.commit('viewPan', pan);
};

export const viewZoom = (store, zoom) => {
    store.commit('viewZoom', zoom);
};


export default {
    viewPan,
    viewZoom
};
