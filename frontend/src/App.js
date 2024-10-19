import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import CreateRule from './components/CreateRule';
import RuleList from './components/RuleList';
import EvaluateRule from './components/EvaluateRule';
import Footer from './components/Footer';

// Custom MUI theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Container maxWidth="lg">
                    <Box my={4}>
                        <Routes>
                            <Route path="/" element={<RuleList />} />
                            <Route path="/create-rule" element={<CreateRule />} />
                            <Route path="/evaluate-rule" element={<EvaluateRule />} />
                        </Routes>
                    </Box>
                </Container>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
