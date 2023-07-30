import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'src/gql/schema/prototype.gql',
	// documents: ['src/gql/schema/**/*.ts'],
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
