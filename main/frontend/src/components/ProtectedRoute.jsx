import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';




const ProtectedRoute = ({role, children }) => {

    const { login, users } = useUserContext();
    
    const isLoggedIn = (role) => {
    
        const currentUser = users.find((user) => user.role === role);
    
        if (currentUser && currentUser.isLoggedIn) {
          return true; // User is already logged in
        }
    
        // User is not logged in, check localStorage for cached data
        const cachedData = localStorage.getItem(role);
        const data = cachedData ? JSON.parse(cachedData) : false;
    
        if (data) {
          // 'email' and 'address' are mandatory fields for login
          login(role, { email: data.email, address: data.address });
          return true;
        }
    
        return false; // User is not logged in and no valid cached data found
      };
    

    return (
        isLoggedIn(role) ? children : <Navigate to="/AuthPage/login" /> // Redirect to login if not authenticated
        
    );
};

export default ProtectedRoute;
