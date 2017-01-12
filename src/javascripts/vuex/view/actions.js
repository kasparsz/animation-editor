export const viewPan = (store, pan) => {
    store.commit('viewPan', pan);
};

export const viewZoom = (store, zoom) => {
    store.commit('viewZoom', zoom);
};

export const contentSize = (store, size) => {
    store.commit('contentSize', size);
};


export default {
    viewPan,
    viewZoom,
    contentSize
};
