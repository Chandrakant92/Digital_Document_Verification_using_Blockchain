import { Box, Button, Divider, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback, useState } from 'react';
import { Handle, Position, applyNodeChanges, useNodes, useNodesState } from 'reactflow';

const handleStyle1 = { top: 70 };
const handleStyle2 = { top: 90 };

const StudentNode = memo(({ data, isConnectable })=> {
  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const boxBg = useColorModeValue("secondaryGray.300", "navy.700");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [selectedFileName, setSelectedFileName] = useState('');
  //const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const handleFileUpload = (event) => {
    
    const file = event.target.files[0];
    if(!file) return;
    setSelectedFileName(file.name);
  };

    
  const handleUploadClick = () => {
    // Send data to node-2
   
    
    data.button1(selectedFileName); 
  };

  return (
    <Box border='1px' borderColor='gray.300' bg={boxBg} backgroundClip="border-box"  borderRadius={"10px"}>
      <Text
            
            color={textColor}
            fontSize='14px'
            fontWeight='400'
            lineHeight='100%'
            m="2"
          >
            Student
    </Text>
    <Divider/>
    <Stack p="4">
    <Input
        type="file"
        display="none" // Hide the default file input
        onChange={handleFileUpload}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button as="span" variant="outline"   size="xs" w="90px" >
          select file
        </Button>
      </label>
    <Button onClick={handleUploadClick}  variant="brand"   size="xs" w="90px">Upload</Button>
    </Stack>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={handleStyle1}
        isConnectable={isConnectable}
      />
      <Handle type="source" 
        style={handleStyle2} position={Position.Right} id="b" isConnectable={isConnectable} />
    </Box>
  );
})

export default StudentNode;
