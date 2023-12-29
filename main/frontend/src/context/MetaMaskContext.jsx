import React, { createContext, useState,useContext } from 'react';

export const MetaMaskContext = createContext();

// Custom hook to use the context
export const useMetaMaskContext = () => {
  return useContext(MetaMaskContext);
};


export const MetaMaskProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');

  const updateContract = (newContract) => {
    setContract(newContract);
  };

  const updateAccount = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <MetaMaskContext.Provider value={{ contract, updateContract, account, updateAccount }}>
      {children}
    </MetaMaskContext.Provider>
  );
};
