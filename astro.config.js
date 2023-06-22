import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'auto',
	},
	integrations: [preact()],
	vite: {
		server: {
			open: true,
		},
	},
	site: 'https://the-collab-lab.codes/',
});
