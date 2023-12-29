// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useResolvedPath } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";

const HeaderPage = () => {

  const page = useResolvedPath().pathname;

  const { users, logout } = useUserContext();
  const [role, setRole] = useState("");
  const navigate = useNavigate();


  const isLoggedIn = (role) => {
    const currentUser = users.find(user => user.role === role);
    return currentUser ? currentUser.isLoggedIn : false;
  };

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  useEffect(() => {
    const pageToRoleMapping = {
      '/StudentPage': 'student',
      '/UniversityPage': 'university',
      '/CompanyPage': 'company',
      '/OwnerPage': 'owner',
    };

    setRole(pageToRoleMapping[page] || "");
  }, [page, setRole]);


  const navItems = [
    { path: '/StudentPage', label: 'Student' },
    { path: '/UniversityPage', label: 'University' },
    { path: '/CompanyPage', label: 'Company' },
    { path: '/OwnerPage', label: 'Owner' },
  ];

  const renderNavItems = () => {
    return navItems.map((item, index) => (

      <Typography
        key={index}
        as="li"
        color="blue-gray"
        className="p-1 font-normal md:text-lg  hover:text-black"
      >
        <Link to={item.path} className="flex items-center">
          {item.label}
        </Link>
      </Typography>

    ));
  };

  const handleLogout = () => {
    //  console.log("l: ",role);
   // localStorage.setItem(role, JSON.stringify({email:"",check:false}));
   localStorage.removeItem(role);         
    logout(role);
  };

  return (
    <>

      <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            to='/'
            className="mr-4 py-1.5 font-bold text-xl "
          >
            DoQfy
          </Link>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
              <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {renderNavItems()}
              </ul>
            </div>
            {!isLoggedIn(role) ? <div className="flex items-center gap-x-1">

              <Button
                variant="outlined"
                size="md"
                className="hidden lg:inline-block "
                onClick={() => navigate('/AuthPage/login')}
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="md"
                className="hidden lg:inline-block"
                onClick={() => navigate('/AuthPage/signup')}
              >
                <span>Sign up</span>
              </Button>

            </div> : role != 'owner' ?
              <div className="flex items-center gap-x-1">

                <Button

                  color="red"
                  variant="text"
                  size="md"
                  className="hidden lg:inline-block "
                  onClick={() => handleLogout()}
                >
                  <span>Log Out</span>
                </Button>
              </div> : <></>
            }

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

            {renderNavItems()}
          </ul>
          {!isLoggedIn(role) ? <div className="flex items-center gap-x-1">
            <Button fullWidth variant="outlined" size="sm" className="" onClick={() => navigate('/AuthPage/login')}>
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="" onClick={() => navigate('/AuthPage/signup')}>
              <span>Sign up</span>
            </Button>
          </div> : role != 'owner' ?
            <div className="flex items-center gap-x-1">
              <Button color='red' fullWidth variant="text" size="sm" className="" onClick={() => handleLogout()}>
                <span>Log Out</span>
              </Button>
            </div>
            : <></>}
        </Collapse>
      </Navbar>
    </>
  );
};

export default HeaderPage;
