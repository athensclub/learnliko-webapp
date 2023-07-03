import { error, json, type RequestHandler } from "@sveltejs/kit";
import { queryLessonById } from "$lib/server/lesson";

export const GET: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get("id");
    if (!id) 
        throw error(400, "Please provide id when querying lesson item.");

    const result = await queryLessonById(id);
    return json(result);    
}