<template>
    <span class="playback-position" v-bind:style="{ transform: 'translateX(' + offset + 'px)'}" v-on:mousedown="dragstart($event, 'position', {x: playbackPosition, y: 0})">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="22" viewBox="0 0 19 22"><path d="M21.488,23s5.524-5.986,7.518-6.993A3.57,3.57,0,0,0,31,13V2.942A2,2,0,0,0,28.914,1H13.948A1.906,1.906,0,0,0,12,2.945V13a3.321,3.321,0,0,0,2.013,2.966C16.1,16.941,21.488,23,21.488,23ZM20.981,3.978h1v8.991h-1V3.978Zm-4,0h1v8.991h-1V3.978Zm8,0h1v8.991h-1V3.978Z" transform="translate(-12 -1)"/></svg>
    </span>
</template>

<script>
    import Vuex from 'vuex';
    import Draggable from './draggable.js';
    import Vector from '../utils/vector.js';

    export default {
        mixins: [Draggable],

        computed: {
            ...Vuex.mapGetters([
                'unitProjection',
                'screenProjection',
                'screenPan',

                'playbackPosition'
            ]),

            offset () {
                const position = this.playbackPosition;
                return Vector(position, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).add(this.screenPan).x;
            }
        },

        methods: {
            dragmove (e) {
                Draggable.methods.dragmove.call(this, e);

                if (this.dragging) {
                    this.$store.dispatch('playbackPosition', this.dragValue.x);
                }
            }
        }
    }
</script>
