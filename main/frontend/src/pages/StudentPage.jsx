import React, { useState, useEffect,useContext } from 'react';
import { MetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';

// Create a Web3 instance using the current Ethereum provider (MetaMask)
function StudentPage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uuid, setUUID] = useState(null);


  const { contract, account } = useContext(MetaMaskContext);

  

  const [universityAddresses, setUniversityAddresses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(''); // State for selected university address

  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company address
  
  const [studentDocumentlist, setStudentDocumentlist] = useState([]); // State for selected company address
  
  const statusdiv= document.getElementById("statusdiv");

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setCid(null);
    setPdfUrl(null);
  };



  const handleUpload = async () => {
   
    const formData = new FormData();
    formData.append('certificate', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
    console.log(response.data);

      setCid(response.data.cid);
      setPdfUrl(response.data.ifpsLink);
      setUUID(response.data.uuid);

      const uniqueId=response.data.uuid;
    const ipfsHash = response.data.cid;
const universityAddress = selectedUniversity; // Replace with the university's address
console.log("uuid: ",uniqueId,'data-> hash: ',ipfsHash,' university: ',universityAddress)
uploadDocument(uniqueId,ipfsHash, universityAddress);

    } catch (error) {
      console.error(error);
    }


  };

// Define your document upload function
async function uploadDocument(uniqueId,ipfsHash, universityAddress) {
  try {

   
    // Call the smart contract function
    const transaction = await contract.uploadDocument(uniqueId,ipfsHash, universityAddress,{ from: account });
    await transaction.wait();
    console.log('Document uploaded successfully:', transaction);

      statusdiv.style.display="block";    
    getStudentDocumentList();

  } catch (error) {
    
     statusdiv.style.display="none";
    console.error('Error uploading document:',error.reason);
    // Handle the error here
  }
}

 // Function to handle dropdown selection
  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };
  // Function to fetch university addresses from the smart contract
  const fetchUniversityAddresses = async () => {
    try {
     const transaction = await contract.getAllUniversityAddresses({ from: account });

     console.log('Response from getuniversity:', transaction); // Log the response
     const uniqueAddressesSet = new Set(transaction);
     // Convert the Set back to an array.
     const uniqueAddressesArray = [...uniqueAddressesSet];
      setUniversityAddresses(uniqueAddressesArray);
    } catch (error) {
      console.error('Error fetching university addresses:', error.reason);
    }
  };

  useEffect(() => {
    // Check if contract is not null
    if (contract !== null) {
      fetchUniversityAddresses();
      fetchCompanyAddresses();
      getStudentDocumentList();
    }
  }, [account]); // Add contract as a dependency

  // Function to handle dropdown selection
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
 // Function to fetch company addresses from the smart contract
  const fetchCompanyAddresses = async () => {
    try {
      const transaction = await contract.getAllCompanyAddresses({ from: account });
      console.log('Response from getcompanies:', transaction); // Log the response
      const uniqueAddressesSet = new Set(transaction);
      // Convert the Set back to an array.
      const uniqueAddressesArray = [...uniqueAddressesSet];
      setCompanyAddresses(uniqueAddressesArray);
    } catch (error) {
      console.error('Error fetching Company addresses:', error.reason);
    }
  };

  async function includeCompany() {
    try {
  
     
      // Call the smart contract function
      const transaction = await contract.includeCompany(uuid,selectedCompany,{ from: account });
      await transaction.wait();
      console.log('Company included successfully:', transaction);
  
  
    } catch (error) {
      console.error('Error including company:',error.reason);
      // Handle the error here
    }
  }
  async function removeCompany() {
    try {
  
     
      // Call the smart contract function
      const transaction = await contract.removeCompany(uuid,selectedCompany,{ from: account });
      await transaction.wait();
      console.log('Company removed successfully:', transaction);
  
  
    } catch (error) {
      console.error('Error removing company:',error.reason);
      // Handle the error here
    }
  }

  const handleDocumentChange = (event) => {
    setUUID(event.target.value);
  };

  
 const getStudentDocumentList = async () => {
  try {
    const transaction = await contract.getStudentDocumentList({ from: account });
    console.log('Response getStudentDocumentList:', transaction); // Log the response
   
    setStudentDocumentlist(transaction);
  } catch (error) {
    console.error('Error fetching documents:', error.reason);
  }
};

  return (
    <div >
      <br/>
      <h5>Account:{account}</h5>
      <h1>IPFS File Upload</h1>
       <div>
        <label>Select a University:</label>
        <select onChange={handleUniversityChange} value={selectedUniversity}>
          <option value="">Select University</option>
          {universityAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      
      <input type="file" accept=".pdf" onChange={handleFileChange} />

     

      <button onClick={handleUpload}>Upload</button>
      <div id="statusdiv" style={{ display: 'none' }}> 
       <a target='_blank' href={pdfUrl}>View uploaded document</a>
       <p>IPFS CID: {cid}</p>
       </div>
      <div>
        <label>select document:</label>
        <select onChange={handleDocumentChange} value={uuid}>
          <option value="">Select document</option>
          {studentDocumentlist.map((ipfs, index) => (
            <option key={index} value={ipfs}>
              {ipfs}
            </option>
          ))}
        </select>
      </div>
      

      <div>
        <label>Add or Remove Company:</label>
        <select onChange={handleCompanyChange} value={selectedCompany}>
          <option value="">Select Company</option>
          {companyAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={includeCompany}>include Company</button>
      <button onClick={removeCompany}>remove Company</button>

    </div>
  );
}

export default StudentPage;
