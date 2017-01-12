<template>
    <li class="layer" v-bind:class="{ 'is-active': isActive, 'layer--property': isProperty, 'layer--invisible': !data.visible }">
        <div class="layer__inner" v-on:click="setActive">
            <a class="btn layer__vision" v-if="isLayer" v-on:click="toggleVisibility" v-bind:class="{ 'is-active': data.visible }">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8"><path fill-rule="evenodd" d="M4,9s2.991-4,7-4,7,4,7,4-2.943,4-7,4S4,9,4,9Zm7-3A3,3,0,1,1,8,9,3,3,0,0,1,11,6Z" transform="translate(-4 -5)"/><circle opacity="50" cx="7.563" cy="3.438" r=".531"/></svg>
            </a>

            <span class="layer__indent" v-bind:class="indentClassName"></span>

            <a class="btn layer__icon" v-if="isLayer" v-on:click="toggleExpanded">
                <svg v-if="icon === 'folder'" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18"><path fill="#8d1b45" class="cls-1" d="M2.011,0H9l3,3h8V15.978L0,15.971V2.107A2.036,2.036,0,0,1,2.011,0Z"/><path fill="#ff005e" class="cls-2" d="M0,5H20V15.99A1.921,1.921,0,0,1,18.015,18H1.988A1.922,1.922,0,0,1,0,15.99V5Z"/></svg>

                <svg v-if="icon === 'folder-open'" xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18"><path fill="#8d1b45" d="M2.011,0H9l3,3h8V15.978L0,15.971V2.107A2.036,2.036,0,0,1,2.011,0Z"/><path fill="#ff005e" d="M3,5H23L20,15.99A1.921,1.921,0,0,1,18.015,18H1.988A1.922,1.922,0,0,1,0,15.99Z"/></svg>

                <svg v-if="icon === 'item'" xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20"><path d="M2,0H14l4,4V18a1.959,1.959,0,0,1-2,2H2a1.959,1.959,0,0,1-2-2V2A1.959,1.959,0,0,1,2,0Z"/><path opacity=".16" fill="#000" d="M14,0V4h4Z"/></svg>
            </a>

            <div class="layer__title" v-on:dblclick="handleRenameStart">
                <span class="layer__title__text" v-if="!renaming">{{ data.title }}</span>
                <input class="layer__title__input" v-if="renaming"ref="input" type="text" v-bind:value="data.title" v-on:blur="handleRenameEnd" v-on:keyup.esc="handleRenameCancel" v-on:keyup.enter="handleRenameEnd" />
            </div>
        </div>

        <ul class="layer__children" v-if="data.expanded">
            <layer v-for="id in data.children" v-bind:data="layers[id]" v-bind:depth="depth+1"></layer>
        </ul>
    </li>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';

    export default {
        name: 'layer',
        props: ['data', 'depth'],

        data () {
            return {
                renaming: false
            };
        },

        computed: {
            ...Vuex.mapGetters([
                'layers',
                'selectedLayer',
                'selectedProperty'
            ]),

            indentClassName () {
                return {
                    [`layer__indent--${ this.depth }`]: true
                };
            },

            icon () {
                const { id, expanded } = this.data;
                const layers   = this.$store.getters.layers;
                const children = layers[id].children;
                let   icon     = 'item';

                if (children && children.length) {
                    for (let i = 0, ii = children.length; i < ii; i++) {
                        let child = layers[children[i]];

                        if (child.type === 'layer') {
                            icon = 'folder';
                            break;
                        }
                    }
                }

                if (icon === 'folder' && expanded) {
                    icon = 'folder-open';
                }

                return icon;
            },

            isProperty () {
                return this.data.type === 'property';
            },

            isLayer () {
                return this.data.type === 'layer';
            },

            isActive () {
                return (this.selectedLayer === this.data.id && !this.selectedProperty) || this.selectedProperty === this.data.id;
            }
        },

        methods: {
            handleRenameStart () {
                if (!this.renaming) {
                    this.renaming = true;

                    Vue.nextTick(() => {
                        this.$refs.input.focus();
                        this.$refs.input.select();
                    });
                }
            },

            handleRenameEnd (e) {
                if (this.renaming) {
                    const title = e.target.value.trim();

                    if (title) {
                        this.$store.dispatch('updateLayer', {
                            'id': this.data.id,
                            'title': title
                        });
                    }

                    this.renaming = false;
                }
            },

            handleRenameCancel (e) {
                this.renaming = false;
            },

            setActive (event) {
                if (!event.defaultPrevented) {
                    const { type, id } = this.data;

                    if (type === 'layer') {
                        this.$store.dispatch('selectLayer', id);
                    } else {
                        this.$store.dispatch('selectProperty', id);
                    }

                    event.preventDefault();
                }
            },

            toggleVisibility (event) {
                this.$store.dispatch('toggleVisibility', this.data.id);
                event.preventDefault();
            },

            toggleExpanded (event) {
                this.$store.dispatch('toggleExpanded', this.data.id);
                event.preventDefault();
            }
        }
    }
</script>
