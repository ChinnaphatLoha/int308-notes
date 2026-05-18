import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TimerIcon from '@mui/icons-material/Timer';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

type QuizTimerProps = {
  isActive: boolean;
  onTimeUpdate: (seconds: number) => void;
};

export function QuizTimer({ isActive, onTimeUpdate }: QuizTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          onTimeUpdate(next);
          return next;
        });
      }, 1000);
    } else if (!isActive) {
      // Keep the current seconds but stop ticking
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', color: isPaused ? 'text.disabled' : 'primary.main' }}>
        <TimerIcon fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 800, minWidth: 44 }}>
          {formatTime(seconds)}
        </Typography>
      </Stack>
      {isActive && (
        <IconButton 
          size="small" 
          onClick={() => setIsPaused(!isPaused)} 
          color={isPaused ? "secondary" : "primary"}
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <PlayArrowIcon fontSize="small" /> : <PauseIcon fontSize="small" />}
        </IconButton>
      )}
    </Box>
  );
}
