import React, { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { exportComponentAsPNG } from 'react-component-export-image';
import { Box, Button, Flex, Image, Input, Stack, Text } from '@chakra-ui/react';

const Test = () => {
  const [name, setName] = useState('Yash Sugandhi');
  const [organization, setOrganization] = useState('SSGMCE');
  const [signer, setSigner] = useState("Principal");
  const certificateRef = useRef(null);

 

  const handleExport = () => {
    exportComponentAsPNG(certificateRef, { fileName: 'certificate' });
  };

  return (
    <Flex justifyContent={'space-evenly'}>


      {/* User Input Fields */}
      <Box  p='5' bg='white' borderRadius='20px' >
        <Stack spacing={'5'}>
        <label>Name:</label>
        <Input variant={'auth'}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value )}
         />
    
        <label>Organization:</label>
        <Input variant={'auth'}
          type="text"
          value={organization}
          onChange={(e) => setOrganization( e.target.value )}
         />

        <label>Signer:</label>
        <Input variant={'auth'}
          type="text"
          value={signer}
          onChange={(e) => setSigner(e.target.value )}
        />
        <Button onClick={handleExport}>Download Certificate</Button>
        </Stack>
      </Box>


      {/* Certificate */}
      <div ref={certificateRef} bg='white' >
        {/* Text Boxes */}
        <img
   
    src='./images/c1.png'
    alt='Dan Abramov'
  
    width='600px'
  />
      </div>

      
    </Flex>
  );
};

export default Test;
