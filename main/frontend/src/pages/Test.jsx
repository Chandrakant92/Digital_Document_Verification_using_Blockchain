
// import {
//     Box,
//     Icon,
//     Step,
//     StepDescription,
//     StepIcon,
//     StepIndicator,
//     StepNumber,
//     StepSeparator,
//     StepStatus,
//     StepTitle,
//     Stepper,
//     useColorModeValue,
//     useSteps,
// } from '@chakra-ui/react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
  
import MiniStatistics from '../components/card/MiniStatistics';
import IconBox from '../components/icons/IconBox';
import InputField from "../components/fields/InputField";
function Test() {
   
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
      { bg: "gray.200" },
      { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.200" }
    );
   
   
    return (
        <>

          

            {/* <InputField
             placeholder='example@mail.com'
             id='1'
             type='email'
             label='Email'
             variant='auth'
             extra='*'
            /> */}
       
           
        </>
    )
}

export default Test
