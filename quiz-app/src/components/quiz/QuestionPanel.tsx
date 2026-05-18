import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { RuntimeQuestion, Choice, AnswerState } from '@/types/quiz';

type QuestionPanelProps = {
  question: RuntimeQuestion;
  index: number;
  total: number;
  answerState?: AnswerState;
  onSelect: (choiceId: Choice['id']) => void;
  onSkip: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
};

function getDifficultyColor(difficulty: string) {
  if (difficulty === 'easy') return 'success';
  if (difficulty === 'hard') return 'error';
  return 'warning';
}

function ChoiceButton({
  choice,
  isCorrect,
  isSelected,
  isAnswered,
  onSelect
}: {
  choice: Choice;
  isCorrect: boolean;
  isSelected: boolean;
  isAnswered: boolean;
  onSelect: () => void;
}) {
  const tone = isAnswered && isCorrect ? 'success' : isAnswered && isSelected ? 'error' : 'secondary';
  const variant = isSelected || (isAnswered && isCorrect) ? 'contained' : 'outlined';

  return (
    <Button
      variant={variant}
      color={tone}
      onClick={onSelect}
      disabled={isAnswered && !isSelected && !isCorrect}
      fullWidth
      startIcon={
        isAnswered && isCorrect ? (
          <CheckCircleIcon />
        ) : isAnswered && isSelected ? (
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
        transition: 'all 0.2s ease-in-out',
        '&.Mui-disabled': {
          opacity: 0.6
        },
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

export function QuestionPanel({
  question,
  index,
  total,
  answerState,
  onSelect,
  onSkip,
  onPrevious,
  onNext,
  onFinish
}: QuestionPanelProps) {
  const [showFade, setShowFade] = useState(true);

  // Re-trigger fade animation when question changes
  useEffect(() => {
    setShowFade(false);
    const timer = setTimeout(() => setShowFade(true), 50);
    return () => clearTimeout(timer);
  }, [question.id]);

  const answered = Boolean(answerState?.choiceId);
  const skipped = Boolean(answerState?.skipped);
  const isCorrect = answerState?.choiceId === question.correctChoiceId;
  const correctChoice = question.choices.find(c => c.id === question.correctChoiceId);

  const handleCopy = () => {
    const textToCopy = `Question: ${question.question}\n\nChoices:\n${question.choices.map(c => `${c.id}. ${c.text}`).join('\n')}\n\nExplanation: ${question.explanation}`;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Fade in={showFade} timeout={300}>
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
              <Chip size="small" label={`${question.displayNumber} / ${total}`} />
            </Stack>
            <Tooltip title="Copy Question Details">
              <IconButton size="small" onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Box>
            <Typography variant="body2" color="primary.main" sx={{ mb: 1, fontWeight: 800 }}>
              {question.topic}
            </Typography>
            <Typography variant="h2">{question.question}</Typography>
          </Box>

          <Stack spacing={1.25}>
            {question.shuffledChoices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                isCorrect={choice.id === question.correctChoiceId}
                isSelected={answerState?.choiceId === choice.id}
                isAnswered={answered || skipped}
                onSelect={() => {
                  if (!answered && !skipped) onSelect(choice.id);
                }}
              />
            ))}
          </Stack>

          {skipped && (
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)' }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Question Skipped.</Typography>
              <Typography variant="body2" color="text.secondary">Correct answer: {question.correctChoiceId}. {correctChoice?.text}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{question.explanation}</Typography>
            </Paper>
          )}

          {answered && !skipped && (
            <CollapsePanel isCorrect={isCorrect} correctChoice={correctChoice} explanation={question.explanation} />
          )}

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
              {!answered && !skipped && (
                <Button variant="outlined" color="warning" onClick={onSkip} startIcon={<SkipNextIcon />}>
                  Skip
                </Button>
              )}
              <Button variant="outlined" endIcon={<NavigateNextIcon />} onClick={onNext} disabled={index === total - 1}>
                Next
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Fade>
  );
}

function CollapsePanel({ isCorrect, correctChoice, explanation }: { isCorrect: boolean, correctChoice?: Choice, explanation: string }) {
  return (
    <Fade in={true} timeout={400}>
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
              Correct answer: {correctChoice?.id}. {correctChoice?.text}
            </Typography>
          ) : null}
          <Typography variant="body2" color="text.secondary">
            {explanation}
          </Typography>
        </Stack>
      </Paper>
    </Fade>
  );
}
