import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'auto',
	},
	integrations: [preact()],
	server: {
		open: true,
		port: 3000,
	},
	site: 'https://the-collab-lab.codes/',
	telemetry: false,
});
