import { isDialogueAchieveGoal } from '$lib/server/conversation';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { latest, history, goal } = await request.json();
	if (!latest) throw error(400, `Error: No latest chat dialogue provided`);
	if (!goal) throw error(400, `Error: No goal provided`);

	try {
		const result = await isDialogueAchieveGoal(latest, history, goal);
		return json(result);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
