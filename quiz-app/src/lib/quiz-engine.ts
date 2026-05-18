import { QuizCollection, RuntimeQuestion, QuizSettings } from '@/types/quiz';

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function prepareQuizSession(
  quiz: QuizCollection,
  settings: QuizSettings
): RuntimeQuestion[] {
  let questions = [...quiz.questions];

  // 1. Filter by section
  if (settings.sectionFilter.length > 0) {
    questions = questions.filter((q) => settings.sectionFilter.includes(q.section));
  }

  // 2. Filter by difficulty
  if (settings.difficultyFilter.length > 0) {
    questions = questions.filter((q) => settings.difficultyFilter.includes(q.difficulty));
  }

  // 3. Shuffle questions
  if (settings.shuffleQuestions) {
    questions = shuffleArray(questions);
  }

  // 4. Map to RuntimeQuestion (shuffle choices and add displayNumber)
  return questions.map((q, index) => {
    let choices = [...q.choices];
    if (settings.shuffleChoices) {
      choices = shuffleArray(choices);
    }
    
    return {
      ...q,
      displayNumber: index + 1,
      shuffledChoices: choices
    };
  });
}

export function getSections(quiz: QuizCollection): string[] {
  const sections = new Set(quiz.questions.map(q => q.section));
  return Array.from(sections);
}

export function getDifficulties(quiz: QuizCollection): string[] {
  const diffs = new Set(quiz.questions.map(q => q.difficulty));
  return Array.from(diffs);
}
