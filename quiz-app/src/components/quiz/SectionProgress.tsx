import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { RuntimeQuestion, AnswerMap } from '@/types/quiz';

type SectionProgressProps = {
  questions: RuntimeQuestion[];
  answers: AnswerMap;
  onSectionClick: (index: number) => void;
};

export function SectionProgress({ questions, answers, onSectionClick }: SectionProgressProps) {
  const sectionsData = useMemo(() => {
    const map = new Map<string, { total: number; answered: number; firstQuestionIndex: number }>();

    questions.forEach((q, index) => {
      if (!map.has(q.section)) {
        map.set(q.section, { total: 0, answered: 0, firstQuestionIndex: index });
      }
      
      const data = map.get(q.section)!;
      data.total += 1;
      if (answers[q.id] && !answers[q.id].skipped) {
        data.answered += 1;
      }
    });

    return Array.from(map.entries()).map(([section, data]) => ({
      section,
      ...data
    }));
  }, [questions, answers]);

  return (
    <Stack spacing={1.25}>
      {sectionsData.map((entry) => {
        const progress = entry.total === 0 ? 0 : (entry.answered / entry.total) * 100;

        return (
          <Box 
            key={entry.section} 
            onClick={() => onSectionClick(entry.firstQuestionIndex)}
            sx={{
              cursor: 'pointer',
              p: 1,
              borderRadius: 1,
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {entry.section}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {entry.answered}/{entry.total}
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
