'use client';

import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import type { Choice, QuizCollection, QuizQuestion } from '@/types/quiz';

type AnswerMap = Record<string, Choice['id']>;
type ReviewFilter = 'all' | 'missed' | 'unanswered';

type QuizWorkspaceProps = {
  quizzes: QuizCollection[];
};

function getDifficultyColor(difficulty: string) {
  if (difficulty === 'easy') return 'success';
  if (difficulty === 'hard') return 'error';
  return 'warning';
}

function getCorrectChoice(question: QuizQuestion) {
  return question.choices.find((choice) => choice.id === question.correctChoiceId);
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        minWidth: { xs: 'calc(50% - 6px)', sm: 136 },
        flex: { xs: '1 1 calc(50% - 6px)', sm: '0 0 auto' }
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ mt: 0.5 }}>
        {value}
      </Typography>
    </Paper>
  );
}

function SectionProgress({
  quiz,
  answers
}: {
  quiz: QuizCollection;
  answers: AnswerMap;
}) {
  return (
    <Stack spacing={1.25}>
      {quiz.coverage.map((entry) => {
        const answered = entry.questionIds.filter((id) => answers[id]).length;
        const total = entry.questionIds.length;
        const progress = total === 0 ? 0 : (answered / total) * 100;

        return (
          <Box key={entry.section}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {entry.section}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {answered}/{total}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 0.75, height: 6, borderRadius: 999, bgcolor: '#eef1f6' }}
            />
          </Box>
        );
      })}
    </Stack>
  );
}

function ChoiceButton({
  choice,
  question,
  selectedChoiceId,
  onSelect
}: {
  choice: Choice;
  question: QuizQuestion;
  selectedChoiceId?: Choice['id'];
  onSelect: (choiceId: Choice['id']) => void;
}) {
  const answered = Boolean(selectedChoiceId);
  const isSelected = selectedChoiceId === choice.id;
  const isCorrect = question.correctChoiceId === choice.id;
  const tone = answered && isCorrect ? 'success' : answered && isSelected ? 'error' : 'secondary';

  return (
    <Button
      variant={isSelected || (answered && isCorrect) ? 'contained' : 'outlined'}
      color={tone}
      onClick={() => onSelect(choice.id)}
      fullWidth
      startIcon={
        answered && isCorrect ? (
          <CheckCircleIcon />
        ) : answered && isSelected ? (
          <CloseIcon />
        ) : (
          <Box
            component="span"
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(15, 118, 110, 0.09)',
              color: 'primary.main',
              fontSize: 13,
              fontWeight: 800
            }}
          >
            {choice.id}
          </Box>
        )
      }
      sx={{
        justifyContent: 'flex-start',
        minHeight: 58,
        px: 2,
        py: 1.25,
        textAlign: 'left',
        whiteSpace: 'normal',
        lineHeight: 1.35,
        '& .MuiButton-startIcon': {
          alignSelf: 'flex-start',
          mt: 0.1
        }
      }}
    >
      {choice.text}
    </Button>
  );
}

function QuestionPanel({
  question,
  index,
  total,
  selectedChoiceId,
  onSelect,
  onPrevious,
  onNext,
  onFinish
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  selectedChoiceId?: Choice['id'];
  onSelect: (choiceId: Choice['id']) => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}) {
  const answered = Boolean(selectedChoiceId);
  const isCorrect = selectedChoiceId === question.correctChoiceId;
  const correctChoice = getCorrectChoice(question);

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ justifyContent: 'space-between', gap: 1.5 }}>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Chip size="small" icon={<MenuBookIcon />} label={question.section} />
            <Chip
              size="small"
              color={getDifficultyColor(question.difficulty)}
              label={question.difficulty}
              sx={{ textTransform: 'capitalize', fontWeight: 700 }}
            />
            <Chip size="small" label={`${index + 1} / ${total}`} />
          </Stack>
        </Stack>

        <Box>
          <Typography variant="body2" color="primary.main" sx={{ mb: 1, fontWeight: 800 }}>
            {question.topic}
          </Typography>
          <Typography variant="h2">{question.question}</Typography>
        </Box>

        <Stack spacing={1.25}>
          {question.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              question={question}
              selectedChoiceId={selectedChoiceId}
              onSelect={onSelect}
            />
          ))}
        </Stack>

        {answered ? (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderColor: isCorrect ? 'success.light' : 'error.light',
              bgcolor: isCorrect ? 'rgba(21, 128, 61, 0.06)' : 'rgba(180, 35, 24, 0.06)'
            }}
          >
            <Stack spacing={1}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                {isCorrect ? <CheckCircleIcon color="success" /> : <CloseIcon color="error" />}
                <Typography variant="h3">{isCorrect ? 'Correct' : 'Not quite'}</Typography>
              </Stack>
              {!isCorrect ? (
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Correct answer: {question.correctChoiceId}. {correctChoice?.text}
                </Typography>
              ) : null}
              <Typography variant="body2" color="text.secondary">
                {question.explanation}
              </Typography>
            </Stack>
          </Paper>
        ) : null}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            startIcon={<NavigateBeforeIcon />}
            onClick={onPrevious}
            disabled={index === 0}
          >
            Previous
          </Button>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
            <Button variant="outlined" endIcon={<NavigateNextIcon />} onClick={onNext} disabled={index === total - 1}>
              Next
            </Button>
            <Button variant="contained" endIcon={<DoneAllIcon />} onClick={onFinish}>
              Review
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}

function ReviewPanel({
  quiz,
  answers,
  filter,
  onFilterChange,
  onBackToQuestion,
  onReset
}: {
  quiz: QuizCollection;
  answers: AnswerMap;
  filter: ReviewFilter;
  onFilterChange: (filter: ReviewFilter) => void;
  onBackToQuestion: (index: number) => void;
  onReset: () => void;
}) {
  const answeredCount = quiz.questions.filter((question) => answers[question.id]).length;
  const correctCount = quiz.questions.filter((question) => answers[question.id] === question.correctChoiceId).length;
  const filteredQuestions = quiz.questions.filter((question) => {
    const answer = answers[question.id];
    if (filter === 'missed') return answer && answer !== question.correctChoiceId;
    if (filter === 'unanswered') return !answer;
    return true;
  });

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 800, mb: 0.75 }}>
              Review mode
            </Typography>
            <Typography variant="h2">Score {correctCount}/{quiz.questions.length}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              Answered {answeredCount} of {quiz.questions.length} questions.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="outlined" startIcon={<QuizIcon />} onClick={() => onBackToQuestion(0)}>
              Continue quiz
            </Button>
            <Button variant="outlined" color="secondary" startIcon={<RestartAltIcon />} onClick={onReset}>
              Reset
            </Button>
          </Stack>
        </Stack>

        <ToggleButtonGroup
          exclusive
          color="primary"
          value={filter}
          onChange={(_, value: ReviewFilter | null) => {
            if (value) onFilterChange(value);
          }}
          sx={{ flexWrap: 'wrap', gap: 1, '& .MuiToggleButtonGroup-grouped': { borderRadius: 2, border: 1 } }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="missed">Missed</ToggleButton>
          <ToggleButton value="unanswered">Unanswered</ToggleButton>
        </ToggleButtonGroup>

        <Stack spacing={1.25}>
          {filteredQuestions.map((question) => {
            const questionIndex = quiz.questions.findIndex((item) => item.id === question.id);
            const answer = answers[question.id];
            const correctChoice = getCorrectChoice(question);
            const status = !answer ? 'Unanswered' : answer === question.correctChoiceId ? 'Correct' : 'Missed';
            const color = !answer ? 'warning' : answer === question.correctChoiceId ? 'success' : 'error';

            return (
              <Paper key={question.id} variant="outlined" sx={{ p: 1.5 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', gap: 1.5 }}>
                  <Box>
                    <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                      <Chip size="small" color={color} label={status} sx={{ fontWeight: 700 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                        {question.id} · {question.section}
                      </Typography>
                    </Stack>
                    <Typography variant="body1" sx={{ mt: 1, fontWeight: 760 }}>
                      {question.question}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                      Correct: {question.correctChoiceId}. {correctChoice?.text}
                    </Typography>
                  </Box>
                  <Button variant="text" onClick={() => onBackToQuestion(questionIndex)} sx={{ alignSelf: 'flex-start' }}>
                    Open
                  </Button>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default function QuizWorkspace({ quizzes }: QuizWorkspaceProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedSlug, setSelectedSlug] = useState(quizzes[0]?.slug ?? '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');

  const selectedQuiz = useMemo(
    () => quizzes.find((quiz) => quiz.slug === selectedSlug) ?? quizzes[0],
    [quizzes, selectedSlug]
  );

  const stats = useMemo(() => {
    if (!selectedQuiz) {
      return { answeredCount: 0, correctCount: 0, completion: 0 };
    }

    const answeredCount = selectedQuiz.questions.filter((question) => answers[question.id]).length;
    const correctCount = selectedQuiz.questions.filter(
      (question) => answers[question.id] === question.correctChoiceId
    ).length;
    const completion = selectedQuiz.questions.length === 0 ? 0 : (answeredCount / selectedQuiz.questions.length) * 100;

    return { answeredCount, correctCount, completion };
  }, [answers, selectedQuiz]);

  if (!selectedQuiz) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 560 }}>
          <Typography variant="h2">No quiz files found</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Add at least one valid JSON quiz file to the data folder and reload the app.
          </Typography>
        </Paper>
      </Box>
    );
  }

  const currentQuestion = selectedQuiz.questions[currentIndex];

  const selectAnswer = (choiceId: Choice['id']) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: choiceId
    }));
  };

  const changeQuiz = (slug: string) => {
    setSelectedSlug(slug);
    setCurrentIndex(0);
    setAnswers({});
    setReviewMode(false);
    setReviewFilter('all');
  };

  const jumpToQuestion = (index: number) => {
    setCurrentIndex(Math.min(Math.max(index, 0), selectedQuiz.questions.length - 1));
    setReviewMode(false);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setReviewMode(false);
    setReviewFilter('all');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 2, md: 4 },
        background:
          'radial-gradient(circle at top left, rgba(15, 118, 110, 0.10), transparent 34rem), linear-gradient(180deg, #f6f7fb 0%, #eef2f6 100%)'
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2.5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2.25}>
              <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    <QuizIcon color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                      INT308 quiz bank
                    </Typography>
                  </Stack>
                  <Typography variant="h1">Practice from every JSON file</Typography>
                </Box>

                <FormControl sx={{ minWidth: { xs: '100%', sm: 340 } }}>
                  <InputLabel id="quiz-select-label">Question bank</InputLabel>
                  <Select
                    labelId="quiz-select-label"
                    value={selectedQuiz.slug}
                    label="Question bank"
                    onChange={(event) => changeQuiz(event.target.value)}
                  >
                    {quizzes.map((quiz) => (
                      <MenuItem key={quiz.slug} value={quiz.slug}>
                        {quiz.quiz.title} · {quiz.questionCount} questions
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
                <StatTile label="Questions" value={`${selectedQuiz.questionCount}`} />
                <StatTile label="Sections" value={`${selectedQuiz.sectionCount}`} />
                <StatTile label="Answered" value={`${stats.answeredCount}`} />
                <StatTile label="Score" value={`${stats.correctCount}`} />
              </Stack>

              <Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    Overall progress
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                    {Math.round(stats.completion)}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={stats.completion}
                  sx={{ height: 8, borderRadius: 999, bgcolor: '#e8edf4' }}
                />
              </Box>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' },
              gap: 2.5,
              alignItems: 'start'
            }}
          >
            {!isMobile ? (
              <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 24 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <FactCheckIcon color="primary" />
                    <Typography variant="h3">Section coverage</Typography>
                  </Stack>
                  <Divider />
                  <SectionProgress quiz={selectedQuiz} answers={answers} />
                  <Divider />
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" fullWidth onClick={() => setReviewMode(true)} endIcon={<DoneAllIcon />}>
                      Review
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={resetQuiz} aria-label="Reset quiz">
                      <RestartAltIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={resetQuiz}>
                    Reset
                  </Button>
                  <Button variant="contained" endIcon={<DoneAllIcon />} onClick={() => setReviewMode(true)}>
                    Review
                  </Button>
                </Stack>
              </Paper>
            )}

            {reviewMode ? (
              <ReviewPanel
                quiz={selectedQuiz}
                answers={answers}
                filter={reviewFilter}
                onFilterChange={setReviewFilter}
                onBackToQuestion={jumpToQuestion}
                onReset={resetQuiz}
              />
            ) : (
              <QuestionPanel
                question={currentQuestion}
                index={currentIndex}
                total={selectedQuiz.questions.length}
                selectedChoiceId={answers[currentQuestion.id]}
                onSelect={selectAnswer}
                onPrevious={() => setCurrentIndex((current) => Math.max(0, current - 1))}
                onNext={() => setCurrentIndex((current) => Math.min(selectedQuiz.questions.length - 1, current + 1))}
                onFinish={() => setReviewMode(true)}
              />
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
