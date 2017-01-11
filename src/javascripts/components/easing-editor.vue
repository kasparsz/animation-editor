<template>
    <div class="editor easing-editor">
        <header class="editor__header">
            <toolbar></toolbar>
            <playback-bar></playback-bar>
        </header>
        <div class="editor__content">
            <layer-list></layer-list>
        </div>
    </div>
</template>

<script>
    import PlaybackBar from './playback-bar/playback-bar.vue';
    import Toolbar from './toolbar/toolbar.vue';
    import LayerList from './layer-list/layer-list.vue';

    export default {
        components: { PlaybackBar, Toolbar, LayerList }
    }
</script>
