import { queryPretestQuizAnswer } from "$lib/server/pretest";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get("id");
    if (!id)
        throw error(400, "Please provide quiz id when querying pretest quiz answer");

    const result = await queryPretestQuizAnswer(id);
    return json({ answer: result });
}