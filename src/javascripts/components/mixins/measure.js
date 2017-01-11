/*
 * Measure and save element size
 */

export default {

    mounted () {
        window.addEventListener('resize', this.measureSize, false);
        this.measureSize();
    },

    beforeDestroy () {
        window.removeEventListener('resize', this.measureSize, false);
    },

    data () {
        return {
            width: 0,
            height: 0
        };
    },

    methods: {

        /**
         * Measure and save element size
         */
        measureSize () {
            this.width = this.$el.offsetWidth;
            this.height = this.$el.offsetHeight;
        }

    }
};
