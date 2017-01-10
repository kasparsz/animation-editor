<template>
    <div class="progress-bar" v-on:mousedown="dragstart($event, 'pan', screenPanUnits)" v-on:mousewheel="handleMouseWheel">
        <ul v-bind:style="{ transform: 'translateX(' + screenPan.x + 'px)'}" class="progress-bar__ticks">
            <li v-for="tick in ticks" v-bind:style="{ width: tick.width + 'px'}" class="progress-bar__tick">
                <span>{{ tick.label }}</span>
            </li>
        </ul>

        <slider-bar v-bind:min="playbackMinimum" v-bind:max="playbackMaximum" v-on:change="handlePlaybackRangeChange"></slider-bar>
        <playback-position></playback-position>
        <playback-toggle></playback-toggle>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Vector from '../utils/vector.js';
    import SliderBar from './slider-bar.vue';
    import PlaybackToggle from './playback-toggle.vue';
    import PlaybackPosition from './playback-position.vue';

    import Draggable from './draggable.js';
    import Measure from './measure.js';


    export default {
        mixins: [Draggable, Measure],

        components: {
            SliderBar,
            PlaybackToggle,
            PlaybackPosition
        },

        methods: {
            handlePlaybackRangeChange ({ property, value }) {
                if (property === 'min') {
                    this.$store.dispatch('playbackMinimum', value);
                } else {
                    this.$store.dispatch('playbackMaximum', value);
                }
            },

            handleMouseWheel (event) {
                const zoomX = this.screenZoom.x - event.deltaY / 10;
                this.$store.dispatch('viewZoom', {'x': zoomX, 'y': this.screenZoom.y});
            },

            dragmove (event) {
                Draggable.methods.dragmove.call(this, event);

                if (this.dragging) {
                    // View has screen based values, not unit based, we need to convert
                    const screenPan = this.dragValue.divide(this.unitProjection.scale).multiply(this.screenProjection.scale);
                    this.$store.dispatch('viewPan', {'x': screenPan.x, 'y': this.screenPan.y});
                }
            }
        },

        data () {
            return {
                width: 0
            };
        },

        computed: {
            ...Vuex.mapGetters([
                'unitProjection',
                'screenProjection',
                'screenPan',
                'screenZoom',

                'playbackMinimum',
                'playbackMaximum',
                'playbackLength'
            ]),

            screenPanUnits () {
                // Convert pan from screen based into unit based
                return Vector(this.screenPan).divide(this.screenProjection.scale).multiply(this.unitProjection.scale);
            },

            ticks () {
                const labels    = [];
                const units     = Vector(this.width, 0).divide(this.screenProjection.scale).multiply(this.unitProjection.scale).x;
                const maxunits  = Vector(this.width, 0).subtract(this.screenPan).divide(this.screenProjection.scale).multiply(this.unitProjection.scale).x;
                const median    = this.width ? 120 * units / this.width : 0;
                const divisions = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
                let   division;
                let   min       = 99999;

                for (let i = 0, ii = divisions.length; i < ii; i++) {
                    let diff = Math.abs(divisions[i] - median);

                    if (diff < min) {
                        min = diff;
                        division = divisions[i];
                    }
                }

                const rounding = Math.max(0, 4 - String(division).length);
                const width    = Vector(division, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).x;

                for (let i = 0, ii = Math.ceil(maxunits / division); i < ii; i++) {
                    labels.push({
                        'label': i === 0 ? '0' : (division / 1000 * i).toFixed(rounding),
                        'width': width
                    });
                }

                return labels;
            }
        }
    }
</script>
