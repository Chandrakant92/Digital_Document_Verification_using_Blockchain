import React, { useRef, useState } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';
import { Box, Button, Flex, Image, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const Test = () => {
  const [name, setName] = useState('Yash Sugandhi');
  const [about, setAbout] = useState('has demonstrated exceptional commitment and excellence, earning this certificate as a testament to their commendable accomplishments in');

  const [event, setEvent] = useState('Tabel Tennis');

  
  const [organization, setOrganization] = useState('SSGMCE');
  const certificateRef = useRef(null);
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  


  const handleExport = () => {
    exportComponentAsPNG(certificateRef, { fileName: 'certificate' });
  };

  return (
    <Flex bg={cardbg}  borderRadius='20px'>


      {/* User Input Fields */}
      <Box   m="7">
        <Stack spacing={'5'}>
          <label>Name:</label>
          <Input variant={'auth'}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <label>About:</label>
          <Input variant={'auth'}
            type="text"
            value={about} 
            onChange={(e) => setAbout(e.target.value)}
          />
          <label>Event:</label>
          <Input variant={'auth'}
            type="text"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />

          <label>Organization:</label>
          <Input variant={'auth'}
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />


          <Button onClick={handleExport}>Download Certificate</Button>
        </Stack>
      </Box>


      {/* Certificate */}
      <div ref={certificateRef} style={{ position: 'relative' ,display: "inline-block"}}>
      
    <img 
      src='./images/c1.png'
      alt='Certificate Background'
      width='800px' height="700px"
      style={{display: "block",marginTop:"-120px"}}
    />
 
  <Box  position={"absolute"}  top={100} left={0} m="100">
    <Text color="black" align="center" fontSize='22px' fontWeight='400' lineHeight='100%' m="2">
      {name}
    </Text>
    <Text color="black" align="center" fontSize='16px' fontWeight='400' lineHeight='100%' m="3">
   <br/>
    {about}
    </Text>
    <Text color="black" align="center"  fontSize='16px' fontWeight='600' lineHeight='100%' m="2">
      {event}
    </Text>
    <Text color="black" align="center" fontSize='22px' fontWeight='400' lineHeight='100%' m="2">
      <br/><br/><br/>
      {organization}
    </Text>
  </Box>
  
</div>



    </Flex>
  );
};

export default Test;
