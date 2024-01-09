import React, { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Import your page components
import ProtectedRoute from "./mainComponents/ProtectedRoute";
import AdminNavbar from "./components/Navbar/Navbar";

// Chakra imports
import { Portal, Box, useDisclosure, Text, Button, Link } from '@chakra-ui/react';
import routes from "./routes";
import { SidebarContext } from "./context/SidebarContext";
import Sidebar from "./components/sidebar/Sidebar";
import { PageProvider } from "./context/PageContext";
import { UserProvider, useUserContext } from "./context/UserContext";
import { useMetaMaskContext } from "./context/MetaMaskContext";


function App() {
  const [ fixed ] = useState(false);
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
	const { onOpen ,isOpen} = useDisclosure();
  const {  users,login } = useUserContext();

  toast.onChange(payload => {
    if(payload.status === "added" ) {
     const audio = new Audio('main/frontend/src/assets/toast_sound.mp3');
     audio.play();
    //  const audio = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
    //  audio.play();
   //  console.log("toast added")
    }
  })
 
  



  return (
    <Router>
      <PageProvider>
      
        <ToastContainer position="bottom-right"/>
    <Box>
      
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar
        }}>
        <Sidebar routes={routes} display='none' />
        <Box
        
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <AdminNavbar
              //  onOpen={onOpen}
              //  isOpen={isOpen}
               // logoText={'Horizon UI Dashboard PRO'}
               fixed={fixed}
                
              />
            </Box>
          </Portal>

          
            <Box  mx='auto'  p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' 
            pt={{ base: "180px", md: "110px", xl: "110px" }} >
          
           
            <Routes>
        {routes.map((route, index) => (
          
          <Route
            key={index}
            path={route.name=='Authentication'?route.path2:route.path}
            element={
              route.role  ? (
                <ProtectedRoute role={route.role}>{route.component}</ProtectedRoute>
              ) : (
                
                route.component
              )
            }
          />
        ))}
      </Routes>
        
            </Box>
          
          <Box>
            {/* <Footer /> */}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
  
  </PageProvider>
</Router>
   );
}

export default App;
