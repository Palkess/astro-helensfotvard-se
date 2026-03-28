// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://helensfotvard.se',
    integrations: [svelte()],
    build: {
        inlineStylesheets: 'auto'
    },

    vite: {
        plugins: [tailwindcss()],
        resolve: {
            noExternal: ['@lucide/svelte']
        }
    },

    prefetch: {
        prefetchAll: true
    }
});
