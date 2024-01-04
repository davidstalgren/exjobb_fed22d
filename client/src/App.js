import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeView } from './components/HomeView';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { ProfileView } from './components/ProfileView';
import { PageNotFound } from './components/PageNotFound';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './theme/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles'
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Navbar></Navbar>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/home' element={<HomeView></HomeView>}></Route>
            <Route path='/profile/:userId' element={<ProfileView></ProfileView>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
