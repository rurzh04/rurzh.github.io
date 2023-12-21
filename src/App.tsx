import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import AppHeader from './components/header/appHeader';
import Contacts from './pages/contacts';
import Dashboard from './pages/dashboard';

import './style/style.scss';

function App() {
    const [theme, colorMode] = useMode();
    return (
        <Router>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="app">
                        <AppHeader />
                        <main className="content">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/user" element={<Contacts />} />
                            </Routes>
                        </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </Router>
    );
}

export default App;
