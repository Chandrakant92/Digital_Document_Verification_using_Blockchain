import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import StudentPage from './pages/StudentPage';
import UniversityPage from './pages/UniversityPage';
import CompanyPage from './pages/CompanyPage';
import OwnerPage from './pages/OwnerPage';
import MetaMaskInfo from './metamask/MetaMaskInfo';
import { MetaMaskProvider } from './context/MetaMaskContext';
import HeaderPage from './pages/HeaderPage';
import { useUserContext } from './context/UserContext';
import AuthPage from './pages/AuthPage';

function App() {

  const { login,users } = useUserContext();
  
  const isLoggedIn = (role) => {
    const currentUser = users.find(user => user.role === role);
  
    if (currentUser && currentUser.isLoggedIn) {
      return true; // User is already logged in
    }
  
    // User is not logged in, check localStorage for cached data
    const cachedData = localStorage.getItem(role);
    const data = cachedData ? JSON.parse(cachedData) : null;
  
    if (data && data.check) {
      //  'email' is a mandatory field for login
      login(role, { email: data.email }); // Log in the user using the cached email
      return true;
    }
  
    return false; // User is not logged in and no valid cached data found
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
