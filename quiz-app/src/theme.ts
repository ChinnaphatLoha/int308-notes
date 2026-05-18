import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f6f7fb',
      paper: '#ffffff'
    },
    primary: {
      main: '#0f766e',
      dark: '#0b5f59',
      light: '#ccfbf1'
    },
    secondary: {
      main: '#475569'
    },
    success: {
      main: '#15803d'
    },
    error: {
      main: '#b42318'
    },
    warning: {
      main: '#b45309'
    },
    text: {
      primary: '#172033',
      secondary: '#5b6475'
    },
    divider: '#d9dee8'
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: 'clamp(1.85rem, 4vw, 3.25rem)',
      lineHeight: 1.05,
      fontWeight: 800,
      letterSpacing: 0
    },
    h2: {
      fontSize: 'clamp(1.35rem, 2.8vw, 2rem)',
      lineHeight: 1.15,
      fontWeight: 760,
      letterSpacing: 0
    },
    h3: {
      fontSize: '1.15rem',
      lineHeight: 1.25,
      fontWeight: 760,
      letterSpacing: 0
    },
    body1: {
      lineHeight: 1.65,
      letterSpacing: 0
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: 0
    },
    button: {
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

export default theme;
