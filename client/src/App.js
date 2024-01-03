import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeView } from './components/HomeView';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { ProfileView } from './components/ProfileView';
import { PageNotFound } from './components/PageNotFound';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage></LoginPage>}></Route>
          <Route path='/home' element={<HomeView></HomeView>}></Route>
          <Route path='/profile/:userId' element={<ProfileView></ProfileView>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
