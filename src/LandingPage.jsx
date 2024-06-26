import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/Layouts/AppAppBar';
import Header from './components/Layouts/Header';
import DataInputSelection from './components/DataInputSelection';
import Footer from './components/Layouts/Footer';
import getLPTheme from './getLPTheme';

export default function LandingPage() {
  const [mode, setMode] = React.useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Header />
      <Divider />
      <Box sx={{ bgcolor: 'background.default' }}>
        <DataInputSelection />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
