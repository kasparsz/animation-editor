/*
 * Draggable mixin
 */

import Vuex from 'vuex';
import Vector from '../utils/vector.js';

export default {

    mounted () {
        window.addEventListener('mouseup', this.dragend, false);
        window.addEventListener('mousemove', this.dragmove, false);
    },
    beforeDestroy () {
        window.removeEventListener('mouseup', this.dragend, false);
        window.removeEventListener('mousemove', this.dragmove, false);
    },

    computed: {
        ...Vuex.mapGetters([
            'unitProjection',
            'screenProjection',
            'screenPan'
        ])
    },

    data () {
        return {
            dragging: false,
            dragstartValue: 0,
            dragstartClientX: 0,
            dragValue: 0,
            dragProperty: ''
        };
    },

    methods: {
        /**
         * Validate drag start
         *
         * @param {object} event Event
         * @param {string} property Property name
         * @param {number} value Property start value
         * @returns {boolean} True if drag should be performed, otherwise false
         */
        dragvalidate (event) {
            return !event.defaultPrevented;
        },

        /**
         * Start dragging
         *
         * @param {object} event Event
         * @param {string} property Property name
         * @param {number} value Property start value
         */
        dragstart (event, property, value) {
            if (this.dragvalidate(event, property, value)) {
                this.dragging = true;
                this.dragstartClientX = event.clientX;
                this.dragstartClientY = event.clientY;
                this.dragProperty = property;
                this.dragValue = this.dragstartValue = Vector(value);

                event.preventDefault();
            }
        },

        /**
         * Handle drag end
         *
         * @param {object} e Event
         */
        dragend (event) {
            if (this.dragging) {
                this.dragging = false;
                this.dragValue = null;
                this.dragstartValue = null;
            }
        },

        /**
         * Handle dragging
         *
         * @param {object} e Event
         */
        dragmove (event) {
            if (this.dragging) {
                const deltaX = event.clientX - this.dragstartClientX;
                const deltaY = event.clientY - this.dragstartClientY;

                this.dragValue = Vector(deltaX, deltaY).divide(this.screenProjection.scale).multiply(this.unitProjection.scale).add(this.dragstartValue);
            }
        }
    }
};
