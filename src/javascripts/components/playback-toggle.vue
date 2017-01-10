<template>
    <a class="playback-toggle" v-on:click="toggle">
        <span class="icon" v-bind:class="{ 'icon--play': !playbackPlaying, 'icon--pause': playbackPlaying }"></span>
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
