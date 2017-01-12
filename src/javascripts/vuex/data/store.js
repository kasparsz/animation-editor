import Vue from 'vue';

import guid from '../../utils/guid';
import { reduceUp, eachDown } from '../../utils/tree';

import getters from './getters.js';
import actions from './actions.js';

const TYPE_LAYER = 'layer';
const TYPE_PROPERTY = 'property';
const TYPE_POINT = 'point';


const state = {
    // List of all layers
    layers: {},

    // Root level layer ids
    root: [],

    // Selected layer
    selectedLayer: null,

    // Selected property
    selectedProperty: null,
};


function sortByType (layers, a, b) {
    const aType = layers[a].type;
    const bType = layers[b].type;

    return aType === bType ? 0 : (aType > bType ? -1 : 1);
}


// mutations
const mutations = {
    updateLayer (state, info) {
        const layer = state.layers[info.id];

        if ('parent' in info && info.parent !== layer.parent) {

        }

        Object.assign(layer, info);
    },

    createLayer (state, info, user_action = true) {
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

        // Add to all layer list / index
        Vue.set(state.layers, layer.id, layer);

        if (layer.parent) {
            // Expand parent
            if (user_action) {
                state.layers[layer.parent].expanded = true;
            }

            // Add to children list
            state.layers[layer.parent].children.push(layer.id);
            state.layers[layer.parent].children.sort(sortByType.bind(this, state.layers));
        } else {
            state.root.push(layer.id);
        }

        // Set layer as active if creation was triggered by user action instead
        // of rehydration
        if (user_action) {
            state.selectedLayer = layer.id;
            state.selectedProperty = null;
        }

        return layer;
    },

    createProperty (state, info, user_action = true) {
        const property = {
            id: guid(),
            type: TYPE_PROPERTY,
            title: '',
            parent: state.selectedLayer,
            children: [],
            ...info
        };

        // Add to all layer list / index
        Vue.set(state.layers, property.id, property);

        // Expand parent
        if (user_action) {
            state.layers[property.parent].expanded = true;
        }

        // Add to children list
        state.layers[property.parent].children.push(property.id);
        state.layers[property.parent].children.sort(sortByType.bind(this, state.layers));

        // Set layer as active if creation was triggered by user action instead
        // of rehydration
        if (user_action) {
            state.selectedLayer = property.parent;
            state.selectedProperty = property.id;
        }

        return property;
    },

    deleteLayer (state, id) {
        const layer  = state.layers[id];
        const parent = layer.parent ? state.layers[layer.parent].children : state.root;

        // Delete all children
        const children = layer.children;

        for (let i = children.length - 1; i >= 0; i--) {
            let child = state.layers[children[i]];

            if (child.type === TYPE_LAYER || child.type === TYPE_PROPERTY) {
                mutations.deleteLayer(state, child.id);
            }
        }

        // Unset active
        if (state.selectedLayer === id || state.selectedProperty === id) {
            state.selectedLayer = null;
            state.selectedProperty = null;
        }

        // Remove from parent children list / root
        for (let i = 0, ii = parent.length; i < ii; i++) {
            if (parent[i] === id) {
                parent.splice(i, 1);
                break;
            }
        }

        // Remove from layers
        Vue.delete(state.layers, id);

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

    /**
     * Toggle layer visibility
     * Follow photoshop hide/show logic:
     * - If all parents are visible, then toggle visibility
     * - If parent is not visible, then toggle parent visibility +
     * -- If layer was not visible, then toggle layer visibility
     * -- If layer was visible, then do nothing to the layer
     *
     * @param {object} state State
     * @param {number} id Layer id
     */
    toggleVisibility (state, id) {
        const layers = state.layers;
        const layer  = layers[id];
        let invisible = [];
        let toggled = false;

        if (layer.parent) {
            toggled = reduceUp(layer.parent, layers, (toggled, parent) => {
                if (!parent.visible) {
                    return parent.visible = true;
                } else {
                    return toggled;
                }
            }, false);
        }

        if (!layer.visible || !toggled) {
            layer.visible = !layer.visible;

            // Mark all children visible / invisible
            eachDown(layer.children, layers, (child) => {
                child.visible = layer.visible;
            });
        }
    },

    toggleExpanded (state, id) {
        state.layers[id].expanded = !state.layers[id].expanded;
    },

    rehydrate (state, data, parent = null) {
        for (let i = 0, ii = data.length; i < ii; i++) {
            let layer = null;

            if (data[i].type === TYPE_LAYER) {
                layer = mutations.createLayer(state, {
                    ...data[i],
                    parent: parent,
                    children: []
                }, false);
            } else if (data[i].type === TYPE_PROPERTY) {
                layer = mutations.createProperty(state, {
                    ...data[i],
                    parent: parent,
                    children: []
                }, false);
            }

            if (data[i].children && data[i].children.length) {
                mutations.rehydrate(state, data[i].children, layer.id);
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
