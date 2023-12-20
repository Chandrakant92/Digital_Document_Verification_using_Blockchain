import React, { useState } from 'react';
import { Stepper, Step, Button, Select, Input, Option, IconButton } from "@material-tailwind/react";
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const LoginPage = () => {


  const { control, register, handleSubmit, formState: { errors }, watch } = useForm();
  const selectedRole = watch('role');

  const onSubmit = (data) => {
    console.log(data);
  };


  const stepVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  const inputFields = [
    { name: 'name', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'address', label: 'Wallet Address', type: 'text', required: false },
    { name: 'cid', label: 'Company Id', type: 'text', required: true },
    { name: 'uid', label: 'University Id', type: 'text', required: true },
  ];

  const filteredFields = inputFields.filter(
    field => (field.name !== 'cid' && field.name !== 'uid') || (field.name === 'cid' && selectedRole === 'company') || (field.name === 'uid' && selectedRole === 'university')
  );

  const [activeStep, setActiveStep] = useState(0);

  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && selectedRole && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  return (

    //<div className="flex items-center justify-center m-5">
    <div className="flex justify-center h-screen">
      <div className="relative w-1/2  flex flex-col items-center  ">
        <div className="absolute left-0 top-1/3 transform -translate-y-1/2">
          <IconButton onClick={handlePrev} disabled={isFirstStep} className="rounded-full" >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </IconButton>
        </div>
        <div className="absolute right-0 top-1/3 transform -translate-y-1/2">
          <IconButton onClick={handleNext} disabled={isLastStep || !selectedRole} className="rounded-full" >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </IconButton>
        </div>

        <div className="mt-10 w-96  ">
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
                    {filteredFields.map((field, index) => (
                      <Input
                        key={index}
                        label={field.label}
                        type={field.type}
                        {...register(field.name, { required: field.required })}
                      />
                    ))}

                    <Button type="submit" ripple={true}>
                      Submit
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

export default LoginPage;