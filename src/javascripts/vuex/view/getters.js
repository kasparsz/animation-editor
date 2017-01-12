
// function getProjectionMatrix (p) {
//     return {
//         'to':   [p.scale.x, 0, 0, p.scale.y, p.translate.x, p.translate.y],
//         'from': [1 / p.scale.x, 0, 0, 1 / p.scale.y, -(1 / p.scale.x * p.translate.x), -(1 / p.scale.y * p.translate.y)]
//     };
// }

// export const screenProjectionMatrix = (state) => {
//     return getProjectionMatrix(state.projections.screen);
// };

// export const unitProjectionMatrix = (state) => {
//     return getProjectionMatrix(state.projections.unit);
// };

export const unitProjection = (state) => state.projections.unit;
export const screenProjection = (state) => state.projections.screen;

export const screenPan = (state) => state.projections.screen.translate;
export const screenZoom = (state) => state.projections.screen.scale;

export const contentSize = (state) => state.content;

export default {
    unitProjection,
    screenProjection,
    screenPan,
    screenZoom,
    contentSize
};
