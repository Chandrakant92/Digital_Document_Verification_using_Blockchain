import React, { useState, useEffect } from 'react';
import { Stepper, Step, Button, Select, Input, Option, IconButton } from "@material-tailwind/react";
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const AuthPage = () => {

    const { type } = useParams();

    const navigate = useNavigate();
    const { control, register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedRole = watch('role');

    const [isLogin, setLogin] = useState(false);

    const { login, logout } = useUserContext();

    const onSubmit = async (data) => {
        const userData = isLogin
            ? { role: data.role, email: data.email, password: data.password }
            : { role: data.role, name: data.name, email: data.email, password: data.password, roleid: data.roleid };

        const apiEndpoint = isLogin ? 'login' : 'signup';
        console.log(isLogin ? 'login:' : 'signup:', data.role, userData);

        try {
            const response = await axios.post(`http://localhost:5000/auth/${apiEndpoint}`, userData);

            if (response.status === 200) {
                if (isLogin) {
                    login(data.role, userData);
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

    const handleLogout = (role) => {
        logout(role);
    };

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
    ];


    const updatedFilteredFields =
        isLogin
            ? inputFields.filter(field => field.name === 'email' || field.name === 'password')
            : inputFields;
    const [activeStep, setActiveStep] = useState(0);

    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && selectedRole && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


    return (

        <div className="flex justify-center h-screen">
            <div className="relative w-1/2  flex flex-col items-center  ">
                <div className="hidden md:block absolute left-0 top-1/3 transform -translate-y-1/2">
                    <IconButton onClick={handlePrev} disabled={isFirstStep} className="rounded-full" >
                        <ChevronLeftIcon className="h-6 w-6 text-white" />
                    </IconButton>
                </div>
                <div className="hidden md:block absolute right-0 top-1/3 transform -translate-y-1/2">
                    <IconButton onClick={handleNext} disabled={isLastStep || !selectedRole} className="rounded-full" >
                        <ChevronRightIcon className="h-6 w-6 text-white" />
                    </IconButton>
                </div>

                <div className="mt-10 w-96 pl-10 pr-10">
                    <Stepper
                        activeStep={activeStep}
                        isLastStep={(value) => setIsLastStep(value)}
                        isFirstStep={(value) => setIsFirstStep(value)}
                    >
                        <Step onClick={() => setActiveStep(0)}>1</Step>
                        <Step onClick={() => selectedRole && setActiveStep(1)}>2</Step>
                    </Stepper>



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
                                    <div className="mt-20 items-center">
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
                                    <div className="mt-20 flex flex-col space-y-4">
                                        {updatedFilteredFields.map((field, index) => (
                                            <Input
                                                key={index}
                                                label={field.label}
                                                type={field.type}
                                                {...register(field.name, { required: field.required })}
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
            </div>


        </div>


    );
};

export default AuthPage;