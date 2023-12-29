import React, { useState, useEffect } from 'react';
import { Stepper, Step, Button, Select, Input, Option, IconButton } from "@material-tailwind/react";
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { useMetaMaskContext } from '../context/MetaMaskContext';

const AuthPage = () => {

    const { type } = useParams();
    const { account } = useMetaMaskContext();
    const navigate = useNavigate();
    const { control, setValue,register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedRole = watch('role');

    const [isLogin, setLogin] = useState(false);

    const { login } = useUserContext();

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
    
   useEffect(()=>{
    setValue('address', account);
   },[account])

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
    const [activeStep, setActiveStep] = useState(0);

    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && selectedRole && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


    return (

        <div className="mt-10 h-80 flex justify-center   ">
            <div className=" w-1/2   flex  justify-evenly  ">
                <div className="hidden md:block   self-center  ">
                    <IconButton onClick={handlePrev} disabled={isFirstStep} className="rounded-full" >
                        <ChevronLeftIcon className="h-6 w-6 text-white" />
                    </IconButton>
                </div>

                <div className="w-96   flex flex-col  space-y-10">
                    <div className=' '>
                        <Stepper
                            activeStep={activeStep}
                            isLastStep={(value) => setIsLastStep(value)}
                            isFirstStep={(value) => setIsFirstStep(value)}
                        >
                            <Step onClick={() => setActiveStep(0)}>1</Step>
                            <Step onClick={() => selectedRole && setActiveStep(1)}>2</Step>
                        </Stepper>
                    </div>


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
                                    <div className=" ">
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
                                    </div>
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
                                    <div className="flex flex-col space-y-4">
                                        {updatedFilteredFields.map((field, index) => (
                                            <Input
                                                key={index}
                                                label={field.label}
                                                type={field.type}
                                                {...register(field.name, { required: field.required })}

                                                {...(field.name === 'address' ? {  readOnly: true, style: { backgroundColor: 'lightgray' } } : {})}

                                            />
                                        ))}

                                        <Button type="submit" >
                                            {isLogin ? 'Login' : 'Signup'}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>
                </div>

                <div className="hidden md:block self-center    ">
                    <IconButton onClick={handleNext} disabled={isLastStep || !selectedRole} className="rounded-full" >
                        <ChevronRightIcon className="h-6 w-6 text-white" />
                    </IconButton>
                </div>

            </div>


        </div>


    );
};

export default AuthPage;