import { graphql } from '$gql/generated';

export const CREATE_USER_ACCOUNT = graphql(`
	mutation CreateUserAccount($data: UserCreateDataInput!) {
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

export const RECAP_VOCAB_QUIZ = graphql(`
	mutation RecapVocabQuiz($data: VocabularyRecapCreateDataInput!, $uid: ID!) {
		vocabularyRecapCreate(data: $data, uid: $uid) {
			correct
		}
	}
`);

export const RECAP_SENTENCE_QUIZ = graphql(`
	mutation RecapSentenceQuiz($uid: ID!, $data: SentenceRecapCreateDataInput!) {
		sentenceRecapCreate(uid: $uid, data: $data) {
			correct
		}
	}
`);

export const RECAP_READING_QUIZ = graphql(`
	mutation RecapReadingQuiz($data: ReadingRecapCreateDataInput!, $uid: ID!) {
		readingRecapCreate(data: $data, uid: $uid) {
			totalCorrect
			answer {
				userAnswer
				answerIndex
				correct
			}
		}
	}
`);

export const RECAP_CONVERSATION_QUIZ = graphql(`
	mutation RecapConversationQuiz($data: ConversationRecapCreateDataInput!, $uid: ID!) {
		conversationRecapCreate(data: $data, uid: $uid) {
			correctPercentage
		}
	}
`);

export const UPDATE_LESSON_PROGRESS = graphql(`
	mutation LessonProgressUpdate($data: LessonProgressUpdateDataInput!, $uid: ID!) {
		lessonProgressUpdate(data: $data, uid: $uid) {
			id
		}
	}
`);
