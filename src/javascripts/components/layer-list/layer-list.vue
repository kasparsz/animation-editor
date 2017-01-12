<template>
    <div class="layer-list" v-on:click="unsetActive" v-on:mousewheel="handleMouseWheel">
        <ul class="layer-list__inner" v-bind:style="{ transform: 'translateY(' + scroll + 'px)'}">
            <layer v-for="id in root" v-bind:data="layers[id]" v-bind:depth="0"></layer>
        </ul>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Layer from './layer.vue';
    import Vector from '../../utils/vector.js';
    import Measure from '../mixins/measure.js';


    export default {
        mixins: [Measure],

        components: {
            Layer
        },

        computed: {
            ...Vuex.mapGetters([
                'unitProjection',
                'screenProjection',
                'screenPan',

                'root',
                'layers',

                'selectedLayer',
                'selectedProperty',

                'expandedLayerCount',
                'contentSize'
            ]),

            scrollable () {
                return Math.max(0, this.expandedLayerCount * 40 - this.contentSize.height);
            },

            scroll () {
                const pan = Math.min(0, Math.max(-this.scrollable, this.screenPan.y));
                this.setPan(pan);
                return pan;
            }
        },

        methods: {
            unsetActive (event) {
                if (!event.defaultPrevented) {
                    this.$store.dispatch('selectLayer', null);
                }
            },

            handleMouseWheel (event) {
                this.setPan(Math.min(0, Math.max(-this.scrollable, this.screenPan.y - event.deltaY)));
                event.preventDefault();
            },

            setPan (pan) {
                if (pan !== this.screenPan.y) {
                    this.$store.dispatch('viewPan', {
                        'x': this.screenPan.x,
                        'y': pan
                    });
                }
            },

            measureSize () {
                Measure.methods.measureSize.call(this);
                this.$store.dispatch('contentSize', { width: this.width, height: this.height });
            }
        }
    }
</script>
