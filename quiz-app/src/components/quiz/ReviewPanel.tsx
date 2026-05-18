import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import QuizIcon from '@mui/icons-material/Quiz';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { RuntimeQuestion, AnswerMap } from '@/types/quiz';

export type ReviewFilter = 'all' | 'missed' | 'skipped' | 'unanswered';

type ReviewPanelProps = {
  questions: RuntimeQuestion[];
  answers: AnswerMap;
  filter: ReviewFilter;
  timeSpentSeconds: number;
  onFilterChange: (filter: ReviewFilter) => void;
  onBackToQuestion: (index: number) => void;
  onReset: () => void;
};

export function ReviewPanel({
  questions,
  answers,
  filter,
  timeSpentSeconds,
  onFilterChange,
  onBackToQuestion,
  onReset
}: ReviewPanelProps) {
  const answeredCount = questions.filter(q => answers[q.id] && !answers[q.id].skipped).length;
  const correctCount = questions.filter(q => answers[q.id]?.choiceId === q.correctChoiceId).length;
  const skippedCount = questions.filter(q => answers[q.id]?.skipped).length;
  const scoreDenominator = questions.length - skippedCount;
  
  const filteredQuestions = questions.filter((question) => {
    const answer = answers[question.id];
    if (filter === 'missed') return answer && !answer.skipped && answer.choiceId !== question.correctChoiceId;
    if (filter === 'skipped') return answer?.skipped;
    if (filter === 'unanswered') return !answer;
    return true;
  });

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 800, mb: 0.75 }}>
              Review mode
            </Typography>
            <Typography variant="h2">Score {correctCount}/{scoreDenominator}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
              Answered {answeredCount}, Skipped {skippedCount}, Total {questions.length} questions.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time spent: {formatTime(timeSpentSeconds)}
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
          <ToggleButton value="skipped">Skipped</ToggleButton>
          <ToggleButton value="unanswered">Unanswered</ToggleButton>
        </ToggleButtonGroup>

        <Stack spacing={1.25}>
          {filteredQuestions.map((question) => {
            const questionIndex = questions.findIndex((item) => item.id === question.id);
            const answer = answers[question.id];
            const correctChoice = question.choices.find(c => c.id === question.correctChoiceId);
            
            let status = 'Unanswered';
            let color: 'warning' | 'success' | 'error' | 'default' = 'warning';
            
            if (answer?.skipped) {
              status = 'Skipped';
              color = 'default';
            } else if (answer?.choiceId) {
              if (answer.choiceId === question.correctChoiceId) {
                status = 'Correct';
                color = 'success';
              } else {
                status = 'Missed';
                color = 'error';
              }
            }

            return (
              <Paper key={question.id} variant="outlined" sx={{ p: 1.5 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} sx={{ justifyContent: 'space-between', gap: 1.5 }}>
                  <Box>
                    <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                      <Chip size="small" color={color} label={status} sx={{ fontWeight: 700 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                        {question.displayNumber} · {question.section}
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
