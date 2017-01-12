<template>
    <div class="toolbar">
        <ul class="toolbar__tools">
            <li>
                <a class="btn" title="Create a new layer" v-on:click="createLayer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path d="M2,0H14l4,4V18a1.959,1.959,0,0,1-2,2H2a1.959,1.959,0,0,1-2-2V2A1.959,1.959,0,0,1,2,0ZM8,6h2V9h3v2H10v3H8V11H5V9H8V6Z" fill-rule="evenodd"/><path d="M14,0V4h4Z" opacity=".16" fill="#000"/></svg>
                </a>
            </li>
            <li>
                <a class="btn" title="Create a new property" v-bind:class="{ 'is-disabled': !selectedLayer }" v-on:click="createProperty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path d="M14 2h2V8H14V2zM12 4h6V6H12V4zM2 4h8V6H0A1.959 1.959 0 0 1 2 4zm12 6h2v8H13a.974.974 0 0 0 1-.981V10zM0 6H3A.961.961 0 0 0 2 7V20a1.959 1.959 0 0 1-2-2V6zM2 17a.969.969 0 0 0 .966 1H16a1.779 1.779 0 0 1-2 2H2V17z"/></svg>
                </a>
            </li>
            <li>
                <a class="btn" title="Delete" v-bind:class="{ 'is-disabled': !selectedLayer && !selectedProperty }" v-on:click="deleteLayer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path fill-rule="evenodd" d="M16,5V18a1.959,1.959,0,0,1-2,2H4a1.959,1.959,0,0,1-2-2V4.992ZM8,7h2V18H8V7Zm4,0h2V18H12V7ZM4,7H6V18H4V7Z"/><path d="M0 4H18V6H0z"/><path d="M7.957,0H9.972C11.379,0,12,0,12,1.941V4H6V1.989C6,0,6.466,0,7.957,0ZM8,2h2V4H8V2Z"/></svg>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vuex from 'vuex';


    export default {
        components: {
        },

        methods: {
            createLayer () {
                this.$store.dispatch('createLayer', {
                    'title': '[LAYER]',
                    'parent': this.selectedLayer
                });
            },
            createProperty () {
                this.$store.dispatch('createProperty', {
                    'title': '[PROPERTY]',
                    'parent': this.selectedLayer
                });
            },
            deleteLayer () {
                this.$store.dispatch('deleteLayer', this.selectedProperty || this.selectedLayer);
            }
        },

        computed: {
            ...Vuex.mapGetters([
                'selectedLayer',
                'selectedProperty'
            ]),
        }
    }
</script>
