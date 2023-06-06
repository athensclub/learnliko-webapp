import type { RecapHistory } from '$lib/global/chatbox';
import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';

export const chat = async function (messages: ChatMessage[]) {
	const response = await fetch('/api/v1/conversation/chat', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	const { message } = await response.json();
	if (!message) throw new Error('No response from chat bot');

	return String(message);
};

/**
 * The output is a stream. It finishes when this function finishes (await assistantChat(...) is finished).
 * 
 * @param messages the message history to query assistant.
 * @param callback the function that is called each time it receives token through stream.
 * @see https://stackoverflow.com/a/74336207
 */
export const assistantChat = async function (messages: ChatMessage[], callback: (token: string) => void) {
	// modified from https://stackoverflow.com/a/74336207
	const response = await fetch('/api/v1/conversation/assistant', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	if (!response.body) throw new Error('No response from chat bot');

	const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		callback(value);
	}
};

export const analyzeDialog = async function (assistant: string, user: string) {
	const prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `Your are English professor, you are great at communication.You will always trying to provide helpful/useful tip and suggestion to the people who ask you.
		I want you to analyze the provided dialog.
		You have to analyze ME's response, then you will have to reply you analytics in the following JSON schema
		{
		// able to express clearly and coherently(scale 0-100)
		"clarity": number,
		// grammar correctness(scale 0-100)
		"grammar": number,
		// ability to comprehend spoken English and respond appropriately(scale 0-100)
		"appropriateness": number,
		// briefly overall suggestion and tip that I could improve, include the example
		"suggestion": strings
		}
		`
	});
	prompt.push({
		role: 'user',
		content: `A: “What is your name?”
		ME: “My name is Lucy”`
	});
	prompt.push({
		role: 'assistant',
		content: `{"clarity": 100,"grammar": 100,"appropriateness": 100,"suggestion": ""}`
	});
	prompt.push({
		role: 'user',
		content: `A: “${assistant}”
		ME: “${user}”`
	});

	let data:
		| { clarity: number; grammar: number; appropriateness: number; suggestion: string }
		| undefined;

	let attempt = 0;
	while (true) {
		try {
			const response = await chat(prompt);

			// gpt will response in JSON format, parse it to object
			data = JSON.parse(response);
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			console.error('error: parsing dialog analytic, retring...');
		}
	}

	if (!data) throw new Error('Error: failed analyze dialog');

	return { ...data, overallScore: (data.clarity + data.grammar + data.appropriateness) / 300 };
};

export const generateReadingItem = async (topic: string) => {
	let prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `Write me a story to be used for teaching student's reading skill. Write the story so that primary student can understand.
		The text must pass the following specifications:
		-Topic: ${topic}
		-Minimum length: 150 words
		You will have to reply in the following JSON schema format:
		{
		// title of the generated story
		"title": string,
		// the content of the story
		"content": string,
		}`
	});

	let item: { title: string, content: string } | null = null;
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

			console.error('error: generating reading item, retring...', response);
		}
	}

	if (!item)
		throw new Error("Failed to generate story topic: " + topic);

	const quiz: { question: string, choices: string[], answer: number }[] = [];

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
			let q: { question: string, choices: string[], answer: number } | null = null;
			while (true) {
				let response: string | null = null;
				try {
					response = await chat(p);

					// gpt will response in JSON format, parse it to object
					q = JSON.parse(response);

					p.push({
						role: 'assistant',
						content: response
					})
					p.push({
						role: 'user',
						content: `give me another one`
					})
					break;
				} catch (error) {
					// max attempt at 5
					if (attempt++ >= 5) break;

					console.error('error: generating quiz, retring...', response);
				}
			}

			if (!q)
				throw new Error("Failed to generate quiz for story with topic: " + topic);

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
	const vocabs = response.replace(".", "").split(",").map(s => s.trim().toLowerCase());

	const promises = [addQuiz('Write a 4 choices question with one correct answer to test the reader knowledge from a story that will be given and provide the correct answer.', 2),
	addQuiz('Write a 4 choices question with one correct answer to test the reader vocabulary knowledge from a story that will be given and provide the correct answer. Write a question asking the meaning of vocabularies found in the story.', 2),
	addQuiz('Write a 4 choices question with one correct answer to test the reader knowledge from a story that will be given and provide the correct answer. Write the question about a tone of voice from parts of the story.', 1)]
	await Promise.all(promises);

	return { ...item, quiz, vocabs };
}

export const getVocabsFromConversation = async (history: RecapHistory) => {
	const prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `You are English professor. I want you to analyze the provided dialog and give me all the useful vocabularies that you think the student would not have known in that said dialog. Answer the each word separated by comma and do not provide any other explanation or information. Do not use any punctuation other than comma.`
	});
	prompt.push({
		role: 'user',
		content: `A: Welcome to the shop how can I help you?
		B: Want to buy some pens, please.
		A: Sure, we have pens available. Our pens are 5฿ each. How many pens would you like to purchase?
		B: One.
		A: Great! We have one pen left in stock. Would you like to purchase it?
		B: Yes.`
	});
	prompt.push({
		role: 'assistant',
		content: `Welcome, shop, purchase, stock`
	});
	prompt.push({
		role: 'user',
		content: history.map(
			item => `A: ${item.assistant.transcription}\nB: ${item.user?.transcription}`
		).join("\n")
	})
	const response = await chat(prompt);
	return response.replace(".", "").split(",").map(s => s.trim().toLowerCase());
}

export const getConversations = async () => {
	const result = await fetch('/api/v1/conversation/queryAvailable', { method: 'GET' });
	const val: ConversationCarouselItem[] = await result.json();
	return val;
}
