import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    server: {
        proxy: {
            '/api': {
                target: 'https://realms.martenm.nl',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api'),
                secure: false, // if your cert is self-signed; otherwise remove this
            },
        },
    },
});
