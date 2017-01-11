/*
 * Draggable mixin
 */

import Vuex from 'vuex';
import Vector from '../../utils/vector.js';
import { closest } from '../../utils/dom.js';

export default {

    mounted () {
        window.addEventListener('mouseup', this.dragMouseUp, false);
        window.addEventListener('mousemove', this.dragmove, false);
    },
    beforeDestroy () {
        window.removeEventListener('mouseup', this.dragMouseUp, false);
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
         * On mouse down check if we need to start dragging
         *
         * @param {object} event Event
         * @param {string} property Property name
         * @param {number} value Property start value
         * @protected
         */
        drag (event, property, value) {
            if (this.dragvalidate(event, property, value)) {
                event.preventDefault();
                this.dragstart(event, property, value);
            }
        },

        /**
         * On mouse up trigger drag end if we were dragging
         *
         * @param {object} e Event
         * @protected
         */
        dragMouseUp (event) {
            if (this.dragging) {
                this.dragend(event);
            }
        },

        /**
         * Returns drag delta vector in units
         *
         * @param {object} event Event
         * @protected
         */
        getDragDelta (event) {
            const deltaX = event.clientX - this.dragstartClientX;
            const deltaY = event.clientY - this.dragstartClientY;

            return Vector(deltaX, deltaY).divide(this.screenProjection.scale).multiply(this.unitProjection.scale);
        },


        /**
         * Validate drag start
         *
         * @param {object} event Event
         * @param {string} property Property name
         * @param {number} value Property start value
         * @returns {boolean} True if drag should be performed, otherwise false
         */
        dragvalidate (event) {
            return event.which === 1 && !event.defaultPrevented;
        },

        /**
         * Start dragging
         *
         * @param {object} event Event
         * @param {string} property Property name
         * @param {number} value Property start value
         */
        dragstart (event, property, value) {
            this.dragging = true;
            this.dragstartClientX = event.clientX;
            this.dragstartClientY = event.clientY;
            this.dragProperty = property;
            this.dragValue = this.dragstartValue = Vector(value);

            this.dragTarget = closest(event.target, '.draggable') || event.target;
            this.dragTarget.classList.add('is-dragging');
        },

        /**
         * Handle drag end
         *
         * @param {object} event Event
         */
        dragend (event) {
            this.dragTarget.classList.remove('is-dragging');

            this.dragging = false;
            this.dragValue = null;
            this.dragstartValue = null;
            this.dragTarget = null;
        },

        /**
         * Handle dragging
         *
         * @param {object} event Event
         */
        dragmove (event) {
            if (this.dragging) {
                this.dragValue = this.getDragDelta(event).add(this.dragstartValue);
            }
        }
    }
};
