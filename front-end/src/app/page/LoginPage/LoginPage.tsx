import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
// import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Loading from '../LoadingPage/Loading';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginPage.scss'
import './css/util.css'
import './css/main.css'
import background from '../../assets/bg-02.jpg'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const user = useSelector((state:RootStateOrAny) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEmailBlur = () => {
        if (!email) {
            setError('Please fill the email');
        } else if (email.indexOf('@') === -1) {
            setError('You must take an email with @ character');
        } else {
            setError('');
        }
    }

    const handleEmailChange = (e:any) => {
        setEmail(e.target.value);
        if (email.indexOf('@') >= 0) {
            setError('');
        }
    }

    const handlePasswordBlur = () => {
        if (!password) {
            setError('Please fill the pasword');
        } else if (password.length < 3) {
            setError('Your password must have more or equal 3 characters');
        }
    }

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
        if (password.length >= 6) {
            setError('');
        }
    }

    const handleSubmit = () => {
        if (email && password && error.length === 0) {
            dispatch(login({ email, password }));
            console.log(user)
            if (!user.error) {
                setEmail('');
                setPassword('');
                setError('');
                history.push('/');
            }
        } else {
            if (!email) {
                setError('Invalid Email');
            } else if (!password) {
                setError('Invalid Password');
            }
        }
    }

    return <div>
        {
            user.authenticate ? <Redirect to='/' /> :
                user.loading ? <Loading /> :
            	<div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-43">
                                    Login to continue
                                </span>
                                
                                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                    <input className="input100" 
                                    value={email}
                                    onBlur={handleEmailBlur}
                                    onChange={handleEmailChange}
                                    name='email'
                                    type="email"
                                    placeholder="Enter email"
                                    required />
                                    <span className="focus-input100"></span>
                                </div>
                                
                                <div className="wrap-input100 validate-input" data-validate="Password is required">
                                    <input className="input100" 
                                    value={password}
                                    onBlur={handlePasswordBlur}
                                    onChange={handlePasswordChange}
                                    name='password'
                                    type="password"
                                    placeholder="Password"
                                    required />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" onClick={handleSubmit}>
                                        Login
                                    </button>
                                </div>
                                
                                <div className="text-center p-t-46 p-b-20">
                                <a style={{
                                    }} href="/register">
                                        <span>Don't have an account? </span><span style={{
                                            color: "blue"
                                        }}>Register now !</span>
                                    </a>
                                </div>
                            </form>

                            <div className="login100-more" style={{
                                backgroundImage: `url(${background})`}}>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </div>
}