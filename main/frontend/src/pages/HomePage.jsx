import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'
import { Text, Box, Button, Flex, Icon, SimpleGrid, Stack, useColorModeValue, useColorMode } from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'

import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

import { PiStudentFill } from "react-icons/pi";
import { FaUniversity } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import IconBox from "../components/icons/IconBox";
import RoleInfoBox from "../mainComponents/RoleInfoBox";
import ThreeDModelCanvas from "../mainComponents/ThreeDModelCanvas";
import UniversalModel from "../mainComponents/UniversalModel";
import FlowChart from "../mainComponents/FlowChart";




export default function HomePage() {
  //preset: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
  const { colorMode } = useColorMode();
  const preset = colorMode === 'dark' ? 'night' : 'dawn';

  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");



  const studentPoints = [
    "Easy document submission and verification.",
    "Quick processing with minimal waiting time.",
    "Secure verification using blockchain.",
    "Controlled access to specific documents.",
    "Generate QR codes for easy sharing.",
    "Verify documents remotely, no need to travel.",
    "Receive verified documents securely via email.",
    "Cost savings by avoiding travel expenses.",
    "Digital storage and retrieval of verified documents.",
  ];

  const universityPoints = [
    "Verify student documents efficiently.",
    "Time-saving verification process.",
    "Enhanced security through blockchain.",
    "Bulk upload and verification using Excel files.",
    "Manage company access to documents (add/remove).",
    "Apply verified QR codes after successful verification.",
    "Share verified documents via email.",
    "Environmentally friendly – saves paper.",
    "Cost-effective for universities.",
  ];

  const companyPoints = [
    "Easily verify document authenticity using QR code or unique ID.",
    "Check real-time verification status of submitted documents.",
    "Efficiently identify and prevent counterfeit documents.",
    "Streamlined verification process for multiple universities and students.",
    "Saves time in the verification of documents from various sources.",
    "Enhances security and trust in the verification process.",
    "User-friendly interface for convenient document checking.",
    "Provides a reliable and centralized platform for efficient document verification.",
    "Reducing the chances of errors or fraud.",
  ];


  return (

    // <Box>
    //   <Flex mb="20px" justifyContent={"space-between"} bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
    //     <Box p="3">
    //       <Text

    //         color={textColor}
    //         fontSize='42px'
    //         fontWeight='500'
    //         lineHeight='100%'

    //       >
    //         DoQfy
    //       </Text>
    //       <Text
    //         mt="5"
    //         color={textColor}
    //         fontSize='22px'
    //         fontWeight='400'
    //         lineHeight='100%'

    //       >
    //         Digital Document verification using Blockchain and IPFS
    //       </Text>
    //       <Text mt="8" mr="10"
    //         color={textColor}
    //         fontSize='16px'
    //         fontWeight='400'


    //       >

    //         Welcome to Doqfy, where we revolutionize document verification
    //         through the seamless integration of Blockchain and IPFS.<br />
    //         Our platform ensures the utmost security and integrity of
    //         your digital documents by leveraging the tamper-proof nature
    //         of blockchain and the decentralized storage capabilities of IPFS.
    //       </Text>
    //     </Box>

    //     <Box  >
    //       <Canvas style={{ borderRadius: "20px", height: "300px", width: "300px" }} shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
    //         <pointLight position={[10, 10, 10]} />
    //         <Suspense fallback={null}>
    //           <group position={[0, 0, 0]}>
    //             <UniversalModel
    //               modelname="ethereum"
    //               position={{ x: 0, y: 0, z: 0 }}
    //               rotation={{ x: 0, y: Math.PI / 2, z: 0 }}
    //               scale={0.002}
    //             />
    //             <Center>
    //               <UniversalModel
    //                 modelname="cube"
    //                 position={{ x: 0, y: 0, z: 0 }}
    //                 rotation={{ x: Math.PI / 4, y: 0, z: 0 }}
    //                 scale={0.09}
    //               />
    //             </Center>
    //             <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
    //           </group>
    //           <Environment preset={preset} background blur={0.5} />
    //           <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
    //         </Suspense>
    //       </Canvas>
    //     </Box>

    //   </Flex>
      

    //   <Flex mb="20px" bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
    //     <ThreeDModelCanvas modelname="student" scale={0.4} pos={[0, -2, 0]} />
    //     <RoleInfoBox icon={PiStudentFill} title="Student" points={studentPoints} pl="10" />
    //   </Flex>

    //   <Flex mb="20px" justifyContent={"space-between"} bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
    //     <RoleInfoBox pl="3" icon={FaUniversity} title="University" points={universityPoints} />
    //     <ThreeDModelCanvas modelname="university" rotation={{ x: 0, y: Math.PI / 4, z: 0 }} scale={1.5} />
    //   </Flex>

    //   <Flex mb="20px" bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
    //     <ThreeDModelCanvas modelname="company" scale={0.008} />
    //     <RoleInfoBox pl="10" icon={FaBuilding} title="Company" points={companyPoints} />
    //   </Flex>
    // </Box>
    <Box h="450" mb="20px" bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
     <FlowChart/>
    
    </Box>
  )
}

