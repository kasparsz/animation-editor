export const createLayer = (store, info) => {
    store.commit('createLayer', info);
};

export const createProperty = (store, info) => {
    store.commit('createProperty', info);
};

export const deleteLayer = (store, id) => {
    store.commit('deleteLayer', id);
};

export const selectLayer = (store, id) => {
    store.commit('selectLayer', id);
};

export const selectProperty = (store, id) => {
    store.commit('selectProperty', id);
};

export const toggleVisibility = (store, id) => {
    store.commit('toggleVisibility', id);
};

export const toggleExpanded = (store, id) => {
    store.commit('toggleExpanded', id);
};

export const rehydrate = (store, data) => {
    store.commit('rehydrate', data, null);
};


export default {
    createLayer,
    createProperty,
    deleteLayer,

    selectLayer,
    selectProperty,

    toggleVisibility,
    toggleExpanded,

    rehydrate
};
