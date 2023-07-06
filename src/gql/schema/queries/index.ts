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

export const QUERY_LESSON = graphql(`
	query LessonCard($lessonCardId: ID!, $baseLevel: LanguageLevel!, $includeProgressOf: ID) {
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
