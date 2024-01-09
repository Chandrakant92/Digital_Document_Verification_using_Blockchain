
import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  
const TransactionCard = ({Transaction,ipfsData,uuid}) => {
            

    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const textColor = useColorModeValue("secondaryGray.900", "white");
 
    const cellStyle = {
      wordBreak: 'break-all',
      padding: '5px',
      
    };
  

  return (
   <>
{  Transaction &&
    <Stack
     borderRadius="20px"
p='7'
bg={cardbg}
backgroundClip="border-box"
spacing='0'
>
<Text mb='10'
  color={textColor}
  fontSize='22px'
  fontWeight='500'
  lineHeight='100%'>
  Transaction Details
</Text>
{  Transaction  ?   
<Box height='auto' borderWidth='1px' borderRadius='lg'>

<Table >
<Tbody>
{ipfsData || uuid ? (
  <Tr>
    <Th>Document:</Th>
    <Td style={cellStyle}>{ipfsData ? ipfsData.uuid : uuid ? uuid : "not defined"}</Td>
  </Tr>
) : null}
<Tr>
<Th>TX: </Th>
<Td style={cellStyle}> {Transaction.hash}</Td>
</Tr>
<Tr>
<Th>From: </Th>
<Td style={cellStyle}>{Transaction.from}</Td>   
</Tr>
<Tr>
<Th>To: </Th>
<Td style={cellStyle}>{Transaction.to}</Td>   
</Tr>
<Tr>
<Th>Nonce: </Th>
<Td style={cellStyle}> {Transaction.nonce}</Td>   
</Tr>
{ipfsData && 
<>
<Tr>
<Th>IPFS CID: </Th>
<Td style={cellStyle}>{ipfsData.cid}</Td>   
</Tr>
<Tr>
<Th>IPFS Link: </Th>
<Td color={'blue'}><a href={ipfsData.ifpsLink} target='_blank'> {`http://localhost:8080/ipfs/ipfs_cid`}</a></Td>   
</Tr>
</>
}
</Tbody>
</Table>
</Box> :
<Text 
color={textColor}
fontSize='16px'
textAlign='center'
fontWeight='500'
mt='10'
lineHeight='100%'>No Transaction Yet!!</Text>
}

</Stack>
}
</>


  )
}

export default TransactionCard

