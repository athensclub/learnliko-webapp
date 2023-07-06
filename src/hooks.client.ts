import { isOnProduction } from '$lib/utils/environment';
import * as Sentry from '@sentry/sveltekit';

// Initialize Sentry SDK for error tracing on client side
if (isOnProduction()) {
	Sentry.init({
		dsn: 'https://c4397c7891ef474b8c7608f147e22d87@o4504690575605760.ingest.sentry.io/4505165088161792',
		// Performance Monitoring:
		tracesSampleRate: 1.0, // Capture 100% of the transactions. Adjust this value in production as necessary.
		// Session Replay
		integrations: [new Sentry.Replay()],
		replaysSessionSampleRate: 0.1, // This sets the Replay sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
		replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
	});
}
