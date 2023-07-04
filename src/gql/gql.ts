/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\tmutation Mutation($data: UserCreateDataInput!) {\n\t\t\tuserCreate(data: $data) {\n\t\t\t\tuid\n\t\t\t\tusername\n\t\t\t\tprofile {\n\t\t\t\t\timageUrl\n\t\t\t\t\tcoverUrl\n\t\t\t\t\tfullname\n\t\t\t\t\tfirstname\n\t\t\t\t\tlastname\n\t\t\t\t}\n\t\t\t\tlanguageLevel {\n\t\t\t\t\toverall {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tvocabulary {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tgrammar {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tcommunication {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcoin\n\t\t\t\texp\n\t\t\t\tclassRoom {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.MutationDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\tmutation Mutation($data: UserCreateDataInput!) {\n\t\t\tuserCreate(data: $data) {\n\t\t\t\tuid\n\t\t\t\tusername\n\t\t\t\tprofile {\n\t\t\t\t\timageUrl\n\t\t\t\t\tcoverUrl\n\t\t\t\t\tfullname\n\t\t\t\t\tfirstname\n\t\t\t\t\tlastname\n\t\t\t\t}\n\t\t\t\tlanguageLevel {\n\t\t\t\t\toverall {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tvocabulary {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tgrammar {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tcommunication {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcoin\n\t\t\t\texp\n\t\t\t\tclassRoom {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation Mutation($data: UserCreateDataInput!) {\n\t\t\tuserCreate(data: $data) {\n\t\t\t\tuid\n\t\t\t\tusername\n\t\t\t\tprofile {\n\t\t\t\t\timageUrl\n\t\t\t\t\tcoverUrl\n\t\t\t\t\tfullname\n\t\t\t\t\tfirstname\n\t\t\t\t\tlastname\n\t\t\t\t}\n\t\t\t\tlanguageLevel {\n\t\t\t\t\toverall {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tvocabulary {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tgrammar {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t\tcommunication {\n\t\t\t\t\t\tprogress\n\t\t\t\t\t\tlevel\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tcoin\n\t\t\t\texp\n\t\t\t\tclassRoom {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;