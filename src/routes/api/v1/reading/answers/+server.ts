import { queryReadingAnswers } from "$lib/server/reading";
import { json, type RequestHandler } from "@sveltejs/kit";

// TODO: make this more secure.
export const GET: RequestHandler = async ({ url }) => {
	const id = url.searchParams.get("id");
	if (!id)
		throw new Error("Please provide reading item id when requesting reading quiz answers.");
		
	const result = await queryReadingAnswers(id);
	return json(result);
};