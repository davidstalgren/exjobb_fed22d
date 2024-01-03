import { HomeView } from './components/HomeView';
import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { ProfileView } from './components/ProfileView';

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <LoginPage></LoginPage>
      <HomeView></HomeView>
      <ProfileView></ProfileView>
    </div>
  );
}

export default App;
