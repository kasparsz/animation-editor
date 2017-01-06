<template>
    <div class="slider-bar"             v-bind:style="{ transform: 'translateX(' + offset + 'px)'}">
        <div class="slider-bar__handle"></div>
        <div class="slider-bar__line"   v-bind:style="{ transform: 'scaleX(' + width + ')'}"></div>
        <div class="slider-bar__handle" v-bind:style="{ transform: 'translateX(' + width + 'px)'}"></div>
    </div>
</template>

<script>
    export default {
        props: ['width', 'offset']
    }
</script>
