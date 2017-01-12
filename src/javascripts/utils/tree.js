export function reduceUp (id, layers, fn, initial = {}) {
    let ids  = typeof id === 'number' ? [id] : [].concat(id);
    let data = initial;
    let visited = {};

    for (let i = 0, ii = ids.length; i < ii; i++) {
        let id = ids[i];

        while (id) {
            if (!visited[id]) {
                visited[id] = true;

                let layer = layers[id];
                data = fn(data, layer, id);

                id = layer.parent;
            } else {
                break;
            }
        }
    }

    return data;
}

export function reduceDown (id, layers, fn, initial = {}) {
    let ids  = typeof id === 'number' ? [id] : [].concat(id);
    let data = initial;

    for (let i = 0, ii = ids.length; i < ii; i++) {
        let id    = ids[i];
        let layer = layers[id];

        data = fn(data, layer, id);

        if (layer.children && layer.children.length) {
            data = reduceDown(layer.children, layers, fn, data);
        }
    }

    return data;
}

export function eachUp (id, layers, fn) {
    reduceUp(id, layers, (data, layer, id) => fn(layer, id));
}

export function eachDown (id, layers, fn) {
    reduceDown(id, layers, (data, layer, id) => fn(layer, id));
}


export default {
    reduceUp,
    reduceDown,

    eachUp,
    eachDown
};
