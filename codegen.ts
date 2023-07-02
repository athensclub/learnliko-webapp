import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://learnliko-api-develop-ruagc2uqxa-uc.a.run.app/v1/graphql',
	documents: ['src/**/*.svelte'],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/lib/types/gql/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;
