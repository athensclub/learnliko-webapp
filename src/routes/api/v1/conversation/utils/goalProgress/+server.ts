import { isDialogueAchieveGoal } from '$lib/server/conversation';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { dialogue, goal } = await request.json();
	if (!dialogue) throw error(400, `Error: No dialogue provided`);
	if (!goal) throw error(400, `Error: No goal provided`);

	try {
		const result = await isDialogueAchieveGoal(dialogue, goal);
		return json(result);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
