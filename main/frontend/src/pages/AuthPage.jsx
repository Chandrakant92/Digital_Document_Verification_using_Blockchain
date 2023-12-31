import React, { useState, useEffect } from 'react';
import { Button, Select, Input, Option } from "@material-tailwind/react";
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Stack,
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
import Card from '../components/card/Card';
import IconBox from '../components/icons/IconBox';

const AuthPage = () => {

    const { type } = useParams();
    const { account } = useMetaMaskContext();
    const navigate = useNavigate();
    const { control, setValue, register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedRole = watch('role');

    const [isLogin, setLogin] = useState(false);

    const { login } = useUserContext();

    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


    const onSubmit = async (data) => {
        const userData = isLogin
            ? { role: data.role, email: data.email, password: data.password, address: data.address }
            : { role: data.role, name: data.name, email: data.email, password: data.password, roleid: data.roleid, address: data.address };

        const apiEndpoint = isLogin ? 'login' : 'signup';
        console.log(isLogin ? 'login:' : 'signup:', data.role, userData);

        try {
            const response = await axios.post(`http://localhost:5000/auth/${apiEndpoint}`, userData);

            if (response.status === 200) {
                if (isLogin) {
                    await login(data.role, { email: data.email, address: data.address });
                    localStorage.setItem(data.role, JSON.stringify({ email: data.email, address: data.address }));
                }
                alert(response.data.message);
                navigate(!isLogin ? '/AuthPage/login' : data.role === 'student' ? '/StudentPage' : data.role === 'university' ? '/UniversityPage' : '/CompanyPage');
            }
            console.log(response.data.message);
        } catch (error) {
            console.error(`Error ${isLogin ? 'Login' : 'Creating Account'}:`, error.response.data.message);
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        setValue('address', account);
    }, [account])

    useEffect(() => {
        if (type === "login") {
            setLogin(true);
        } else if (type === "signup") {
            setLogin(false);
        } else {
            navigate("/");
        }


    }, [type, navigate])


    const stepVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
        exit: { opacity: 0, transition: { duration: 0 } },
    };

    const inputFields = [
        { name: 'name', label: 'Username', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'roleid', label: selectedRole === 'student' ? 'Student Id' : selectedRole === 'company' ? 'Company CIN' : 'University URN', type: 'text', required: true, },
        { name: 'address', label: 'Wallet Address', type: 'text', required: false },

    ];


    const updatedFilteredFields =
        isLogin
            ? inputFields.filter(field => field.name === 'email' || field.name === 'password' || field.name === 'address')
            : inputFields;
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: 2,
    })
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(true);

    const handlePrev = () => (!isFirstStep && setActiveStep((cur) => cur - 1), setIsFirstStep(true), setIsLastStep(false));
    const handleNext = () => (!isLastStep && selectedRole && setActiveStep((cur) => cur + 1), setIsFirstStep(false), setIsLastStep(true));


    return (

        <Box mt="0" h="auto" display="flex" justifyContent="center">


            <Box borderRadius="20px"
                p='7'
                bg={cardbg}
                backgroundClip="border-box"
                display='flex' w="auto" justifyContent="space-evenly">



                <Box display={{ base: 'none', md: 'block' }} alignSelf="center">
                    <IconButton mr='7' fontSize='0px' icon={<ChevronLeftIcon />} color={brandColor} bg={boxBg} onClick={handlePrev} disabled={isFirstStep} isRound='true' />


                </Box>


                <Box w="96" display="flex" flexDirection="column" >
                    <Box mt='0' mb='10'>



                        <Stepper size='lg' colorScheme='brandScheme' index={activeStep}>

                            <Step onClick={() => (setActiveStep(0), setIsFirstStep(true), setIsLastStep(false))}>

                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>
                                <StepSeparator />
                            </Step>
                            <Step onClick={() => (selectedRole && setActiveStep(1), setIsFirstStep(false), setIsLastStep(true))}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>
                                <StepSeparator />
                            </Step>

                        </Stepper>

                        {/* </div> */}
                    </Box>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">

                            {activeStep === 0 && (
                                <motion.div
                                    key={1}
                                    variants={stepVariants}
                                    initial="visible"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Box>
                                        <Controller
                                            name="role"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: true }}

                                            render={({ field }) => (
                                                <Select label="Select Role" {...field}>
                                                    <Option value="student">Student</Option>
                                                    <Option value="university">University</Option>
                                                    <Option value="company">Company</Option>
                                                </Select>
                                            )}
                                        />
                                    </Box>

                                </motion.div>
                            )}

                            {activeStep === 1 && selectedRole && (
                                <motion.div
                                    key={2}
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Stack spacing="5">
                                        {updatedFilteredFields.map((field, index) => (
                                            <Input
                                                key={index}
                                                label={field.label}
                                                type={field.type}
                                                {...register(field.name, { required: field.required })}

                                                {...(field.name === 'address' ? { readOnly: true, style: { backgroundColor: 'lightgray' } } : {})}

                                            />
                                        ))}

                                        <Button type="submit" >
                                            {isLogin ? 'Login' : 'Signup'}
                                        </Button>
                                    </Stack>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>

                </Box>


                <Box display={{ base: 'none', md: 'block' }} alignSelf="center">

                    <IconButton ml='7' fontSize='0px' icon={<ChevronRightIcon />} color={brandColor} bg={boxBg} onClick={handleNext} disabled={isLastStep || !selectedRole} isRound='true' />

                </Box>

            </Box>

        </Box>


    );
};

export default AuthPage;