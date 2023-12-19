import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from './ContractInfo';
import { MetaMaskContext } from '../context/MetaMaskContext';

function MetaMaskInfo() {
  const { updateContract, updateAccount } = useContext(MetaMaskContext);
  // Other state variables and logic remain the same

  useEffect(() => {
    async function loadMetaMaskData() {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);

          updateContract(contractInstance);
          
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const currentAccount = accounts[0];
          updateAccount(currentAccount);

          window.ethereum.on('accountsChanged', (newAccounts) => {
            updateAccount(newAccounts[0]);
          });
        }
      } catch (error) {
        console.error('Error loading MetaMask data:', error);
        // Display an error message to the user if needed
      }
    }

    loadMetaMaskData();
  }, []);

  // Rest of the component code remains the same
}

export default MetaMaskInfo;
