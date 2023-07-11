import { graphql } from '$gql/generated';

export const QUERY_LESSONS_FEED = graphql(`
	query LessonCards($query: LessonCardsQueryInput) {
		lessonCards(query: $query) {
			cards {
				progress
				difficulty
				card {
					id
					title
					description
					backgroundUrl
					exp
					intro {
						message
						bot {
							avatarModels {
								neutral
							}
							accent
							gender
						}
					}
				}
			}
		}
	}
`);

export const GET_LESSON_WITHOUT_CONTENT = graphql(`
	query LessonCardWithoutContent(
		$lessonCardId: ID!
		$baseLevel: LanguageLevel!
		$includeProgressOf: ID
	) {
		lessonCard(id: $lessonCardId, baseLevel: $baseLevel, includeProgressOf: $includeProgressOf) {
			progress
			difficulty
			card {
				id
				title
				description
				intro {
					bot {
						avatarModels {
							neutral
						}
						accent
						gender
					}
					message
				}
				backgroundUrl
				exp
			}
		}
	}
`);

export const GET_LESSON = graphql(`
	query LessonCard($lessonCardId: ID!, $baseLevel: LanguageLevel!, $includeProgressOf: ID) {
		lessonCard(id: $lessonCardId, baseLevel: $baseLevel, includeProgressOf: $includeProgressOf) {
			card {
				id
				title
				description
				intro {
					bot {
						id
						name
						avatarModels {
							neutral
							joy
							trust
							fear
							surprise
							sadness
							disgust
							anger
							anticipation
						}
						accent
						gender
					}
					message
					transcription
				}
				backgroundUrl
				level
				exp
				coin
				narratives {
					illustrationUrl
					text
				}
				ambientAudio
				quizeSections {
					title
					type
					cards {
						id
						totalExp
						totalCoin
						type
						level
						fromLesson
						... on VocabularyCard {
							id
							totalExp
							totalCoin
							type
							level
							fromLesson
							imageUrl
							vocab: choices {
								vocab
								transcriptionUrl
							}
						}
						... on SentenceCard {
							id
							totalExp
							totalCoin
							type
							level
							fromLesson
							question
							choices
						}
						... on ReadingCard {
							id
							totalExp
							totalCoin
							type
							level
							fromLesson
							title
							topics
							pages {
								text
								illustrationUrl
							}
							questions {
								question
								choices
								exp
								coin
							}
						}
						... on ConversationCard {
							id
							context
							totalExp
							totalCoin
							type
							level
							fromLesson
							title
							backgroundUrl
							learner {
								mission
								goal {
									goal
									hint
									exp
									coin
								}
							}
							bot {
								intro
								prompt
								avatar {
									id
									name
									avatarModels {
										neutral
										joy
										trust
										fear
										surprise
										sadness
										disgust
										anger
										anticipation
									}
									accent
									gender
								}
							}
						}
					}
				}
			}
			progress
			status
			difficulty
		}
	}
`);
