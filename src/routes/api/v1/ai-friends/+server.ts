import { queryAIFriends } from '$lib/server/ai_friends';
import {  json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const result = await queryAIFriends();
	return json(result);
};
