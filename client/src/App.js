import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomeView } from './components/HomeView';
import { LoginPage } from './components/LoginPage';
import { ProfileView } from './components/ProfileView';
import { PageNotFound } from './components/PageNotFound';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
function App() {
  const isLoggedIn = Boolean(useSelector((state) => state.token))
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path='/' element={<LoginPage></LoginPage>}></Route>
              <Route path='/home' element={isLoggedIn ? <HomeView></HomeView> : <Navigate to='/'/>}></Route>
              <Route path='/profile/:userId' element={isLoggedIn ? <ProfileView></ProfileView> : <Navigate to='/'/>}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
