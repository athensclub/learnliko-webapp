import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://learnliko-api-develop-ruagc2uqxa-uc.a.run.app/v1/graphql',
	documents: ['src/gql/schema/**/*.ts'],
	// ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/gql/generated/': {
			preset: 'client',
			plugins: [],
			config: {
				useTypeImports: true
			}
		}
	}
};

export default config;
