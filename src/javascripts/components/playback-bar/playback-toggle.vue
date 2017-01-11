<template>
    <a class="playback-toggle btn" v-on:click="toggle">
        <svg v-show="!playbackPlaying" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M349,456v20l20-10Z" transform="translate(-349 -456)"/></svg>
        <svg v-show="playbackPlaying" xmlns="http://www.w3.org/2000/svg" width="15.969" height="20" viewBox="0 0 15.969 20"><path d="M351,456h5.976v20H351V456Zm10,0h5.976v20H361V456Z" transform="translate(-351 -456)"/></svg>
    </a>
</template>

<script>
    import Vuex from 'vuex';

    export default {
        computed: {
            ...Vuex.mapGetters([
                'playbackPlaying'
            ])
        },
        methods: {
            toggle: function () {
                this.$store.dispatch('playbackToggle');
            }
        }
    }
</script>
