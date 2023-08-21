import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			scss: {
				prependData: '@use "src/variables.scss" as *;'
			}
		})
	],

	kit: {
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({ }),
		alias: {
			// Access learnliko's api via SDK library
			$api: path.resolve('./src/routes/api/_lib'),

			// Generated type of GraphQL Schema
			$gql: path.resolve('./src/gql'),

			// Assets used in the project
			$asset: path.resolve('./src/asset')
		}
	}
};

export default config;
