function getExpandedChildrenCount (children) {
    let expanded = 0;

    for (let i = 0, ii = children.length; i < ii; i++) {
        if (children[i].type === 'layer') {
            expanded++;

            if (children[i].children.length) {
                expanded += getExpandedChildrenCount(children[i].children);
            }
        } else if (children[i].type === 'property') {
            expanded++;
        }
    }

    return expanded;
}


export const layers = (state) => state.layers;
export const hierarchy = (state) => state.hierarchy;

export const selectedLayer = (state) => state.selectedLayer;
export const selectedProperty = (state) => state.selectedProperty;

export const expandedLayerCount = (state) => getExpandedChildrenCount(state.hierarchy);

export default {
    layers,
    hierarchy,

    selectedLayer,
    selectedProperty,

    expandedLayerCount
};
