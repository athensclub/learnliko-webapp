import { isOnProduction } from '$lib/utils/environment';
import type { Handle } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

const _whitelist: string[] = isOnProduction()
	? ['https://learnliko.pages.dev', 'https://learnliko.netlify.app', 'https://app.learnliko.com']
	: [
			'http://localhost:5173',
			'http://localhost:4173',
			'http://[::]:5173',
			'http://192.168.2.25:5173',
			'http://127.0.0.1:5173',
			'https://staging.learnliko.pages.dev',
			'https://staging--learnliko.netlify.app'
	  ];

// Initialize Sentry SDK for error tracing on server side
if (isOnProduction()) {
	Sentry.init({
		dsn: 'https://c4397c7891ef474b8c7608f147e22d87@o4504690575605760.ingest.sentry.io/4505165088161792',
		// Performance Monitoring
		tracesSampleRate: 1.0 // Capture 100% of the transactions. Adjust this value in production as necessary.
	});
}

export const handle: Handle = async ({ resolve, event }) => {
	const response = await resolve(event);

	// Apply CORS header for API routes
	if (isOnProduction() && event.url.pathname.startsWith('/api')) {
		const isOnWhitelist = _whitelist.includes(event.url.origin);

		// If isn't on the whitelist return Unauthorized response
		if (!isOnWhitelist) {
			console.log(event.url.origin);
			return new Response('Unauthorized', { status: 401 });
		}
	}

	return response;
};
