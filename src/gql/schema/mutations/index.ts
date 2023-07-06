import { graphql } from '$gql/generated';

export const CREATE_USER_ACCOUNT = graphql(`
	mutation Mutation($data: UserCreateDataInput!) {
		userCreate(data: $data) {
			uid
			username
			profile {
				imageUrl
				coverUrl
				fullname
				firstname
				lastname
			}
			languageLevel {
				overall {
					progress
					level
				}
				vocabulary {
					progress
					level
				}
				grammar {
					progress
					level
				}
				communication {
					progress
					level
				}
			}
			coin
			exp
			classRoom {
				id
				name
			}
		}
	}
`);

export const CREATE_VOCAB_CARD = graphql(`
	mutation VocabularyCardCreate($data: VocabularyCardCreateDataInput!) {
		vocabularyCardCreate(data: $data) {
			id
		}
	}
`);

export const CREATE_SENTENCE_CARD = graphql(`
	mutation SentenceCardCreate($data: SentenceCardCreateDataInput!) {
		sentenceCardCreate(data: $data) {
			id
		}
  	}
`);

export const CREATE_READING_CARD = graphql(`
	mutation ReadingCardCreate($data: ReadingCardCreateDataInput!) {
		readingCardCreate(data: $data) {
			id
		}
	}
`);

export const CREATE_CONVERSATION_CARD = graphql(`
	mutation ConversationCardCreate($data: ConversationCardCreateDataInput!) {
		conversationCardCreate(data: $data) {
			id
		}
	}
`);

export const CREATE_LESSON_CARD = graphql(`
	mutation LessonCardCreate($data: LessonCardCreateDataInput!) {
		lessonCardCreate(data: $data) {
			id
		}
	}
`);

export const CREATE_BOT_AVATAR = graphql(`
	mutation BotAvatarCreate($data: BotAvatarDataInput!) {
		botAvatarCreate(data: $data) {
			id
		}
	}
`);


