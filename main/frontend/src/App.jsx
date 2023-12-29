import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";

// Import your page components
import HomePage from "./pages/HomePage";
import StudentPage from "./pages/StudentPage";
import UniversityPage from "./pages/UniversityPage";
import CompanyPage from "./pages/CompanyPage";
import OwnerPage from "./pages/OwnerPage";
import MetaMaskInfo from "./metamask/MetaMaskInfo";
import { MetaMaskProvider } from "./context/MetaMaskContext";
import HeaderPage from "./pages/HeaderPage";
import { useUserContext } from "./context/UserContext";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  



  return (
    <Router>
      <HeaderPage />
      <MetaMaskProvider>
        <MetaMaskInfo />

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route
            path="/StudentPage"
            element={
              <ProtectedRoute role={'student'}>
                <StudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UniversityPage"
            element={
              <ProtectedRoute role={"university"}>
                <UniversityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CompanyPage"
            element={
              <ProtectedRoute role={"company"}>
                <CompanyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OwnerPage"
            element={
              <ProtectedRoute role={"owner"}>
                <OwnerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/AuthPage/:type" element={<AuthPage />} />
        </Routes>
      </MetaMaskProvider>
    </Router>
  );
}

export default App;
