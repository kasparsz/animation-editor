import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import globals from 'rollup-plugin-node-globals';

export default {
    format: 'iife',
    plugins: [
        vue(),
        buble({
            objectAssign: 'Object.assign'
        }),
        resolve({
            jsnext: true,
            browser: true,
            main: true
        }),
        commonjs({
            include: 'node_modules/**',
            sourceMap: false
        }),
        globals()
    ]
};
