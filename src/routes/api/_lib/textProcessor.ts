import type { CEFRLevel } from '$lib/types/CEFRLevel';

interface AdjustedText {
    result: string
}

export const textAdaptor = async function (text: string, targetLevel: CEFRLevel) {
	const response = await fetch('/api/v1/textProcessor/adaptor', {
		method: 'POST',
		body: JSON.stringify({ text, targetLevel })
	});

	const { result } = await response.json();
	return result;
};
