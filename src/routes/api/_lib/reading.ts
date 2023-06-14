import type { ReadingItem } from '$lib/types/reading';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { chat } from './conversation';

export const getReadingItems = async (topic: string): Promise<ReadingItem[]> => {
	const response = await fetch('/api/v1/reading?' + new URLSearchParams({ topic }));
	const val = await response.json();
	return val;
};

export const getReadingItemById = async (id: string): Promise<ReadingItem> => {
	const response = await fetch('/api/v1/reading?' + new URLSearchParams({ id }));
	const val = await response.json();
	return val;
};

export const generateReadingItem = async (topic: string) => {
	let prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `Write me a article to be used for teaching professional worker's reading skill. Write the article so that primary worker can understand.
		The text must pass the following specifications:
		-Topic: ${topic}
		-Minimum length: 150 words
		You will have to reply in the following JSON schema format:
		{
		// title of the generated article
		"title": string,
		// the content of the article
		"content": string,
		}`
	});

	let item: { title: string; content: string } | null = null;
	let attempt = 0;
	while (true) {
		let response: any;
		try {
			response = await chat(prompt);

			// gpt will response in JSON format, parse it to object
			item = JSON.parse(response);
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			prompt.push({ role: 'user', content: 'reply in the provided json format only' });
			console.error('error: generating reading item, retring...', response);
		}
	}

	if (!item) throw new Error('Failed to generate story topic: ' + topic);

	const quiz: { question: string; choices: string[]; answer: number }[] = [];

	const addQuiz = async (brief: string, amt: number) => {
		const p: ChatMessage[] = [];
		p.push({
			role: 'user',
			content: `${brief}

			The story:
			${item?.content}
			
			You will have to reply in the following JSON schema format:
			{
			// question about the provided story
			"question": string,
			// 4 choices of the question
			"choices": string[],
			// the correct choices index of the "choices" property
			"answer": int
			}
			Do not provide any other text or explanation.`
		});

		for (let i = 0; i < amt; i++) {
			let q: { question: string; choices: string[]; answer: number } | null = null;
			while (true) {
				let response: string | null = null;
				try {
					response = await chat(p);

					// gpt will response in JSON format, parse it to object
					q = JSON.parse(response);

					p.push({
						role: 'assistant',
						content: response
					});
					p.push({
						role: 'user',
						content: `give me another one`
					});
					break;
				} catch (error) {
					// max attempt at 5
					if (attempt++ >= 5) break;

					console.error('error: generating quiz, retring...', response);
				}
			}

			if (!q) throw new Error('Failed to generate quiz for story with topic: ' + topic);

			quiz.push(q);
		}
	};

	prompt = [];
	prompt.push({
		role: 'user',
		content: `analyze the provided story and give me all the useful vocabularies that you think the student would not have known in that said story. Answer each word separated by comma and do not provide any other explanation or information. Do not use any punctuation other than comma.
		
		The story:
		${item.content}`
	});
	const response = await chat(prompt);
	const vocabs = response
		.replace('.', '')
		.split(',')
		.map((s) => s.trim().toLowerCase());

	const promises = [
		addQuiz(
			'Write a 4 choices question with one correct answer to test the reader knowledge from a story that will be given and provide the correct answer.',
			2
		),
		addQuiz(
			'Write a 4 choices question with one correct answer to test the reader vocabulary knowledge from a story that will be given and provide the correct answer. Write a question asking the meaning of vocabularies found in the story.',
			2
		),
		addQuiz(
			'Write a 4 choices question with one correct answer to test the reader knowledge from a story that will be given and provide the correct answer. Write the question about a tone of voice from parts of the story.',
			1
		)
	];
	await Promise.all(promises);

	return { ...item, quiz, vocabs };
};
