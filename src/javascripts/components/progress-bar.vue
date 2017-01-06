<template>
    <div class="progress-bar">
        <ul v-bind:style="{ transform: 'translateX(' + screenPan.x + 'px)'}" class="progress-bar__ticks">
            <li v-for="tick in ticks" v-bind:style="{ width: tick.width + 'px'}" class="progress-bar__tick">
                <span>{{ tick.label }}</span>
            </li>
        </ul>

        <slider-bar v-bind:offset="progress.offset" v-bind:width="progress.width"></slider-bar>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Vector from '../utils/vector.js';
    import SliderBar from './slider-bar.vue';

    export default {
        components: {
            SliderBar
        },

        mounted () {
            this.handleResize();
            window.addEventListener('resize', this.handleResize, false);
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.handleResize, false);
        },

        methods: {
            handleResize () {
                this.width = this.$el.offsetWidth;
            }
        },

        data () {
            return {
                width: 0
            };
        },

        computed: {
            ...Vuex.mapGetters(['unitProjection', 'screenProjection', 'screenPan', 'playbackPosition', 'playbackMinimum', 'playbackMaximum', 'playbackLength']),
            // unitProjection () { return this.$store.getters.unitProjection; },
            // screenProjection () { return this.$store.getters.screenProjection; },
            // screenPan () { return this.$store.getters.screenPan; },

            // playbackPosition () { return this.$store.getters.playbackPosition; },
            // playbackMinimum () { return this.$store.getters.playbackMinimum; },
            // playbackMaximum () { return this.$store.getters.playbackMaximum; },
            // playbackLength () { return this.$store.getters.playbackLength; },

            ticks () {
                const labels    = [];
                const minsize   = 80;
                const maxsize   = 160;
                const units     = Vector(this.width, 0).divide(this.screenProjection.scale).multiply(this.unitProjection.scale).x;
                const divisions = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
                let   division;

                for (let i = 0, ii = divisions.length; i < ii; i++) {
                    let min = units / this.width * minsize;
                    let max = units / this.width * maxsize;

                    if (min <= divisions[i] && max > divisions[i]) {
                        division = divisions[i];
                        break;
                    }
                }

                if (!division) {
                    division = divisions[0];
                }

                const rounding = Math.max(0, 4 - String(division).length);
                const width    = Vector(division, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).x;

                for (let i = 0, ii = Math.ceil(units / division); i < ii; i++) {
                    labels.push({
                        'label': (division / 1000 * i).toFixed(rounding),
                        'width': width
                    });
                }

                return labels;
            },

            progress () {
                const min = this.playbackMinimum;
                const max = this.playbackMaximum;
                const offset = Vector(min, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).add(this.screenPan).x;
                const width  = Vector(max - min, 0).divide(this.unitProjection.scale).multiply(this.screenProjection.scale).x;

                return {
                    'width': width,
                    'offset': offset
                }
            }
        }
    }
</script>
