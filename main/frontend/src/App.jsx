import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import UniversityPage from './pages/UniversityPage';
import CompanyPage from './pages/CompanyPage';
import OwnerPage from './pages/OwnerPage';
import StudentSignup from './pages/StudentSignup';
import StudentLogin from './pages/StudentLogin';
import MetaMaskInfo from './metamask/MetaMaskInfo';
import { MetaMaskProvider } from './context/MetaMaskContext';
import HeaderPage from './pages/HeaderPage';
import { useUserContext } from './context/UserContext';
import AuthPage from './pages/AuthPage';

function App() {

  const { users } = useUserContext();
  
  const isLoggedIn = (role) => {
    const currentUser = users.find(user => user.role === role);
    return currentUser ? currentUser.isLoggedIn : false;
  };

  const RedirectToLogin = () => <Navigate to="/AuthPage/login" />;


  return (
    <Router>
      <HeaderPage />
      <MetaMaskProvider>
          <MetaMaskInfo />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/StudentPage"
              element={isLoggedIn('student') ? <StudentPage /> : <RedirectToLogin />}
            />
            <Route
              path="/UniversityPage"
              element={isLoggedIn('university') ? <UniversityPage /> : <RedirectToLogin />}
            />
            <Route
              path="/CompanyPage"
              element={isLoggedIn('company') ? <CompanyPage /> : <RedirectToLogin />}
            />
            <Route
              path="/OwnerPage"
              element= {<OwnerPage />} 
            />
            <Route path="/AuthPage/:type" element={<AuthPage />} />

          </Routes>
      </MetaMaskProvider>
    </Router>
  );
}

export default App;
