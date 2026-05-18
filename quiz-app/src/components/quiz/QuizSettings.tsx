import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import { QuizSettings, QuizCollection } from '@/types/quiz';
import { getSections, getDifficulties } from '@/lib/quiz-engine';

type QuizSettingsProps = {
  quiz: QuizCollection;
  settings: QuizSettings;
  onApply: (settings: QuizSettings) => void;
};

export function QuizSettingsDialog({ quiz, settings, onApply }: QuizSettingsProps) {
  const [open, setOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState<QuizSettings>(settings);

  const sections = getSections(quiz);
  const difficulties = getDifficulties(quiz);

  const handleOpen = () => {
    setLocalSettings(settings);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    onApply(localSettings);
    setOpen(false);
  };

  const toggleFilter = (type: 'sectionFilter' | 'difficultyFilter', value: string) => {
    setLocalSettings(prev => {
      const current = prev[type];
      const newFilter = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: newFilter };
    });
  };

  return (
    <>
      <Button variant="outlined" startIcon={<SettingsIcon />} onClick={handleOpen}>
        Settings
      </Button>
      
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Quiz Settings</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>General</Typography>
              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={localSettings.shuffleQuestions}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, shuffleQuestions: e.target.checked }))}
                    />
                  }
                  label="Shuffle Questions"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={localSettings.shuffleChoices}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, shuffleChoices: e.target.checked }))}
                    />
                  }
                  label="Shuffle Choices"
                />
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Filter by Section</Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {sections.map(section => {
                  const isSelected = localSettings.sectionFilter.includes(section);
                  return (
                    <Chip
                      key={section}
                      label={section}
                      color={isSelected ? 'primary' : 'default'}
                      variant={isSelected ? 'filled' : 'outlined'}
                      onClick={() => toggleFilter('sectionFilter', section)}
                    />
                  );
                })}
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Select sections to include. Leave all unselected to include all.
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>Filter by Difficulty</Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {difficulties.map(diff => {
                  const isSelected = localSettings.difficultyFilter.includes(diff);
                  return (
                    <Chip
                      key={diff}
                      label={diff}
                      color={isSelected ? 'primary' : 'default'}
                      variant={isSelected ? 'filled' : 'outlined'}
                      onClick={() => toggleFilter('difficultyFilter', diff)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply} variant="contained">Apply & Restart</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
