<template>
    <div class="layer-list">
        <ul class="layer-list__inner">
            <layer v-for="layer in hierarchy" v-bind:data="layer" v-bind:depth="0"></layer>
        </ul>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import Layer from './layer.vue';

    export default {
        components: {
            Layer
        },

        computed: {
            ...Vuex.mapGetters([
                'hierarchy',

                'selectedLayer',
                'selectedProperty'
            ]),
        }
    }
</script>
