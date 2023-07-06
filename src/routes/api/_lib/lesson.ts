import type {
	LanguageLevel,
	LessonCard,
	LessonCardsQueryInput,
	PersonalizedLessonCard
} from '$gql/generated/graphql';
import { QUERY_LESSON, QUERY_LESSONS_FEED } from '$gql/schema/queries';
import { graphqlClient } from '$lib/graphql';

export const getLessonCards = async (query?: LessonCardsQueryInput) => {
	const result = await graphqlClient.query(QUERY_LESSONS_FEED, { query }).toPromise();
	return result.data?.lessonCards.cards as PersonalizedLessonCard[];
};

export const getLessonById = async (id: string, uid: string, currentLevel: LanguageLevel) => {
	const result = await graphqlClient
		.query(QUERY_LESSON, { baseLevel: currentLevel, includeProgressOf: uid, lessonCardId: id })
		.toPromise();
	return result.data?.lessonCard as PersonalizedLessonCard;
};
