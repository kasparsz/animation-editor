<template>
    <div class="slider-bar"             v-bind:style="{ transform: 'translateX(' + offset + 'px)'}">
        <div class="slider-bar__handle" v-on:mousedown="dragstart($event, 'min', {x: min, y: 0})"></div>
        <div class="slider-bar__line"   v-bind:style="{ transform: 'scaleX(' + width + ')'}"></div>
        <div class="slider-bar__handle" v-on:mousedown="dragstart($event, 'max', {x: max, y: 0})" v-bind:style="{ transform: 'translateX(' + width + 'px)'}"></div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Vector from '../utils/vector.js';
    import Draggable from './draggable.js';

    export default {
        mixins: [Draggable],

        props: ['min', 'max'],

        computed: {
            ...Vuex.mapGetters([
                'unitProjection',
                'screenProjection',
                'screenPan'
            ]),

            offset () {
                return Vector(this.min, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).add(this.screenPan).x;
            },

            width () {
                return Vector(this.max - this.min, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).x;
            }
        },

        methods: {
            dragmove (e) {
                Draggable.methods.dragmove.call(this, e);

                if (this.dragging) {
                    this.$emit('change', {
                        'property': this.dragProperty,
                        'value': this.dragValue.x
                    });
                }
            }
        }
    }
</script>
