import { defineConfig } from 'cypress';
// import vitePreprocessor from 'cypress-vite';
// import path from 'path';

export default defineConfig({
    projectId: '183vok',
    e2e: {
        setupNodeEvents(on, config) {
            // on('file:preprocessor', vitePreprocessor(path.resolve('./vite.config.ts')));
            return config;
        },
    },
});
