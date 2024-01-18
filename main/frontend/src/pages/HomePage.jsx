import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'
import { Text, Box, Button, Flex, Icon, SimpleGrid, Stack, useColorModeValue, useColorMode } from '@chakra-ui/react';



const Model = () => {
  const gltf = useLoader(GLTFLoader, "./model/ethereum/scene.gltf");
  gltf.scene.rotation.y = Math.PI / 2
  return (
    <>
      <primitive object={gltf.scene} scale={0.002} />
    </>
  );
};

const Model2 = () => {
  const gltf = useLoader(GLTFLoader, "./model/cube/scene.gltf");
  gltf.scene.position.set(0, 0, 0)
  gltf.scene.rotation.x = Math.PI / 4
  return (
    <>
      <primitive object={gltf.scene} scale={0.09} />
    </>
  );
};


export default function HomePage() {
  //preset: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
  const { colorMode } = useColorMode();
  const preset = colorMode === 'dark' ? 'night' : 'dawn';



  const cardbg = useColorModeValue('#ffffff', 'navy.800');
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const uploadColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (


    <Flex justifyContent={"space-between"} bg={cardbg} backgroundClip="border-box" p='7' borderRadius={"20px"}>
      <Box p="3">
      <Text

        color={textColor}
        fontSize='42px'
        fontWeight='500'
        lineHeight='100%'
        
      >
        DoQfy
      </Text>
      <Text
        mt="5"
        color={textColor}
        fontSize='22px'
        fontWeight='400'
        lineHeight='100%'

      >
     Digital Document verification using Blockchain and IPFS
      </Text>
      <Text  mt="8" mr="10"
        color={textColor}
        fontSize='18px'
        fontWeight='400'
        lineHeight='100%'
        fontFamily={"monospace"}
        >
      Welcome to Doqfy, where we revolutionize document verification 
      through the seamless integration of Blockchain and IPFS.<br/> 
      Our platform ensures the utmost security and integrity of 
      your digital documents by leveraging the tamper-proof nature
       of blockchain and the decentralized storage capabilities of IPFS.
      </Text>
      </Box>

      <Box  >
        <Canvas style={{ borderRadius: "20px", height: "300px", width: "300px" }} shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <group position={[0, 0, 0]}>
              <Model />
              <Center>
                <Model2 />
              </Center>
              <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
            </group>
            <Environment preset={preset} background blur={0.5} />
            <OrbitControls autoRotate autoRotateSpeed={4} enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.1} maxPolarAngle={Math.PI / 2.1} />
          </Suspense>
        </Canvas>
      </Box>

    </Flex>

  )
}

