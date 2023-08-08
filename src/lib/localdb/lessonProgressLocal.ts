import { browser } from '$app/environment';
import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';
import { get, writable } from 'svelte/store';

type LessonProgressLocal = {
	id: string;
	activityIndex: number;
	progress: number;
};

const lessonProgress = browser
	? persist(
			writable<Map<string, LessonProgressLocal>>(new Map()),
			createIndexedDBStorage(),
			'lessonProgress'
	  )
	: null;

export const saveLocalProgress = function (
	lessonId: string,
	activityIndex: number,
	progress: number
) {
	if (!lessonProgress) throw new Error('do not query local data from server');

	const data = get(lessonProgress);
	data.set(lessonId, { activityIndex, progress, id: lessonId });
	lessonProgress.set(data);
};

export const getLocalProgress = function (lessonId: string) {
	if (!lessonProgress) throw new Error('do not query local data from server');

	const data = get(lessonProgress);
	return data?.get(lessonId);
};

export const getLocalCompletedLessons = function () {
	if (!lessonProgress) throw new Error('do not query local data from server');
	const data = get(lessonProgress);

	const completedLessonIds: string[] = [];
	data.forEach((value, key) => {
		if (value.progress >= 1) completedLessonIds.push(key);
	});

	return completedLessonIds;
};
