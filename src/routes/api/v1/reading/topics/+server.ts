import { queryReadingTopics } from "$lib/server/reading";
import type { Mode } from "$lib/types/mode";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get("mode");
	if (!mode)
		throw new Error("Please provide mode when requesting reading topics.");
		
	const result = await queryReadingTopics(mode as Mode);
	return json(result);
};
