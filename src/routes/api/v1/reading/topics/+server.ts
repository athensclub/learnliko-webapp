import { queryReadingTopics } from "$lib/server/reading";
import type { CEFRLevel } from "$lib/types/CEFRLevel";
import type { Mode } from "$lib/types/mode";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get("mode");
	const level = url.searchParams.get("level");
	if (!mode)
		throw new Error("Please provide mode when requesting reading topics.");
	if (!level)
		throw new Error("Please provide level when requesting reading topics.");

	const result = await queryReadingTopics(mode as Mode, level as CEFRLevel);
	return json(result);
};
