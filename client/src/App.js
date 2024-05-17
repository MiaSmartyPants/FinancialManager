import logo from './logo.svg';
import './App.css';
import Transactions from './components/Transactions';
import Reports from './components/Reports';
import Goals from './components/Goals';
import UserInfoCard from './components/UserInfoCard';
import { useAuth0 } from '@auth0/auth0-react';


const QuickLoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="quick-login-button" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

function App() {
  const { isAuthenticated, logout } = useAuth0();
  return (
    <div className="App">
      <h1>Transaction Manager</h1>
      {isAuthenticated ? (
        <div>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
        <br></br>
        Thanks for creating an account, we'll save you for next time!
        <UserInfoCard />
        <Transactions/>
        <Goals/>
        <br></br>
        <Reports />
        </div>
      ) : (
        <QuickLoginButton />
      )}

    </div>
  );
}

export default App;
