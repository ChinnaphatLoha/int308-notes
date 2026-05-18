export type Choice = {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
};

export type QuizQuestion = {
  id: string;
  section: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard' | string;
  question: string;
  choices: Choice[];
  correctChoiceId: Choice['id'];
  explanation: string;
  source: {
    file: string;
    lines: string;
  };
  tags: string[];
};

export type CoverageEntry = {
  section: string;
  source: {
    file: string;
    lines: string;
  };
  questionIds: string[];
};

export type QuizFile = {
  version: string;
  source: {
    file: string;
    title: string;
  };
  quiz: {
    title: string;
    choiceCount: number;
    language?: string;
  };
  questions: QuizQuestion[];
  coverage: CoverageEntry[];
};

export type QuizCollection = QuizFile & {
  slug: string;
  fileName: string;
  questionCount: number;
  sectionCount: number;
};

export type RuntimeQuestion = QuizQuestion & {
  displayNumber: number; // 1 to N
  shuffledChoices: Choice[];
};

export type QuizSettings = {
  shuffleQuestions: boolean;
  shuffleChoices: boolean;
  difficultyFilter: string[]; // e.g. ['easy', 'medium'], empty means all
  sectionFilter: string[]; // empty means all
};

export type AnswerState = {
  choiceId?: Choice['id'];
  skipped: boolean;
};

export type AnswerMap = Record<string, AnswerState>;

