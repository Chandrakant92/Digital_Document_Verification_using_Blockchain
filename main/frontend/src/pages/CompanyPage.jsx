import React, { useState, useEffect,useContext } from 'react';
import { MetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// Create a Web3 instance using the current Ethereum provider (MetaMask)
function CompanyPage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [status, setStatus] = useState([]);
  const [QrCodeText, setQrCodeText] = useState('');

  const { contract, account } = useContext(MetaMaskContext);

  const location = useLocation();
 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const documentValue = searchParams.get('document');

    if (documentValue) {
      setQrCodeText(documentValue);
    }
  }, [location.search]);




  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setCid(null);
    setStatus([]);
  };

  const getHash = async () => {
    const formData = new FormData();
    formData.append('certificate', file);
    
    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
    console.log(response.data);

      setCid(response.data.cid);

   console.log("uuid",QrCodeText,"hash",response.data.cid);

   checkStatusnVerify(response.data.cid);

    } catch (error) {
      console.error(error);
    }


  };

// Define your document upload function
async function checkStatus() {
  try {

    // Call the smart contract function
    const transaction = await contract.checkStatus(QrCodeText,{ from: account });
    setStatus(transaction);
    console.log('Document is Verified:', transaction);
    

  } catch (error) {
    console.error('Error checking verification status:',error.reason);
    // Handle the error here
  }
}
async function checkStatusnVerify(_cid) {
  try {

  
    // Call the smart contract function
    console.log("uuid",QrCodeText,"hash",_cid);

    const transaction = await contract.checknverify(QrCodeText,_cid,{ from: account });
    
    console.log('Document is Verified:', transaction);

  } catch (error) {
    console.error('Error checking verification status:',error.reason);
    // Handle the error here
  }
}

// Define your document upload function
async function addCompanyfn() {
    try {
  
      // Call the smart contract function
      const transaction = await contract.registerCompany({ from: account });
      await transaction.wait();
      console.log('Company added successfully:', transaction);
          
  
  
    } catch (error) {
      console.error('Error registring company:',error.reason);
      // Handle the error here
    }
  }
  
  
  async function checkCompany() {
    try {
     
      // Call the smart contract function
      const transaction = await contract.checkCompany(account,{ from: account });
     
      console.log('Company status:', transaction);
  
  
    } catch (error) {
      console.error('Error checking company:',error.reason);
      // Handle the error here
    }
  }

  const handleChange = (event) => {
    setQrCodeText(event.target.value);
  };
  
  
    return (
      <div>
         <br/>
      <h5>Account:{account}</h5>
        <h3>Register Company</h3>
        <button onClick={addCompanyfn}>Register Company</button><br></br>
        <button onClick={checkCompany}>check company</button>
  
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        {/* <button onClick={getHash}>Generate Hash</button>
   */}
        {cid && <p>IPFS Hash: {cid}</p>}
  
        
         <input
          type="text"
          placeholder="document id"
          value={QrCodeText}
          onChange={handleChange}
        
        />

        <button onClick={getHash}>check verification status n verify</button>
        <button onClick={checkStatus}>check verification status</button>
        
        {status[0] && <a target='_blank' href={`http://localhost:8080/ipfs/${status[1]}`}>View uploaded document</a>}

       
  
        
       
  
      </div>
    );
  }
  
  export default CompanyPage;
