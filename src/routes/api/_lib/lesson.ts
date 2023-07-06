import type {
	LanguageLevel,
	LessonCard,
	LessonCardsQueryInput,
	PersonalizedLessonCard
} from '$gql/generated/graphql';
import { GET_LESSON, GET_LESSON_WITHOUT_CONTENT, QUERY_LESSONS_FEED } from '$gql/schema/queries';
import { graphqlClient } from '$lib/graphql';

export const getLessonCards = async (query?: LessonCardsQueryInput) => {
	const result = await graphqlClient.query(QUERY_LESSONS_FEED, { query }).toPromise();
	return result.data?.lessonCards.cards as PersonalizedLessonCard[];
};

export const getLessonById = async (
	id: string,
	currentLevel: LanguageLevel,
	uid?: string,
	includeContent = false
) => {
	const result = await graphqlClient
		.query(includeContent ? GET_LESSON : GET_LESSON_WITHOUT_CONTENT, {
			baseLevel: currentLevel,
			includeProgressOf: uid,
			lessonCardId: id
		})
		.toPromise();
	return result.data?.lessonCard as PersonalizedLessonCard;
};