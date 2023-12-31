
import {
    Box,
    Icon,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useColorModeValue,
    useSteps,
} from '@chakra-ui/react'
import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
  
import MiniStatistics from './card/MiniStatistics';
import IconBox from './icons/IconBox';
function Test() {
    // const steps = [
    //     { title: 'Select Role', description: 'Contact Info' },
    //     { title: 'Authentication', description: 'Date & Time' },
    // ]
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    
    // const { activeStep, setActiveStep } = useSteps({
    //     index: 1,
    //     count: steps.length,
    // })
    return (
        <>

            {/* <Stepper size='lg' colorScheme='brandScheme' index={activeStep}>
                {steps.map((step, index) => (
                    <Step key={index} onClick={() => setActiveStep(index)}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper> */}
             <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Earnings'
          value='$350.4'
        />
        </>
    )
}

export default Test
