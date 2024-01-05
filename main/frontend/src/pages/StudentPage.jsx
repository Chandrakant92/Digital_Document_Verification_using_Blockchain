import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import axios from 'axios';
import MiniStatistics from '../components/card/MiniStatistics';
import IconBox from '../components/icons/IconBox';
import { Box, Button, Card, Checkbox, CheckboxGroup, Flex, Icon, IconButton, Input, Select, SimpleGrid, Stack, useCheckboxGroup, useColorModeValue } from '@chakra-ui/react';
import { FaRegAddressBook } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
import { Text } from '@chakra-ui/react';

import { useMemo } from 'react';




import { MdCheckBox, MdDragIndicator } from "react-icons/md";
import { MdUpload } from "react-icons/md";

import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import { TabelDemo } from './TabelDemo';


function StudentPage() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uuid, setUUID] = useState(null);


  const { contract, account } = useMetaMaskContext();


  const [universityAddresses, setUniversityAddresses] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(''); // State for selected university address

  const [companyAddresses, setCompanyAddresses] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(''); // State for selected company address

  const [studentDocumentlist, setStudentDocumentlist] = useState([]); // State for selected company address
  const [DocumentCompanylist, setDocumentCompanylist] = useState([]); // State for selected company address

  const [DocumentDetails, setDocumentDetails] = useState([]); // State for selected company address
  

  const statusdiv = document.getElementById("statusdiv");

  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const brandColor = useColorModeValue("brand", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");





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

      const uniqueId = response.data.uuid;
      const ipfsHash = response.data.cid;
      const universityAddress = selectedUniversity; // Replace with the university's address
      console.log("uuid: ", uniqueId, 'data-> hash: ', ipfsHash, ' university: ', universityAddress)
      uploadDocument(uniqueId, ipfsHash, universityAddress);

    } catch (error) {
      console.error(error);
    }


  };

  // Define your document upload function
  async function uploadDocument(uniqueId, ipfsHash, universityAddress) {
    try {


      // Call the smart contract function
      const transaction = await contract.uploadDocument(uniqueId, ipfsHash, universityAddress, { from: account });
      await transaction.wait();
      console.log('Document uploaded successfully:', transaction);

    //  statusdiv.style.display = "block";
    await  getStudentDocumentList();
    setDocumentDetails([]);

    } catch (error) {

      statusdiv.style.display = "none";
      console.error('Error uploading document:', error.reason);
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
       setDocumentDetails([]);
      getStudentDocumentList();
     
      // getDocumentCompanyList();
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
      const transaction = await contract.includeCompany(uuid, selectedCompany, { from: account });
      await transaction.wait();
      getDocumentCompanyList(uuid);
      console.log('Company included successfully:', transaction);


    } catch (error) {
      console.error('Error including company:', error.reason);
      // Handle the error here
    }
  }
  async function removeCompany() {
    try {


      // Call the smart contract function
      const transaction = await contract.removeCompany(uuid, selectedCompany, { from: account });
      await transaction.wait();
      getDocumentCompanyList(uuid);
      console.log('Company removed successfully:', transaction);


    } catch (error) {
      console.error('Error removing company:', error.reason);
      // Handle the error here
    }
  }

  const handleDocumentChange = (event) => {
    setUUID(event.target.value);
    // console.log(event.target.value);
    getDocumentCompanyList(event.target.value);
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

  const getDocumentCompanyList = async (uuid) => {
    try {
      if (!uuid) {
        setDocumentCompanylist([]);
        return;
      };
      // console.log("d",uuid);
      const transaction = await contract.getDocumentCompanyList(uuid, { from: account });
      console.log('Response getDocumentCompanyList:', transaction); // Log the response

      setDocumentCompanylist(transaction);
    } catch (error) {
      console.error('Error fetching DocumentCompanyList:', error.reason);
    }
  };

  useEffect(() => {
    setDocumentDetails([]);
    studentDocumentlist.forEach((uuid) => {
    
    getDocumentDetails(uuid);
    });
    
   
  }, [studentDocumentlist]);
  
  const getDocumentDetails = async (uuid) => {
    try {
      if (!uuid) {
       
        return;
      };
      // console.log("d",uuid);
      const transaction = await contract.getDocumentDetails(uuid, { from: account });
      console.log('Response getDocumentDetails:', ...transaction); // Log the response
      const simpleArray = [].concat(...transaction);
      simpleArray.push(uuid);
      //return simpleArray;
      setDocumentDetails(prevState => [...prevState, simpleArray]);
    } catch (error) {
      console.error('Error fetching DocumentCompanyList:', error.reason);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
   
    setFile(acceptedFiles[0]);
    setCid(null);
    setPdfUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.pdf', });

  
  const DocumentDetailstabel = DocumentDetails.map((doc,index)=>({
          id:index,
          document:doc[4],
          university:doc[3],
          ipfs_cid:doc[0],
          verified:doc[1],
  }))


          

    return (
      <Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
          gap='20px'
          mb='20px'>
          <MiniStatistics
            startContent={
              <IconBox
                w='40px'
                h='40px'
                bg={boxBg}
                icon={
                  <Icon w='20px' h='20px' as={FaRegAddressBook} color={brandColor} />
                }
              />
            }
            name='Account'
            value={account}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <Stack borderRadius="20px"
            p='7'
            bg={cardbg}
            backgroundClip="border-box"
            spacing='5'
          >
            <Text mb='5'
              color={textColor}
              fontSize='22px'
              fontWeight='500'
              lineHeight='100%'>
              Upload Document
            </Text>
            <Select variant='auth' label='Select University' onChange={handleUniversityChange} value={selectedUniversity}>
              <option value="">Select University</option>
              {universityAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </Select>




            <Flex
              align='center'
              justify='center'
              bg={bg}
              border='1px dashed'
              borderColor={borderColor}
              borderRadius='16px'
              w={{ base: "100%", "2xl": "268px" }}
              minH='180px'
              cursor='pointer'
              {...getRootProps()}


            >
              <Input variant='main' {...getInputProps()} />
              <Button variant='no-effects' >
                <Box >
                  <Icon as={MdUpload} w='80px' h='80px' color={uploadColor} />
                  <Flex justify='center' mx='auto' mb='12px'>
                    <Text fontSize='xl' fontWeight='700' color={uploadColor}>
                      Upload Files
                    </Text>
                  </Flex>
                  <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                    Only PDF file is allowed
                  </Text>
                  <Text fontSize='sm' fontWeight='400' color='secondaryGray.500'>
                    {file && "selected file: " + file.name}
                  </Text>
                </Box>

              </Button>
            </Flex>
            <Button
              onClick={handleUpload}
              w='140px'
              mt={{ base: "0px", "2xl": "auto" }}
              variant='brand'
              fontWeight='500'>
              Upload
            </Button>



          </Stack>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          <Stack
            borderRadius="20px"
            p='7'
            bg={cardbg}
            backgroundClip="border-box"
            spacing='5'
          >
            <Text mb='5'
              color={textColor}
              fontSize='22px'
              fontWeight='500'
              lineHeight='100%'>
              Add or Remove Companies
            </Text>
            {/* <Menu /> */}

            <Select variant='auth' label='Select Document' onChange={handleDocumentChange} value={uuid}>
              <option value="">Select Document</option>
              {studentDocumentlist.map((ipfs, index) => (
                <option key={index} value={ipfs}>
                  {ipfs}
                </option>
              ))}
            </Select>
            <Select variant='auth' label='Select Company' onChange={handleCompanyChange} value={selectedCompany}>
              <option value="">Select Company</option>
              {companyAddresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))}
            </Select>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap={{ base: '10%', }} >
              <Button
                onClick={includeCompany}

                variant='brand'
                fontWeight='500'>
                Include Company
              </Button>
              <Button
                onClick={removeCompany}

                variant='brand'
                fontWeight='500'>
                Remove Company
              </Button>
            </SimpleGrid>
          </Stack>
          {/* second part tabel */}
          <Stack
            borderRadius="20px"
            p='7'
            bg={cardbg}
            backgroundClip="border-box"
            spacing='5'
          >
            <Text mb='3'
              color={textColor}
              fontSize='22px'
              fontWeight='500'
              lineHeight='100%'>
              Document Companies List
            </Text>



          </Stack>

        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <Stack
            borderRadius="20px"
            p='7'
            bg={cardbg}
            backgroundClip="border-box"
            spacing='5'
          >
           
   <Text mb='5'
              color={textColor}
              fontSize='22px'
              fontWeight='500'
              lineHeight='100%'>
              Student Document List
            </Text>
  <TabelDemo data={DocumentDetailstabel}/>
 

            </Stack>
         
        </SimpleGrid>















        {/* <div id="statusdiv" style={{ display: 'none' }}>
        <a target='_blank' href={pdfUrl}>View uploaded document</a>
        <p>IPFS CID: {cid}</p>
      </div> */}




      </Box>
    );
  }

  export default StudentPage;
