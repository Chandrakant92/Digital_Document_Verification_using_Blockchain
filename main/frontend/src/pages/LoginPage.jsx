import React, { useState } from 'react';
import ToggleSwitch from '../components/ToggleSwitch';
import { Stepper, Step, Button, Select, Input, Option } from "@material-tailwind/react";
import { Container } from 'postcss';

const LoginPage = () => {
  const steps = [
    { title: 'Select Role' },
    { title: 'Enter Login Details' },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    uid: '', // Extra field for the university
    name: '',
    email: '',
    password: '',
    address: '',
    cid: '', // Extra field for the company
  });

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === '') return;
   
    setActiveStep(1);
    setLoginInfo({
      uid: '',
      name: '',
      email: '',
      password: '',
      address: '',
      cid: '',
    });
  };

  const handleLoginInfoChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Submitted:', loginInfo);
    // Reset form after submission
    setRole('');
    setLoginInfo({
      uid: '',
      name: '',
      email: '',
      password: '',
      address: '',
      cid: '',
    });
  };

  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && role != '' &&setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  return (

    <div className="flex items-center justify-center m-5">
      <div className="w-96  py-4 px-8">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>1</Step>
          <Step onClick={() => role!='' && setActiveStep(1)}>2</Step>
        </Stepper>



        {activeStep === 0 && (
          <div className="mt-5">
            <Select label="Select Role"
             value={role}
              onChange={(e) => handleRoleSelection(e)}
            >
              <Option value="">Select User Role</Option>
              <Option value="student">Student</Option>
              <Option value="university">University</Option>
              <Option value="company">Company</Option>
            </Select>
          </div>
        )}
        {activeStep === 1 && role != '' && (
          <div className="mt-5 flex flex-col space-y-4">
            <Input label="Username"
              type="text"

              value={loginInfo.name}
              onChange={handleLoginInfoChange}
            />
            <Input label="Email"
              type="email"

              value={loginInfo.email}
              onChange={handleLoginInfoChange}
            />

            {role === 'company' && (
              <Input label="Company Id"
                type="text"

                value={loginInfo.cid}
                onChange={handleLoginInfoChange}
              />

            )}
            {role === 'university' && (
              <Input label="University Id"
                type="text"

                value={loginInfo.uid}
                onChange={handleLoginInfoChange}
              />

            )}
            <Input label="password"
              type="password"

              value={loginInfo.password}
              onChange={handleLoginInfoChange}
            />
            <Input label="Wallet Address"
              type="text"

              value={loginInfo.address}
              onChange={handleLoginInfoChange}
            />

            <Button onClick={handleSubmit}
              disabled={!loginInfo.email || !loginInfo.password}
              ripple={true}>
              Submit
            </Button>
          </div>
        )}



        <div className="mt-16 flex justify-between ">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Prev
          </Button>
          <Button onClick={handleNext} disabled={isLastStep || role==''}>
            Next
          </Button>
        </div>
      </div>
    </div>



  );
};

export default LoginPage;