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
