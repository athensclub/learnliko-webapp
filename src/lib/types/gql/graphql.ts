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

export type AvatarModels = {
  __typename?: 'AvatarModels';
  anger: Scalars['String']['output'];
  anticipation: Scalars['String']['output'];
  disgust: Scalars['String']['output'];
  fear: Scalars['String']['output'];
  joy: Scalars['String']['output'];
  neutral: Scalars['String']['output'];
  sadness: Scalars['String']['output'];
  surprise: Scalars['String']['output'];
  trust: Scalars['String']['output'];
};

export type AvatarModelsDataInput = {
  anger: Scalars['String']['input'];
  anticipation: Scalars['String']['input'];
  disgust: Scalars['String']['input'];
  fear: Scalars['String']['input'];
  joy: Scalars['String']['input'];
  neutral: Scalars['String']['input'];
  sadness: Scalars['String']['input'];
  surprise: Scalars['String']['input'];
  trust: Scalars['String']['input'];
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BookCreateDataInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type BotAvatar = {
  __typename?: 'BotAvatar';
  accent: Scalars['String']['output'];
  avatarModels: AvatarModels;
  gender: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BotAvatarDataInput = {
  accent: Scalars['String']['input'];
  avatarModels: AvatarModelsDataInput;
  gender: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type BotDetails = {
  __typename?: 'BotDetails';
  avatar: BotAvatar;
  intro: Scalars['String']['output'];
  prompt: Scalars['String']['output'];
};

export type BotDetailsDataInput = {
  avatar: Scalars['ID']['input'];
  intro: Scalars['String']['input'];
  prompt: Scalars['String']['input'];
};

export type CefrLevel = {
  __typename?: 'CEFRLevel';
  communication: CefrLevelProgress;
  grammar: CefrLevelProgress;
  overall: CefrLevelProgress;
  vocabulary: CefrLevelProgress;
};

export type CefrLevelProgress = {
  __typename?: 'CEFRLevelProgress';
  level: LanguageLevel;
  progress: Scalars['Float']['output'];
};

export type ClassRoom = {
  __typename?: 'ClassRoom';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ClassroomDataInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type ConversationCard = QuizCard & {
  __typename?: 'ConversationCard';
  backgroundUrl: Scalars['String']['output'];
  bot: BotDetails;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  learner: LearnerDetails;
  level: LanguageLevel;
  title: Scalars['String']['output'];
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type ConversationCardCreateDataInput = {
  backgroundUrl: Scalars['String']['input'];
  bot: BotDetailsDataInput;
  fromLesson: Scalars['String']['input'];
  learner: LearnerDetailsDataInput;
  level: LanguageLevel;
  title: Scalars['String']['input'];
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export enum LanguageLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
  PreA1 = 'PRE_A1'
}

export type LearnerDetails = {
  __typename?: 'LearnerDetails';
  goal: Array<LearnerGoal>;
  mission?: Maybe<Scalars['String']['output']>;
};

export type LearnerDetailsDataInput = {
  goal: Array<LearnerGoalDataInput>;
  mission?: InputMaybe<Scalars['String']['input']>;
};

export type LearnerGoal = {
  __typename?: 'LearnerGoal';
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  goal: Scalars['String']['output'];
  hint: Scalars['String']['output'];
};

export type LearnerGoalDataInput = {
  coin: Scalars['Int']['input'];
  exp: Scalars['Int']['input'];
  goal: Scalars['String']['input'];
  hint: Scalars['String']['input'];
};

export type LessonCard = {
  __typename?: 'LessonCard';
  ambientAudio: Scalars['String']['output'];
  backgroundUrl: Scalars['String']['output'];
  coint: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  exp: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  intro: LessonIntro;
  level: LanguageLevel;
  narratives: Array<Narrative>;
  quizeSections: Array<QuizSection>;
  title: Scalars['String']['output'];
};

export type LessonCardCreateDataInput = {
  ambientAudio: Scalars['String']['input'];
  backgroundUrl: Scalars['String']['input'];
  coint: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  exp: Scalars['Int']['input'];
  intro: LessonIntroDataInput;
  level: LanguageLevel;
  narratives: Array<NarrativeDataInput>;
  quizeSections: Array<QuizSectionDataInput>;
  title: Scalars['String']['input'];
};

export type LessonCardsQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  targetLevel?: InputMaybe<LanguageLevel>;
};

export type LessonCardsQueryResult = {
  __typename?: 'LessonCardsQueryResult';
  cards: Array<LessonCard>;
  offset?: Maybe<Scalars['Int']['output']>;
};

export type LessonIntro = {
  __typename?: 'LessonIntro';
  bot: BotAvatar;
  message: Scalars['String']['output'];
  transcription: Scalars['String']['output'];
};

export type LessonIntroDataInput = {
  bot: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  transcription: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  bookCreate?: Maybe<Book>;
  botAvatarCreate: BotAvatar;
  conversationCardCreate: ConversationCard;
  lessonCardCreate: LessonCard;
  readingCardCreate: ReadingCard;
  sentenceCardCreate: SentenceCard;
  userCreate: User;
  userProfileUpdate: ProfileData;
  vocabularyCardCreate: VocabularyCard;
};


export type MutationBookCreateArgs = {
  data: BookCreateDataInput;
};


export type MutationBotAvatarCreateArgs = {
  data: BotAvatarDataInput;
};


export type MutationConversationCardCreateArgs = {
  data: ConversationCardCreateDataInput;
};


export type MutationLessonCardCreateArgs = {
  data: LessonCardCreateDataInput;
};


export type MutationReadingCardCreateArgs = {
  data: ReadingCardCreateDataInput;
};


export type MutationSentenceCardCreateArgs = {
  data: SentenceCardCreateDataInput;
};


export type MutationUserCreateArgs = {
  data: UserCreateDataInput;
};


export type MutationUserProfileUpdateArgs = {
  data: UserProfileUpdate;
  where: UserProfileUpdateDataWhereInput;
};


export type MutationVocabularyCardCreateArgs = {
  data: VocabularyCardCreateDataInput;
};

export type Narrative = {
  __typename?: 'Narrative';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type NarrativeDataInput = {
  illustrationUrl: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type ProfileData = {
  __typename?: 'ProfileData';
  coverUrl?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  lastname: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  book?: Maybe<Book>;
  books?: Maybe<Array<Maybe<Book>>>;
  botAvatar?: Maybe<BotAvatar>;
  lessonCard?: Maybe<LessonCard>;
  lessonCards: LessonCardsQueryResult;
  quizCard?: Maybe<QuizCard>;
  user?: Maybe<User>;
  users: UsersQueryResult;
};


export type QueryBookArgs = {
  title: Scalars['String']['input'];
};


export type QueryBotAvatarArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLessonCardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLessonCardsArgs = {
  query?: InputMaybe<LessonCardsQueryInput>;
};


export type QueryQuizCardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  uid: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  query?: InputMaybe<UsersQueryInput>;
};

export type QuizCard = {
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type QuizSection = {
  __typename?: 'QuizSection';
  cards: Array<QuizCard>;
  title: Scalars['String']['output'];
  type: QuizType;
};

export type QuizSectionDataInput = {
  cards: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  type: QuizType;
};

export enum QuizType {
  Conversation = 'CONVERSATION',
  Reading = 'READING',
  Sentence = 'SENTENCE',
  Vocabulary = 'VOCABULARY'
}

export type ReadingCard = QuizCard & {
  __typename?: 'ReadingCard';
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  pages: Array<ReadingPage>;
  questions: Array<ReadingQuestion>;
  title: Scalars['String']['output'];
  topics?: Maybe<Array<Scalars['String']['output']>>;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type ReadingCardCreateDataInput = {
  fromLesson: Scalars['String']['input'];
  level: LanguageLevel;
  pages: Array<ReadingPageDataInput>;
  questions: Array<ReadingQuestionDataInput>;
  title: Scalars['String']['input'];
  topics?: InputMaybe<Array<Scalars['String']['input']>>;
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type ReadingPage = {
  __typename?: 'ReadingPage';
  illustrationUrl: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ReadingPageDataInput = {
  illustrationUrl: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type ReadingQuestion = {
  __typename?: 'ReadingQuestion';
  choices: Array<Scalars['String']['output']>;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  question: Scalars['String']['output'];
};

export type ReadingQuestionDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<Scalars['String']['input']>;
  coin: Scalars['Int']['input'];
  exp: Scalars['Int']['input'];
  question: Scalars['String']['input'];
};

export type SentenceCard = QuizCard & {
  __typename?: 'SentenceCard';
  choices: Array<Scalars['String']['output']>;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level: LanguageLevel;
  question: Scalars['String']['output'];
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type SentenceCardCreateDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<Scalars['String']['input']>;
  fromLesson: Scalars['String']['input'];
  level: LanguageLevel;
  question: Scalars['String']['input'];
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  classRoom: ClassRoom;
  coin: Scalars['Int']['output'];
  exp: Scalars['Int']['output'];
  languageLevel?: Maybe<CefrLevel>;
  profile?: Maybe<ProfileData>;
  uid: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type UserCreateDataInput = {
  classRoom: ClassroomDataInput;
  uid: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type UserProfileUpdate = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lastname: Scalars['String']['input'];
};

export type UserProfileUpdateDataWhereInput = {
  uid: Scalars['ID']['input'];
};

export type UsersQueryInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  targetRoomId?: InputMaybe<Scalars['ID']['input']>;
};

export type UsersQueryResult = {
  __typename?: 'UsersQueryResult';
  offset?: Maybe<Scalars['Int']['output']>;
  users: Array<User>;
};

export type VocabularyCard = QuizCard & {
  __typename?: 'VocabularyCard';
  choices: Array<VocabularyChoice>;
  fromLesson: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['output'];
  totalExp: Scalars['Int']['output'];
  type: QuizType;
};

export type VocabularyCardCreateDataInput = {
  answerIndex: Scalars['Int']['input'];
  choices: Array<VocabularyChoiceDataInput>;
  fromLesson: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  level: LanguageLevel;
  totalCoin: Scalars['Int']['input'];
  totalExp: Scalars['Int']['input'];
};

export type VocabularyChoice = {
  __typename?: 'VocabularyChoice';
  transcriptionUrl: Scalars['String']['output'];
  vocab: Scalars['String']['output'];
};

export type VocabularyChoiceDataInput = {
  transcriptionUrl: Scalars['String']['input'];
  vocab: Scalars['String']['input'];
};
