import { queryReadingItems } from "$lib/server/reading";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const topic = url.searchParams.get("topic") ?? "All";
    const result = await queryReadingItems(topic);
    return json(result);
};