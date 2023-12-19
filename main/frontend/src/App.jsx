import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <HeaderPage />
      <MetaMaskProvider>
        <MetaMaskInfo />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/StudentPage" element={<StudentPage />} />
          <Route path="/UniversityPage" element={<UniversityPage />} />
          <Route path="/CompanyPage" element={<CompanyPage />} />
          <Route path="/OwnerPage" element={<OwnerPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />

        </Routes>
      </MetaMaskProvider>
    </Router>
  );
}

export default App;
