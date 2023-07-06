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
    "\n\tmutation Mutation($data: UserCreateDataInput!) {\n\t\tuserCreate(data: $data) {\n\t\t\tuid\n\t\t\tusername\n\t\t\tprofile {\n\t\t\t\timageUrl\n\t\t\t\tcoverUrl\n\t\t\t\tfullname\n\t\t\t\tfirstname\n\t\t\t\tlastname\n\t\t\t}\n\t\t\tlanguageLevel {\n\t\t\t\toverall {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tvocabulary {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tgrammar {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tcommunication {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t}\n\t\t\tcoin\n\t\t\texp\n\t\t\tclassRoom {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.MutationDocument,
    "\n\tmutation VocabularyCardCreate($data: VocabularyCardCreateDataInput!) {\n\t\tvocabularyCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n": types.VocabularyCardCreateDocument,
    "\n\tmutation SentenceCardCreate($data: SentenceCardCreateDataInput!) {\n\t\tsentenceCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n  \t}\n": types.SentenceCardCreateDocument,
    "\n\tmutation ReadingCardCreate($data: ReadingCardCreateDataInput!) {\n\t\treadingCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n": types.ReadingCardCreateDocument,
    "\n\tmutation ConversationCardCreate($data: ConversationCardCreateDataInput!) {\n\t\tconversationCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n": types.ConversationCardCreateDocument,
    "\n\tmutation LessonCardCreate($data: LessonCardCreateDataInput!) {\n\t\tlessonCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n": types.LessonCardCreateDocument,
    "\n\tmutation BotAvatarCreate($data: BotAvatarDataInput!) {\n\t\tbotAvatarCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n": types.BotAvatarCreateDocument,
    "\n\tquery LessonCards($query: LessonCardsQueryInput) {\n\t\tlessonCards(query: $query) {\n\t\t\tcards {\n\t\t\t\tprogress\n\t\t\t\tdifficulty\n\t\t\t\tcard {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\tbackgroundUrl\n\t\t\t\t\texp\n\t\t\t\t\tintro {\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tbot {\n\t\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\taccent\n\t\t\t\t\t\t\tgender\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.LessonCardsDocument,
    "\n\tquery LessonCard($lessonCardId: ID!, $baseLevel: LanguageLevel!, $includeProgressOf: ID) {\n\t\tlessonCard(id: $lessonCardId, baseLevel: $baseLevel, includeProgressOf: $includeProgressOf) {\n\t\t\tprogress\n\t\t\tdifficulty\n\t\t\tcard {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tintro {\n\t\t\t\t\tbot {\n\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t}\n\t\t\t\t\t\taccent\n\t\t\t\t\t\tgender\n\t\t\t\t\t}\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\tbackgroundUrl\n\t\t\t\texp\n\t\t\t}\n\t\t}\n\t}\n": types.LessonCardDocument,
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
export function graphql(source: "\n\tmutation Mutation($data: UserCreateDataInput!) {\n\t\tuserCreate(data: $data) {\n\t\t\tuid\n\t\t\tusername\n\t\t\tprofile {\n\t\t\t\timageUrl\n\t\t\t\tcoverUrl\n\t\t\t\tfullname\n\t\t\t\tfirstname\n\t\t\t\tlastname\n\t\t\t}\n\t\t\tlanguageLevel {\n\t\t\t\toverall {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tvocabulary {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tgrammar {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tcommunication {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t}\n\t\t\tcoin\n\t\t\texp\n\t\t\tclassRoom {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Mutation($data: UserCreateDataInput!) {\n\t\tuserCreate(data: $data) {\n\t\t\tuid\n\t\t\tusername\n\t\t\tprofile {\n\t\t\t\timageUrl\n\t\t\t\tcoverUrl\n\t\t\t\tfullname\n\t\t\t\tfirstname\n\t\t\t\tlastname\n\t\t\t}\n\t\t\tlanguageLevel {\n\t\t\t\toverall {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tvocabulary {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tgrammar {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t\tcommunication {\n\t\t\t\t\tprogress\n\t\t\t\t\tlevel\n\t\t\t\t}\n\t\t\t}\n\t\t\tcoin\n\t\t\texp\n\t\t\tclassRoom {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation VocabularyCardCreate($data: VocabularyCardCreateDataInput!) {\n\t\tvocabularyCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation VocabularyCardCreate($data: VocabularyCardCreateDataInput!) {\n\t\tvocabularyCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation SentenceCardCreate($data: SentenceCardCreateDataInput!) {\n\t\tsentenceCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n  \t}\n"): (typeof documents)["\n\tmutation SentenceCardCreate($data: SentenceCardCreateDataInput!) {\n\t\tsentenceCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n  \t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ReadingCardCreate($data: ReadingCardCreateDataInput!) {\n\t\treadingCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ReadingCardCreate($data: ReadingCardCreateDataInput!) {\n\t\treadingCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation ConversationCardCreate($data: ConversationCardCreateDataInput!) {\n\t\tconversationCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ConversationCardCreate($data: ConversationCardCreateDataInput!) {\n\t\tconversationCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation LessonCardCreate($data: LessonCardCreateDataInput!) {\n\t\tlessonCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation LessonCardCreate($data: LessonCardCreateDataInput!) {\n\t\tlessonCardCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation BotAvatarCreate($data: BotAvatarDataInput!) {\n\t\tbotAvatarCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation BotAvatarCreate($data: BotAvatarDataInput!) {\n\t\tbotAvatarCreate(data: $data) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LessonCards($query: LessonCardsQueryInput) {\n\t\tlessonCards(query: $query) {\n\t\t\tcards {\n\t\t\t\tprogress\n\t\t\t\tdifficulty\n\t\t\t\tcard {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\tbackgroundUrl\n\t\t\t\t\texp\n\t\t\t\t\tintro {\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tbot {\n\t\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\taccent\n\t\t\t\t\t\t\tgender\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LessonCards($query: LessonCardsQueryInput) {\n\t\tlessonCards(query: $query) {\n\t\t\tcards {\n\t\t\t\tprogress\n\t\t\t\tdifficulty\n\t\t\t\tcard {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\tbackgroundUrl\n\t\t\t\t\texp\n\t\t\t\t\tintro {\n\t\t\t\t\t\tmessage\n\t\t\t\t\t\tbot {\n\t\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\taccent\n\t\t\t\t\t\t\tgender\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery LessonCard($lessonCardId: ID!, $baseLevel: LanguageLevel!, $includeProgressOf: ID) {\n\t\tlessonCard(id: $lessonCardId, baseLevel: $baseLevel, includeProgressOf: $includeProgressOf) {\n\t\t\tprogress\n\t\t\tdifficulty\n\t\t\tcard {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tintro {\n\t\t\t\t\tbot {\n\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t}\n\t\t\t\t\t\taccent\n\t\t\t\t\t\tgender\n\t\t\t\t\t}\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\tbackgroundUrl\n\t\t\t\texp\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery LessonCard($lessonCardId: ID!, $baseLevel: LanguageLevel!, $includeProgressOf: ID) {\n\t\tlessonCard(id: $lessonCardId, baseLevel: $baseLevel, includeProgressOf: $includeProgressOf) {\n\t\t\tprogress\n\t\t\tdifficulty\n\t\t\tcard {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t\tintro {\n\t\t\t\t\tbot {\n\t\t\t\t\t\tavatarModels {\n\t\t\t\t\t\t\tneutral\n\t\t\t\t\t\t}\n\t\t\t\t\t\taccent\n\t\t\t\t\t\tgender\n\t\t\t\t\t}\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t\tbackgroundUrl\n\t\t\t\texp\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;