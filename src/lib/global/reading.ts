// import { getReadingAnswers } from "$api/reading";
// import { getUserSubmissionLocal } from "$lib/localdb/readingLocal";
// import type { ReadingItem } from "$lib/types/reading";
// import { writable } from "svelte/store";


// export const selectedQuizChoices = writable<(null | number)[]>([]);

// /**
//  * if not null -> user submitted
//  */
// export const readingAnswers = writable<null | number[]>(null);

// export const resetReadingData = () => {
//     selectedQuizChoices.set([]);
//     readingAnswers.set(null);
// }

// export const initializeReadingData = async (item: ReadingItem) => {
//     const userSubmission = await getUserSubmissionLocal(item.id);

//     if (userSubmission) {
//         selectedQuizChoices.set(userSubmission);
//         readingAnswers.set(await getReadingAnswers(item.id));
//     } else {
//         selectedQuizChoices.set(Array(item.quiz.length).fill(null));
//         readingAnswers.set(null);
//     }
// }