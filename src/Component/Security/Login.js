import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AccountLogin } from '../Controller/Login/user';
import config from './config';
import axios from 'axios';
import auth from '../Controller/Login/auth';
import { useAuth } from '../../AuthContext';

function Login() {
    const navigate = useNavigate();
    const [showPasswordStatus, setShowPasswordStatus] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginBtnStatus, setLoginBtnStatus] = useState(false)

    const { login } = useAuth()

    const isAuthenticatedFunc = () => {
        auth.isAuthenticated().then((res) => {
            if (res.data.isAuthenticated) {
                console.log(true)
                navigate('../../registrar/enlistment')  // Redirect
            } 
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        setLoginBtnStatus(true)

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Invalid Email Address!');
            return;
        }
        try {
            AccountLogin(email, password, axios, config, navigate).then((res) => {
                login(res)
                if (res.length === 0) {
                    setLoginBtnStatus(false)
                }
            }).catch((err) => {
                console.error(err)
                setLoginBtnStatus(false)
            })
        } catch (error) {
            setError(error); // Handle error properly
            console.error(error);
        }
    };

    useEffect(() => {
        isAuthenticatedFunc()
    }, [])

    return (
        <div className='login-container card shadow'>
            <form className='login-form' onSubmit={handleLoginSubmit}>
                <h3 className='text-center'><strong>LOGIN FORM</strong></h3>
                {
                    error &&
                    <>
                        <div className='bg-danger form-control text-center border-0'>
                            {error.passError && <span className='text-white'>Your Password is Incorrect!</span>}
                            {error.emailError && <span className='text-white'>Your Email is not Registered!</span>}
                        </div>
                    </>
                }
                <div className='form-group row'>
                    <label htmlFor='login-email' className='col-form-label'><strong>Email</strong></label>
                    <input autoComplete='false' autoSave='false' id='email' name='email' type='email' className='form-control' placeholder='juandelacruz@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='form-group row'>
                    <label htmlFor='login-password' className='col-form-label'><strong>Password</strong></label>
                    <input autoComplete='false' autoSave='false' id='password' name='password' type={showPasswordStatus ? 'text' : 'password'} className='form-control' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group form-check mt-2 mb-2">
                    <input type="checkbox" className="form-check-input" id="login-checkbox" onChange={(e) => setShowPasswordStatus(e.target.checked)} />
                    <label className="form-check-label" htmlFor="login-checkbox"><strong>Show Password</strong></label>
                </div>
                <button className='form-control btn btn-primary mb-2' disabled={loginBtnStatus}><strong>Login</strong></button>
                <hr />
                <div className='row'>
                    {/* 
                        <div className='col-6'>
                            <Link className='text-danger text-center btn form-control' to={'forgot-password'}>Forgot Password?</Link>
                        </div>
                        <div className='col-6'>
                            <Link className='text-primary text-center btn form-control' to={'../create-account'}>Create an Account?</Link>
                        </div>
                    */}
                </div>
            </form>
        </div>
    );
}

export default Login;
