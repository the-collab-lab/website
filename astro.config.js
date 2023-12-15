import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: 'auto',
	},
	integrations: [preact(), sitemap()],
	prefetch: {
		defaultStrategy: 'hover',
		prefetchAll: true,
	},
	server: {
		open: true,
		port: 3000,
	},
	site: 'https://the-collab-lab.codes/',
	telemetry: false,
});
