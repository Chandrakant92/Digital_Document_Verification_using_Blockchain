import React, { useState, useEffect,useContext } from 'react';
import { MetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';

// Create a Web3 instance using the current Ethereum provider (MetaMask)
function OwnerPage() {
  const { contract, account } = useContext(MetaMaskContext);

  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company address
  
  const [universityAddresses, setUniversityAddresses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(''); // State for selected university address




   // Function to handle dropdown selection
   const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  
   // Function to handle dropdown selection
   const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

 // Function to fetch company addresses from the smart contract
  const fetchCompanyAddresses = async () => {
    try {
      const transaction = await contract.getAllCompanyAddresses({ from: account });
      const uniqueAddressesSet = new Set(transaction);
      // Convert the Set back to an array.
      const uniqueAddressesArray = [...uniqueAddressesSet];
      setCompanyAddresses(uniqueAddressesArray);
      console.log('company addresses:', uniqueAddressesArray); // Log the response
    
    } catch (error) {
      console.error('Error fetching Company addresses:', error.reason);
    }
  };
  // Function to fetch university addresses from the smart contract
  const fetchUniversityAddresses = async () => {
    try {
     // const response = await contract.methods.getAllUniversityAddresses().call();
     const transaction = await contract.getAllUniversityAddresses({ from: account });

     const uniqueAddressesSet = new Set(transaction);
     // Convert the Set back to an array.
     const uniqueAddressesArray = [...uniqueAddressesSet];
      setUniversityAddresses(uniqueAddressesArray);
      console.log('Response from getuniversity:', uniqueAddressesArray); // Log the response
 
    } catch (error) {
      console.error('Error fetching university addresses:', error.reason);
    }
  };


  useEffect(() => {
    // Check if contract is not null
    if (contract !== null) {
      
      fetchCompanyAddresses();
      fetchUniversityAddresses();
    }
  }, [contract]); // Add contract as a dependency

 


  async function verifyCompany() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.verifyCompany(selectedCompany,{ from: account });
      await transaction.wait();
      console.log('Company verified successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error verifying company:',error.reason);
      // Handle the error here
    }
  }
  async function unverifyCompany() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.unverifyCompany(selectedCompany,{ from: account });
      await transaction.wait();
      console.log('Company unverified successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error unverifying company:',error.reason);
      // Handle the error here
    }
  }
  
  async function verifyUniversity() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.verifyUniversity(selectedUniversity,{ from: account });
      await transaction.wait();
      console.log('university verified successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error verifying university:',error.reason);
      // Handle the error here
    }
  }
  async function unverifyUniversity() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.removeUniversity(selectedUniversity,{ from: account });
      await transaction.wait();
      console.log('university unverified successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error unverifying university:',error.reason);
      // Handle the error here
    }
  }
  async function checkUniversity() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.checkUniversity(selectedUniversity,{ from: account });
     
      console.log('university status:', transaction);
  
  
    } catch (error) {
      console.error('Error checking university:',error.reason);
      // Handle the error here
    }
  }
  async function checkCompany() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.checkCompany(selectedCompany,{ from: account });
     
      console.log('Company status:', transaction);
  
  
    } catch (error) {
      console.error('Error checking company:',error.reason);
      // Handle the error here
    }
  }
  async function getOwner() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.getOwner({ from: account });
     
      console.log('owner address:', transaction);
  
  
    } catch (error) {
      console.error('Error checking owner or you are not owner:',error.reason);
      // Handle the error here
    }
  }
  
  return (
    <div >
        <br/>
      <h5>Account:{account}</h5>
      <button onClick={getOwner}>Get Owner of contract</button>

      <div>
        <label>verify or unverify Company:</label>
        <select onChange={handleCompanyChange} value={selectedCompany}>
          <option value="">Select Company</option>
          {companyAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={verifyCompany}>verify Company</button>
      <button onClick={unverifyCompany}>unverify Company</button>
      <button onClick={checkCompany}>check Company</button>

      <div>
        <label>verify or unverify university:</label>
        <select onChange={handleUniversityChange} value={selectedUniversity}>
          <option value="">Select University</option>
          {universityAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      <button onClick={verifyUniversity}>verify university</button>
      <button onClick={unverifyUniversity}>unverify university</button>
      <button onClick={checkUniversity}>check university</button>


      </div>
  );
}

export default OwnerPage;

