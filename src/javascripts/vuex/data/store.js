import guid from '../../utils/guid';

import getters from './getters.js';
import actions from './actions.js';

const TYPE_LAYER = 'layer';
const TYPE_PROPERTY = 'property';
const TYPE_POINT = 'point';


const state = {
    // List of all layers
    layers: {},

    // Layer hierachy
    hierarchy: [],

    // Selected layer
    selectedLayer: null,

    // Selected property
    selectedProperty: null,
};


function sortByType (a, b) {
    return a.type === b.type ? 0 : (a.type > b.type ? -1 : 1);
}


// mutations
const mutations = {
    createLayer (state, info) {
        const layer = {
            id: guid(),
            type: TYPE_LAYER,
            title: '',
            visible: true,
            expanded: true,
            parent: null,
            children: [],
            ...info
        };

        state.layers[layer.id] = layer;

        if (layer.parent) {
            state.layers[layer.parent].children.push(layer);
            state.layers[layer.parent].children.sort(sortByType);
        } else {
            state.hierarchy.push(layer);
        }

        return layer.id;
    },

    createProperty (state, info) {
        const property = {
            id: guid(),
            type: TYPE_PROPERTY,
            title: '',
            parent: state.selectedLayer,
            children: [],
            ...info
        };

        state.layers[property.id] = property;
        state.layers[property.parent].children.push(property);
        state.layers[property.parent].children.sort(sortByType);

        return property.id;
    },

    deleteLayer (state, id) {
        const layer  = state.layers[id];
        const parent = layer.parent ? state.layers[layer.parent].children : state.hierarchy;

        // Delete all children
        const children = layer.children;

        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].type === TYPE_LAYER || children[i].type === TYPE_PROPERTY) {
                mutations.deleteLayer(state, children[i].id);
            }
        }

        // Remove from layers
        delete(state.layers[id]);

        // Remove from parent / hierarchy
        for (let i = 0, ii = parent.length; i < ii; i++) {
            if (parent[i].id === id) {
                parent.splice(i, 1);
                break;
            }
        }

        return layer;
    },

    selectLayer (state, id) {
        state.selectedLayer = id;
        state.selectedProperty = null;
    },

    selectProperty (state, id) {
        state.selectedLayer = state.layers[id].parent;
        state.selectedProperty = id;
    },


    toggleVisibility (state, id) {
        state.layers[id].visible = !state.layers[id].visible;
    },

    toggleExpanded (state, id) {
        state.layers[id].expanded = !state.layers[id].expanded;
    },


    rehydrate (state, data, parent = null) {
        for (let i = 0, ii = data.length; i < ii; i++) {
            let id = null;

            if (data[i].type === TYPE_LAYER) {
                id = mutations.createLayer(state, {
                    ...data[i],
                    parent: parent,
                    children: []
                });
            } else if (data[i].type === TYPE_PROPERTY) {
                id = mutations.createProperty(state, {
                    ...data[i],
                    parent: parent,
                    children: []
                });
            }

            if (data[i].children && data[i].children.length) {
                mutations.rehydrate(state, data[i].children, id);
            }
        }
    }
};


export default {
    state,
    mutations,
    getters,
    actions
};
