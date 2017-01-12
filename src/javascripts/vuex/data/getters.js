function getExpandedChildrenCount (ids, layers) {
    let expanded = 0;

    for (let i = 0, ii = ids.length; i < ii; i++) {
        let layer = layers[ids[i]];

        if (layer.type === 'layer') {
            expanded++;

            if (layer.children.length && layer.expanded) {
                expanded += getExpandedChildrenCount(layer.children, layers);
            }
        } else if (layer.type === 'property') {
            expanded++;
        }
    }

    return expanded;
}


export const layers = (state) => state.layers;
export const root = (state) => state.root;

export const selectedLayer = (state) => state.selectedLayer;
export const selectedProperty = (state) => state.selectedProperty;

export const expandedLayerCount = (state) => getExpandedChildrenCount(state.root, state.layers);

export default {
    layers,
    root,

    selectedLayer,
    selectedProperty,

    expandedLayerCount
};
