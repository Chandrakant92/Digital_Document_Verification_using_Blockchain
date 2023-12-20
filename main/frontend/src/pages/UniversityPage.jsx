import React, { useState, useEffect,useContext } from 'react';
import { MetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';

import * as XLSX from 'xlsx';

import { v4 as uuid } from "uuid";
// Create a Web3 instance using the current Ethereum provider (MetaMask)
function UniversityPage() {
  const [file, setFile] = useState(null);
  const [oldcid, setoldCid] = useState(null);
  const [newcid, setnewCid] = useState(null);
  
  const [pdfUrl, setPdfUrl] = useState(null);

  const { contract, account } = useContext(MetaMaskContext);

  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company address
  
  const [universityDocumentlist, setUniversityDocumentlist] = useState([]); // State for selected company address
  const [selectedUUID, setSelectedUUID] = useState(''); // State for selected company address
  
  const [excelFile, setExcelFile] = useState(null);
  const [uploadData, setUploadData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);



  const statusdiv= document.getElementById("statusdiv");
 


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setoldCid(null);
    setnewCid(null);
    setPdfUrl(null);
  };



  const getHash = async () => { //hash for verify//
    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('selectedUUID', selectedUUID); // Include the selectedUUID in the formData

    try {
      const oldresponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    
      
      
    console.log(oldresponse.data);

    setoldCid(oldresponse.data.cid);
   const check= await checkStatusnVerify(oldresponse.data.cid);
    
    if(check){


    try {
      const newresponse = await axios.post('http://localhost:5000/issue', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
          console.log(newresponse.data);
  
      setnewCid(newresponse.data.cid);
  
      setPdfUrl(newresponse.data.ifpsLink);
      verifyDocument(oldresponse.data.cid,newresponse.data.cid);
  
    } catch (error) {
      console.error(error);
    }
  }else{
    console.error("Document is invalid");
  }

  } catch (error) {
    console.error(error);
  }
};

async function checkStatusnVerify(_cid) {
  try {

  

    const transaction = await contract.checknverify(selectedUUID,_cid,{ from: account });
    
    console.log('Document is Verified:', transaction);
      return true;
  } catch (error) {
    console.error('Error checking verification status:',error);
    // Handle the error here
      return false;
  }
}



  const getHash2 = async () => { //hash for unverify//
    const formData = new FormData();
    formData.append('certificate', file);
    formData.append('selectedUUID', selectedUUID); // Include the selectedUUID in the formData

    try {
      const newresponse = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      
    console.log(newresponse.data);

    setnewCid(newresponse.data.cid);
    setoldCid(null);
    setPdfUrl(null);

    unverifyDocument(newresponse.data.cid);

    } catch (error) {
      console.error(error);
    }


  };

  

// Define your document upload function
async function verifyDocument(_oldcid,_newcid) {
  try {
   
    // Call the smart contract function
    console.log("data:",selectedUUID,_oldcid,_newcid);
    const transaction = await contract.verifyDocument(selectedUUID,_oldcid,_newcid,{ from: account });
    await transaction.wait();
    
    statusdiv.style.display="block";
    console.log('Document Verified successfully:', transaction);


  } catch (error) {
    
    statusdiv.style.display="none";
    console.error('Error verifying document:',error);
    // Handle the error here
  }
}
async function unverifyDocument(_newcid) {
  try {
    
    // Call the smart contract function
    const transaction = await contract.unverifyDocument(selectedUUID,_newcid,{ from: account });
    await transaction.wait();

    console.log('Document unVerified successfully:', transaction);


  } catch (error) {
    console.error('Error unverifying document:',error.reason);
    // Handle the error here
  }
}



  useEffect(() => {
    // Check if contract is not null
    if (contract !== null) {
      
      getUniversityDocumentList();
      fetchCompanyAddresses();
    }
  }, [account]); // Add contract as a dependency

  // Function to handle dropdown selection
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  const handleDocumentChange = (event) => {
    setSelectedUUID(event.target.value);
  };

 // Function to fetch company addresses from the smart contract
  const fetchCompanyAddresses = async () => {
    try {
      const transaction = await contract.getAllCompanyAddresses({ from: account });
      console.log('fetch company addresses:', transaction); // Log the response
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
      const transaction = await contract.includeCompany(selectedUUID,selectedCompany,{ from: account });
      await transaction.wait();
      console.log('Company included successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error including company:',error.reason);
      // Handle the error here
    }
  }
  async function removeCompany() {
    try {
  
     
      // Call the smart contract function
      const transaction = await contract.removeCompany(selectedUUID,selectedCompany,{ from: account });
      await transaction.wait();
  
      console.log('Company removed successfully:', transaction.transactionHash);
  
  
    } catch (error) {
      console.error('Error removing company:',error.reason);
      // Handle the error here
    }
  }



  
// Define your document upload function
async function addUniversityfn() {
  try {

      // Call the 'addUniversity' function with the provided university address
      const transaction = await contract.addUniversity({ from: account });

      // Wait for the transaction to be mined and get the transaction hash
      await transaction.wait();

     console.log('University added successfully:', transaction);
  
  } catch (error) {
    console.error('Error UniversityAdded:',error.reason);
    // Handle the error here
  }
}

async function checkUniversity() {
  try {
   
    // Call the smart contract function
    const transaction = await contract.checkUniversity(account,{ from: account });
   
    console.log('university status:', transaction);


  } catch (error) {
    console.error('Error checking university:',error.reason);
    // Handle the error here
  }
}

 const getUniversityDocumentList = async () => {
  try {
    const transaction = await contract.getUniversityDocumentList({ from: account });
    console.log('Response getUniversityDocumentList:', transaction); // Log the response
   
    setUniversityDocumentlist(transaction);
  } catch (error) {
    console.error('Error fetching documents:', error.reason);
  }
};

async function viewDocument() {
  window.location.href = `/CompanyPage?document=${selectedUUID}`;
}

//multiple file uplaod//

const handleExcelFileChange = (event) => {
  const file = event.target.files[0];
  setExcelFile(file);

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
   
    const excelData = XLSX.utils.sheet_to_json(worksheet);
    setUploadData(excelData);
    console.log("data: ",excelData);
  };
  reader.readAsArrayBuffer(file);
};

const handleFilesChange = (event) => {
  const files = event.target.files;
  setSelectedFiles([...selectedFiles, ...files]);
};

const handlemultipleUpload = async () => {
  if (!excelFile) {
    console.error('Please select an Excel file');
    return;
  }

  if (uploadData.length === 0) {
    console.error('No data found in the Excel file');
    return;
  }

  try {
    const uploadDataWithResponses = [];
    const studentAddressList=[];
    for (const data of uploadData) {
      const file = selectedFiles.find((file) => file.name === data.fileName); // Find file by name
      
      if (file) {
        const formData = new FormData();
        const id = uuid();
        formData.append('certificate', file);
        formData.append('selectedUUID', id); // Include the selectedUUID in the formData
        
        const response = await axios.post('http://localhost:5000/issue', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      
        uploadDataWithResponses.push([id, response.data.cid]);
        studentAddressList.push(data.studentAddress);
        console.log("Uploaded for",id,data.studentAddress,response.data);
      } else {
        console.error(`File not found for ${data.studentAddress}`);
      }
      
    }
    uploadDocumentnVerify(uploadDataWithResponses,studentAddressList,uploadDataWithResponses.length);
  } catch (error) {
    console.error('Error occurred during upload:', error);
  }
};
async function uploadDocumentnVerify(data,studentAddressList,count) {
  try {
    console.log("data:",data,"studentaddress:",studentAddressList," count: ",count);
    const transaction = await contract.uploadDocumentnVerify(data,studentAddressList,count,{ from: account });
    await transaction.wait();
    
    console.log('Document upload n Verifying successfully:', transaction);


  } catch (error) {
    
    console.error('Error upload n verifying document:',error);
    // Handle the error here
  }
}

  return (
    <div>
        <br/>
      <h5>Account:{account}</h5>
      <h3>Add University</h3>
      <button onClick={addUniversityfn}>Add university</button><br></br>
      <button onClick={checkUniversity}>check University</button>

     <div>
        <label>select document:</label>
        <select onChange={handleDocumentChange} value={selectedUUID}>
          <option value="">Select document</option>
          {universityDocumentlist.map((ipfs, index) => (
            <option key={index} value={ipfs}>
              {ipfs}
            </option>
          ))}
        </select>
        <button onClick={viewDocument}>view Document</button>

      </div>


      
      <input type="file" accept=".pdf" onChange={handleFileChange} />
     
     
      <button onClick={getHash}>Verify Document</button>


     <br></br><br></br>
      
      <button onClick={getHash2}>unVerify Document</button>
      <br></br><br></br>
      <div id="statusdiv" style={{ display: 'none' }}> 
     
       <p>new IPFS Hash: {newcid}</p>
       <a target='_blank' href={pdfUrl}>View uploaded document</a>
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
     <h4>Upload Multiple Files</h4>
      <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleExcelFileChange} />
      <input type="file" accept=".pdf" multiple onChange={handleFilesChange} />
      <button onClick={handlemultipleUpload}>Upload n verify</button>
      </div>
     

    </div>
  );
}

export default UniversityPage;
