import { queryReadingItemById, queryReadingItems } from "$lib/server/reading";
import type { Mode } from "$lib/types/mode";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");
    if (topic && id) {
        throw error(400, "reading request can not have both id and topics search params.");
    }

    const mode = url.searchParams.get("mode");
    if(!mode){
        throw error(400, "Please provide mode when querying reading item");
    }

    if (topic) {
        const result = await queryReadingItems(topic, mode as Mode);
        return json(result);
    } else if (id) {
        const result = await queryReadingItemById(id);
        if (!result) {
            throw error(404, "no reading items with id: " + id);
        }
        return json(result);
    } else {
        throw error(400, "no correct parameters provided");
    }
};