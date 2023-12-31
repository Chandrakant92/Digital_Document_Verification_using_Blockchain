import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { MetaMaskProvider } from './context/MetaMaskContext.jsx'
import { ChakraProvider } from '@chakra-ui/react';

import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import theme from './theme/theme.js'
import { ThemeP } from './context/ThemeContext.jsx'
import MetaMaskInfo from './metamask/MetaMaskInfo.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <UserProvider>
          <MetaMaskProvider>
          <MetaMaskInfo />

           <ThemeP>
           
              <App />
           
            </ThemeP>
          </MetaMaskProvider>
        </UserProvider>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>
  ,
)
