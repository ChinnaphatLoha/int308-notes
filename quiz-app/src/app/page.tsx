import QuizWorkspace from '@/components/QuizWorkspace';
import { loadQuizCollections } from '@/lib/quizzes';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const quizzes = await loadQuizCollections();

  return <QuizWorkspace quizzes={quizzes} />;
}
