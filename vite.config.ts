/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
        conditions: ['development', 'browser'],
    },
    plugins: [solidPlugin()],
    build: {
        target: 'esnext',
    },
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'c8',
        },
        transformMode: {
            web: [/.[jt]sx?/],
        },
        deps: {
            registerNodeLoader: true,
        },
    },
});
