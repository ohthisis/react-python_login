import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
const LoginPage = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate();

    const loginUser=()=>{
        if(email.length===0){
            alert("please fill email")
        }else if(password.length===0){
            alert("Please fill Password")
        }else{
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response.data)
                navigate("/")
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    alert("Invalid credentials");
                } else {
                    alert("An error occurred. Please try again later.");
                }
            });
            
        }
    }

    let imgs = [
        'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
      ];
    return (
        <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
                <img src={imgs[0]} className='img-fluid' alt=''/>
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
                <form>
                    <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                        <p className='lead fw-normal mb-0 me-3'>Log Into Your Account</p>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}id='form3Example3' className='form-control form-control-lg' placeholder='Enter a valid email' />
                        <label className='form-label' htmlFor="form3Example3">Email address</label>
                    </div>
                    <div className='form-outline mb-3'>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id='form3Example4' className='form-control form-control-lg' placeholder='Enter password' />
                        <label className='form-label' htmlFor="form3Example4">Password</label>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mb-3'>
                        <div className='form-check'>
                            <input type="checkbox" className='form-check-input me-2' value="" id='form2Example3' />
                            <label htmlFor="formExample3" className='form-check-label'>
                                Remember me
                            </label>
                        </div>
                        <a href="#!" className='text-body'>Forget password?</a>
                    </div>
                    <div className='text-center text-lg-start mt-4 pt-2'>
                        <button type='button' className='btn btn-primary btn-lg' onClick={loginUser}>Login</button>
                        <p className='small fw-bold mt-2 pt-1 mb-0'>Don't have an account <a href="/register" className='link-danger'>Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
