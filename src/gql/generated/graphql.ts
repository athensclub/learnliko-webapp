/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Activity = {
  __typename?: 'Activity';
  cards: Array<ActivityCard>;
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type ActivityCard = {
  id: Scalars['ID']['output'];
  type: ActivityType;
};

export enum ActivityType {
  Cloze = 'CLOZE',
  Dialogue = 'DIALOGUE',
  Discussion = 'DISCUSSION',
  Listening = 'LISTENING',
  Reading = 'READING',
  Selection = 'SELECTION'
}

export type BotDetails = {
  __typename?: 'BotDetails';
  accent: Scalars['String']['output'];
  avatar: Scalars['String']['output'];
  gender: Scalars['String']['output'];
  intro: Scalars['String']['output'];
  name: Scalars['String']['output'];
  prompt: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type ClozeCard = ActivityCard & {
  __typename?: 'ClozeCard';
  answerIndexes: Array<Scalars['Int']['output']>;
  choices: Array<Scalars['String']['output']>;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type Course = {
  __typename?: 'Course';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subject: Subject;
};

export type DialogueCard = ActivityCard & {
  __typename?: 'DialogueCard';
  bot: BotDetails;
  coin: Scalars['Int']['output'];
  contextPrompt: Scalars['String']['output'];
  exp: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  learner: LearnerDetails;
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type DiscussionCard = ActivityCard & {
  __typename?: 'DiscussionCard';
  bot: BotDetails;
  contextPrompt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type LearnerDetails = {
  __typename?: 'LearnerDetails';
  goal: Array<LearnerGoal>;
  mission: Scalars['String']['output'];
};

export type LearnerGoal = {
  __typename?: 'LearnerGoal';
  description: Scalars['String']['output'];
  hint: Scalars['String']['output'];
  prompt: Scalars['String']['output'];
};

export type Lesson = {
  __typename?: 'Lesson';
  activities: Array<Activity>;
  ambientAudio: Scalars['String']['output'];
  backgroundUrl: Scalars['String']['output'];
  course: Course;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  intro: LessonIntro;
  like: Scalars['Int']['output'];
  narratives: Array<Narrative>;
  subject: Subject;
  title: Scalars['String']['output'];
  view: Scalars['Int']['output'];
};

export type LessonIntro = {
  __typename?: 'LessonIntro';
  bot: Scalars['String']['output'];
  message: Scalars['String']['output'];
  transcription: Scalars['String']['output'];
};

export type ListeningCard = ActivityCard & {
  __typename?: 'ListeningCard';
  audioUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  illustrationUrl: Scalars['String']['output'];
  questions: Array<SelectionCard>;
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type Narrative = {
  __typename?: 'Narrative';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ReadingCard = ActivityCard & {
  __typename?: 'ReadingCard';
  id: Scalars['ID']['output'];
  pages: Array<ReadingPage>;
  questions: Array<SelectionCard>;
  title: Scalars['String']['output'];
  type: ActivityType;
};

export type ReadingPage = {
  __typename?: 'ReadingPage';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type SelectionCard = ActivityCard & {
  __typename?: 'SelectionCard';
  answerIndex: Scalars['Int']['output'];
  choices: Array<Scalars['String']['output']>;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  type: ActivityType;
};

export type Subject = {
  __typename?: 'Subject';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};
