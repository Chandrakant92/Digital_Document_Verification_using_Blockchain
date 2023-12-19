// import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import '../styles/StudentSignup.css'
import React, { useState } from 'react';
import axios from 'axios';

const StudentSignup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response =  await axios.post('http://localhost:5000/students', {
        name,
        email,
        password,
        address,
      });
      console.log(response.data.message);
      if (response.status === 200) {
        alert("successfully registered");
        window.location.href = '/StudentLogin';
      }
    
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
    return (
        <>
            <div className="container1">
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card mt-5 w-50">
                    <div className="card-body">
                        <h5 className="card-title my-4">Sign Up</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                 required
                                    type="text"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Metamask Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                 
                                />
                            </div>
                            <span>
                                {/* <Link to="/StudentLogin" className="btn btn-dark mx-4 ">
                                    Register
                                </Link> */}
                                <button className="btn btn-dark mx-4 " type="submit">Submit</button>
     
                            
                              
                              </span>
                              

                        </form>
                      
                          
                    </div>
                    
                </div>
                 
            </div>
            </div>
        </>

    )
}

export default StudentSignup;
