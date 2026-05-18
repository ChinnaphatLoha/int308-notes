import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export function StatTile({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 1.5,
        minWidth: { xs: 'calc(50% - 6px)', sm: 136 },
        flex: { xs: '1 1 calc(50% - 6px)', sm: '0 0 auto' },
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }
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
