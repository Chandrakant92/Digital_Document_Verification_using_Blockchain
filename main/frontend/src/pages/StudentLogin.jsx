import { Link } from 'react-router-dom';
import '../styles/StudentLogin.css';
import React, { useState } from 'react';
import axios from 'axios';

const StudentLogin = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:5000/login', {
          email,
          password,
        });
        console.log(response.data.message);
        if (response.status === 200) {
            alert("Successfully Login");
            window.location.href = '/';
          }
       
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

    return (
        <>
        <div className="container1"> 
         <div className="container d-flex align-items-center justify-content-center ">
                <div className="card mt-5 w-50">
                    <div className="card-body">
                        <h5 className="card-title my-4">Student Login </h5>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <input
                                     required
                                    type="text"
                                    className="form-control"
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                 
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                     required
                                    type="text"
                                    className="form-control"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
       
                                />
                            </div>
                            <span>
                            <button className="btn btn-dark mx-4 " type="submit">Login</button>
     
                            </span>

                        </form>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default StudentLogin;

