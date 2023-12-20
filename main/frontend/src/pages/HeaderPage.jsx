// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderPage.css'; // Import the CSS file for styling

const HeaderPage = () => {
  return (
    <div>
    <nav className="navbar">
      <ul className="nav-list" >
        <li className="nav-item">
          <Link to="/" className="nav-link">
            DoQfy
          </Link>
        </li>
      
        <li className="nav-item">
          <Link to="/StudentPage" className="nav-link">
            Student
          </Link>
        </li> 
         <li className="nav-item">
          <Link to="/UniversityPage" className="nav-link">
            University
          </Link>
        </li> 
         <li className="nav-item">
          <Link to="/CompanyPage" className="nav-link">
            Company
          </Link>
        </li> 
        <li className="nav-item">
          <Link to="/OwnerPage" className="nav-link">
            Owner
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AuthPage/login" className="nav-link">
           Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AuthPage/signup" className="nav-link">
           Signup
          </Link>
        </li>
        
       
       </ul>
    </nav>
  </div>
  );
};

export default HeaderPage;
