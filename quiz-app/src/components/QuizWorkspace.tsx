'use client';

import { useMemo, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import GitHubIcon from '@mui/icons-material/GitHub';

import type { Choice, QuizCollection, QuizSettings, AnswerMap, RuntimeQuestion } from '@/types/quiz';
import { prepareQuizSession } from '@/lib/quiz-engine';

import { StatTile } from './quiz/StatTile';
import { QuizTimer } from './quiz/QuizTimer';
import { SectionProgress } from './quiz/SectionProgress';
import { QuestionPanel } from './quiz/QuestionPanel';
import { ReviewPanel, ReviewFilter } from './quiz/ReviewPanel';
import { QuizSettingsDialog } from './quiz/QuizSettings';

type QuizWorkspaceProps = { quizzes: QuizCollection[] };

export default function QuizWorkspace({ quizzes }: QuizWorkspaceProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedSlug, setSelectedSlug] = useState(quizzes[0]?.slug ?? '');

  const [settings, setSettings] = useState<QuizSettings>({
    shuffleQuestions: false, shuffleChoices: false, difficultyFilter: [], sectionFilter: []
  });

  const [runtimeQuestions, setRuntimeQuestions] = useState<RuntimeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');
  const [timeSpent, setTimeSpent] = useState(0);

  const selectedQuiz = useMemo(
    () => quizzes.find((quiz) => quiz.slug === selectedSlug) ?? quizzes[0],
    [quizzes, selectedSlug]
  );

  // Initialize or restart quiz session
  const initializeQuiz = (quiz: QuizCollection, config: QuizSettings) => {
    setRuntimeQuestions(prepareQuizSession(quiz, config));
    setCurrentIndex(0);
    setAnswers({});
    setReviewMode(false);
    setReviewFilter('all');
    setTimeSpent(0);
  };

  useEffect(() => {
    if (selectedQuiz) initializeQuiz(selectedQuiz, settings);
  }, [selectedQuiz]); // Only on quiz change initially, settings changes are manual

  const stats = useMemo(() => {
    const answeredCount = runtimeQuestions.filter((q) => answers[q.id] && !answers[q.id].skipped).length;
    const correctCount = runtimeQuestions.filter((q) => answers[q.id]?.choiceId === q.correctChoiceId).length;
    const completion = runtimeQuestions.length === 0 ? 0 : ((answeredCount + runtimeQuestions.filter(q => answers[q.id]?.skipped).length) / runtimeQuestions.length) * 100;
    return { answeredCount, correctCount, completion };
  }, [answers, runtimeQuestions]);

  if (!selectedQuiz || runtimeQuestions.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3 }}>
        <Paper variant="outlined" sx={{ p: 3, maxWidth: 560 }}>
          <Typography variant="h2">No questions available</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Adjust your filters or add valid JSON quiz files.
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => initializeQuiz(selectedQuiz, { shuffleQuestions: false, shuffleChoices: false, difficultyFilter: [], sectionFilter: [] })}>Reset Filters</Button>
        </Paper>
      </Box>
    );
  }

  const currentQuestion = runtimeQuestions[currentIndex];

  const selectAnswer = (choiceId: Choice['id']) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { choiceId, skipped: false } }));
  };
  const skipAnswer = () => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: { skipped: true } }));
  };

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 4 }, background: 'radial-gradient(circle at top left, rgba(15, 118, 110, 0.10), transparent 34rem), linear-gradient(180deg, #f6f7fb 0%, #eef2f6 100%)' }}>
      <Container maxWidth="xl">
        <Stack spacing={2.5}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={2.25}>
              <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                    <QuizIcon color="primary" />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main' }}>INT308 quiz bank</Typography>
                  </Stack>
                  <Typography variant="h1">{selectedQuiz.quiz.title}</Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', width: '100%' }}>
                  <QuizSettingsDialog
                    quiz={selectedQuiz}
                    settings={settings}
                    onApply={(newSettings) => {
                      setSettings(newSettings);
                      initializeQuiz(selectedQuiz, newSettings);
                    }}
                  />

                  <FormControl
                    size="small"
                    sx={{
                      flex: { xs: '1 1 auto', sm: '0 0 260px' },
                      minWidth: { xs: 120, sm: 260 },
                      width: { xs: 'auto', sm: '260px' }
                    }}
                  >
                    <InputLabel id="quiz-select-label">Question bank</InputLabel>
                    <Select
                      labelId="quiz-select-label"
                      value={selectedQuiz.slug}
                      label="Question bank"
                      onChange={(e) => setSelectedSlug(e.target.value)}
                      fullWidth={false}
                    >
                      {quizzes.map((q) => (
                        <MenuItem key={q.slug} value={q.slug}>{q.quiz.title} · {q.questionCount} Qs</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    variant="outlined"
                    color="inherit"
                    href="https://github.com/ChinnaphatLoha/int308-notes"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHubIcon />}
                    sx={{ px: isXs ? 1 : undefined, minWidth: isXs ? 40 : undefined }}
                  >
                    {isXs ? <GitHubIcon /> : (
                      <>
                        <GitHubIcon sx={{ mr: 1 }} />
                        Repository
                      </>
                    )}
                  </Button>
                </Stack>
              </Stack>
              <Stack direction="row" sx={{ gap: 1.5, flexWrap: 'wrap' }}>
                <StatTile label="Questions" value={runtimeQuestions.length} />
                <StatTile label="Answered" value={stats.answeredCount} />
                <StatTile label="Score" value={stats.correctCount} />
                <StatTile label="Timer" value={<QuizTimer isActive={!reviewMode} onTimeUpdate={setTimeSpent} />} />
              </Stack>
              <Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>Overall progress</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>{Math.round(stats.completion)}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={stats.completion} sx={{ height: 8, borderRadius: 999, bgcolor: '#e8edf4' }} />
              </Box>
            </Stack>
          </Paper>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' }, gap: 2.5, alignItems: 'start' }}>
            {!isMobile ? (
              <Paper variant="outlined" sx={{ p: 2, position: 'sticky', top: 24 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <FactCheckIcon color="primary" />
                    <Typography variant="h3">Section coverage</Typography>
                  </Stack>
                  <Divider />
                  <SectionProgress questions={runtimeQuestions} answers={answers} onSectionClick={(idx) => { setCurrentIndex(idx); setReviewMode(false); }} />
                  <Divider />
                  <Stack direction="row" spacing={1}>
                    <Button variant="contained" fullWidth onClick={() => setReviewMode(true)} endIcon={<DoneAllIcon />}>Review</Button>
                    <Button variant="outlined" color="secondary" onClick={() => initializeQuiz(selectedQuiz, settings)}><RestartAltIcon /></Button>
                  </Stack>
                </Stack>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
                  <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={() => initializeQuiz(selectedQuiz, settings)}>Reset</Button>
                  <Button variant="contained" endIcon={<DoneAllIcon />} onClick={() => setReviewMode(true)}>Review</Button>
                </Stack>
              </Paper>
            )}

            {reviewMode ? (
              <ReviewPanel questions={runtimeQuestions} answers={answers} filter={reviewFilter} timeSpentSeconds={timeSpent} onFilterChange={setReviewFilter} onBackToQuestion={(idx) => { setCurrentIndex(idx); setReviewMode(false); }} onReset={() => initializeQuiz(selectedQuiz, settings)} />
            ) : (
              <QuestionPanel question={currentQuestion} index={currentIndex} total={runtimeQuestions.length} answerState={answers[currentQuestion.id]} onSelect={selectAnswer} onSkip={skipAnswer} onPrevious={() => setCurrentIndex((c) => Math.max(0, c - 1))} onNext={() => setCurrentIndex((c) => Math.min(runtimeQuestions.length - 1, c + 1))} onFinish={() => setReviewMode(true)} />
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
