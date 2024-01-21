import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path='/' element={<LoginPage></LoginPage>}></Route>
              <Route path='/home' element={<HomeView></HomeView>}></Route>
              <Route path='/profile/:userId' element={<ProfileView></ProfileView>}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>} />
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
