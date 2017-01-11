<template>
    <div class="slider-bar" v-bind:style="{ transform: 'translateX(' + offset + 'px)'}">

        <div class="slider-bar__line draggable"
             v-on:mousedown="drag($event, 'line', {x: min, y: 0})"
             v-bind:style="{ transform: 'scaleX(' + width + ')'}"></div>

        <div class="slider-bar__handle draggable"
             v-on:mousedown="drag($event, 'min',  {x: min, y: 0})"></div>

        <div class="slider-bar__handle draggable"
             v-on:mousedown="drag($event, 'max',  {x: max, y: 0})"
             v-bind:style="{ transform: 'translateX(' + width + 'px)'}"></div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Vector from '../../utils/vector.js';
    import Draggable from '../mixins/draggable.js';

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
            /**
             * Start dragging
             *
             * @param {object} event Event
             * @param {string} property Property name
             * @param {number} value Property start value
             */
            dragstart (event, property, value) {
                Draggable.methods.dragstart.call(this, event, property, value);

                if (property === 'line') {
                    this.dragstartValueDelta = this.max - this.min;
                }
            },

            /**
             * Handle dragging
             *
             * @param {object} event Event
             */
            dragmove (event) {
                Draggable.methods.dragmove.call(this, event);

                if (this.dragging) {
                    const value = Math.max(0, this.dragValue.x);

                    if (this.dragProperty === 'line') {
                        this.$emit('change', {
                            'property': this.dragProperty,
                            'min': value,
                            'max': value + this.dragstartValueDelta
                        });
                    } else {
                        this.$emit('change', {
                            'property': this.dragProperty,
                            'value': value,
                            [this.dragProperty]: value
                        });
                    }
                }
            }
        }
    }
</script>
