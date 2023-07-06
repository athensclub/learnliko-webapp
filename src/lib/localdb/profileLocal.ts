/**
 * Profile APIs implemented using IndexDB (For demo/testing only).
 */
import { getConversations } from '$api/conversation';
import type {
	LearnedConversationItem,
	LearnedReadingItem,
	LearningDiaryItem
} from '$lib/types/learningDiary';
import { get, writable } from 'svelte/store';
import { completedConversations, type UserFinishedConversationItem } from './conversationLocal';
import type { FinishedReading } from '$lib/types/reading';
import { completedReadings } from './readingLocal';
import { getReadingItems } from '$api/reading';
import { browser } from '$app/environment';
import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';

const CEFRLevelLocal = browser
	? persist(writable<string>(''), createIndexedDBStorage(), 'CEFRLevel')
	: null;

export const usernameLocal = browser
	? persist(writable<string>('Guest'), createIndexedDBStorage(), 'username')
	: null;

export const profileImageLocal = browser
	? persist(
			writable<string>(
				'https://cdn.discordapp.com/attachments/842737146321174558/1122773960019423262/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
			),
			createIndexedDBStorage(),
			'profileImage'
	  )
	: null;

export const lastPlayedLessonIdLocal = browser
	? persist(writable<string | null>(null), createIndexedDBStorage(), 'lastPlayedLessonId')
	: null;

export const learnedVocabLocal = browser
	? persist(writable<string[]>([]), createIndexedDBStorage(), 'learnedVocabLocal')
	: null;

export const queryLearningDiariesLocal = async (): Promise<LearningDiaryItem[]> => {
	if (!completedConversations || !completedReadings)
		throw new Error('do not query local data from ssr');

	const conversations = await getConversations();
	const readings = await getReadingItems('All');

	const completedConv = get(completedConversations);
	const dateToConversations = new Map<string, UserFinishedConversationItem[]>();
	for (const item of completedConv) {
		const date = `${item.conversation.finishedTime.getDate()}.${
			item.conversation.finishedTime.getMonth() + 1
		}.${item.conversation.finishedTime.getFullYear()}`;
		if (!dateToConversations.has(date)) dateToConversations.set(date, []);
		dateToConversations.get(date)?.push(item);
	}

	const completedRs = get(completedReadings);
	const dateToReadingItems = new Map<string, FinishedReading[]>();
	for (const item of completedRs) {
		const date = `${item.finishedTime.getDate()}.${
			item.finishedTime.getMonth() + 1
		}.${item.finishedTime.getFullYear()}`;
		if (!dateToReadingItems.has(date)) dateToReadingItems.set(date, []);
		dateToReadingItems.get(date)?.push(item);
	}

	const dates = new Set(dateToConversations.keys());
	for (const key of dateToReadingItems.keys()) dates.add(key);

	const result: LearningDiaryItem[] = [];
	for (const date of dates) {
		const convs = dateToConversations.get(date);
		let convItems: LearnedConversationItem[] = [];
		if (convs) {
			convItems = convs.map((conv) => ({
				recap: conv.conversation.recap,
				conversation: conversations.find((c) => c.id === conv.conversation.conversationID)!,
				vocabs: conv.vocabs,
				finishedTime: conv.conversation.finishedTime
			}));
		}

		const reads = dateToReadingItems.get(date);
		let readItems: LearnedReadingItem[] = [];
		if (reads) {
			readItems = reads.map((read) => ({
				item: readings.find((r) => r.id === read.readingID)!,
				vocabs: readings.find((r) => r.id === read.readingID)!.vocabs,
				finishedTime: read.finishedTime
			}));
		}

		let title = 'You achieved following goal(s): ';
		title += [
			...convItems.map((item) => item.conversation.details.learner.goal),
			...readItems.map((item) => `Learn and understand about "${item.item.blogName}"`)
		].join(', ');

		result.push({
			date,
			title,
			learnedConversations: convItems,
			learnedReadings: readItems
		});
	}
	return result;
};

export const getCurrentCEFRLevel = function () {
	if (!CEFRLevelLocal) throw new Error('do not query local data from ssr');

	const currentLevel = get(CEFRLevelLocal);
	return currentLevel !== '' ? currentLevel : 'A1';
};

export const setCurrentCEFRLevel = function (level: string) {
	if (!CEFRLevelLocal) throw new Error('do not set local data from ssr');
	CEFRLevelLocal.set(level);
};
