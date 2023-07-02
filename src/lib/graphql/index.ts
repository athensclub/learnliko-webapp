import { Client, cacheExchange, fetchExchange } from '@urql/svelte';

const client = new Client({
	url: 'https://learnliko-api-develop-ruagc2uqxa-uc.a.run.app/v1/graphql',
	exchanges: [cacheExchange, fetchExchange]
});
