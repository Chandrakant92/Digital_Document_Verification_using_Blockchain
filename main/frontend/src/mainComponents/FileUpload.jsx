import { Box, Button, Flex, Icon, Input, Select, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useDropzone } from 'react-dropzone';
import { MdUpload } from "react-icons/md";

const FileUpload = ({
    onDrop,file,
    heading,
    selectLabel,handleSelectChange,selectedValue,selectList,
    handleBtn1,btn1Text,
    handleBtn2,btn2Text,
    twobtn=false, isSelect=true,
}) => {
    // handleUniversityChange,selectedUniversity,universityAddresses,
    // handleUpload
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: '.pdf', });
    const bg = useColorModeValue("gray.100", "navy.700");
    const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
    const uploadColor = useColorModeValue("brand.500", "white");
    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const textColor = useColorModeValue("secondaryGray.900", "white");


  return (
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
     {heading}
    </Text>

   { isSelect &&
    <Select variant='auth' label={selectLabel} onChange={handleSelectChange} value={selectedValue}>
      <option value="">{selectLabel}</option>
      {selectList.map((op, index) => (
        <option key={index} value={op}>
          {op}
        </option>
      ))}
    </Select>
    }
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

  <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap={{ base: '10%', }} >
           
         <Button
            onClick={handleBtn1}
            w='140px'
            mt={{ base: "0px", "2xl": "auto" }}
            variant='brand'
            fontWeight='500'>
            {btn1Text}
          </Button>
         { twobtn && 
         <Button
            onClick={handleBtn2}
            w='140px'
            mt={{ base: "0px", "2xl": "auto" }}
            variant='brand'
            fontWeight='500'>
            {btn2Text}
          </Button>
           }
  </SimpleGrid>

        </Stack>

  )
}

export default FileUpload