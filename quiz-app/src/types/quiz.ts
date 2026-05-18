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
