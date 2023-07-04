import { queryLessonCards } from '$lib/server/lesson';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const result = await queryLessonCards();
	return json(result);
};
