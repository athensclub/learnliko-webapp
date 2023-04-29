import { isOnProduction } from '$lib/utils/environment';
import type { Handle } from '@sveltejs/kit';

const _whitelist = isOnProduction()
	? ['https://learnliko.pages.dev']
	: [
			'http://localhost:5173',
			'http://[::]:5173',
			'https://staging.learnliko.pages.dev',
			'https://learnliko.netlify.app'
	  ];

export const handle: Handle = async ({ resolve, event }) => {
	const response = await resolve(event);

	// Apply CORS header for API routes
	if (event.url.pathname.startsWith('/api')) {
		const isOnWhitelist = _whitelist.includes(event.url.origin);

		// If isn't on the whitelist return Unauthorized response
		if (!isOnWhitelist) {
			return new Response('Unauthorized', { status: 401 });
		}
	}

	return response;
};
