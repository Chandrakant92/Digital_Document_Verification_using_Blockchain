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
            Student Page
          </Link>
        </li> 
         <li className="nav-item">
          <Link to="/UniversityPage" className="nav-link">
            University Page
          </Link>
        </li> 
         <li className="nav-item">
          <Link to="/CompanyPage" className="nav-link">
            Company Page
          </Link>
        </li> 
        <li className="nav-item">
          <Link to="/OwnerPage" className="nav-link">
            Owner Page
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/LoginPage" className="nav-link">
           Login Page
          </Link>
        </li>
        
       
       </ul>
    </nav>
  </div>
  );
};

export default HeaderPage;
