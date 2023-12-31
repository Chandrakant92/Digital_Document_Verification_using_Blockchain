// Chakra Imports
import { Button, Icon, useColorMode, useColorModeValue } from "@chakra-ui/react";
// Custom Icons
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import React from "react";

export default function FixedPlugin(props) {
  const { ...rest } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  let bgButton = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

	const navbarIcon = useColorModeValue('gray.400', 'white');
  return (
    <Button
      {...rest}
     // h='60px'
     // w='60px'
     // zIndex='99'
     // bg={navbarIcon}
    //   position='fixed'
      variant='no-effects'
    //  left={ ""}
    //  right={"35px"}
    //  bottom='30px'
    //  border='1px solid'
     // borderColor='#6A53FF'
     // borderRadius='50px'
      onClick={toggleColorMode}
     // display='flex'
      p='0px'
     // align='center'
     // justify='center'
      >
      <Icon
       // h='24px'
       // w='24px'
        color={navbarIcon}
        as={colorMode === "light" ? IoMdMoon : IoMdSunny}
      />
    </Button>
  );
}
