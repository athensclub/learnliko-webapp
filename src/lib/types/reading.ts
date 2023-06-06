export interface ReadingItem {
    id: string;
    blogName: string;
    content: string;
    topic: string;
    image: string;
    dateTime: string;
    quiz: MultipleChoicesQuestion[];
};

export interface FinishedReading {
    readingID: string;
    finishedTime: Date;
    userAnswers: number[];
}

export interface MultipleChoicesQuestion {
    question: string;
    choices: string[];
}