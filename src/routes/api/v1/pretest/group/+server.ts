import { queryPretestQuestionGroup } from "$lib/server/pretest";
import type { PretestCEFRLevel } from "$lib/types/pretest";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const level = url.searchParams.get("level");
    if(!level)
        throw error(400, "Please provide desired CEFR level difficulty when querying pretest question group.");

    const result = await queryPretestQuestionGroup(level as PretestCEFRLevel);
    return json(result);
}