import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			// See https://kit.svelte.dev/docs/adapter-cloudflare#options
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		}),
		alias: {
			// Access learnliko's api via SDK library
			$api: path.resolve('./src/routes/api/_lib')
		}
	}
};

export default config;
