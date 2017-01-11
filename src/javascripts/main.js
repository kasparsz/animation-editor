import Vue from 'vue';
import App from './components/app.vue';
import store from './vuex/store';

window.v = new Vue({
    el: '#app',
    store,
    ...App
});

window.store = store;

store.dispatch('rehydrate', [
    {
        'type': 'layer',
        'title': 'Front elements',
        'expanded': false,
        'visible': false,
        'children': [
            {
                'type': 'layer',
                'title': '.fake',
            }
        ]
    },
    {
        'type': 'layer',
        'title': '.decoration',
        'expanded': true,
        'children': [
            {
                'type': 'layer',
                'title': ':before',
                'expanded': true,
                'children': [
                    {
                        'type': 'property',
                        'title': 'left'
                    },
                    {
                        'type': 'property',
                        'title': 'opacity'
                    }
                ]
            },
            {
                'type': 'layer',
                'title': ':after',
                'expanded': false,
                'children': []
            },
            {
                'type': 'layer',
                'title': '.border',
                'expanded': false,
                'children': []
            }
        ]
    }
]);
