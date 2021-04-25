import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions';
import { Redirect, useHistory } from 'react-router-dom';
import './RegisterPage.scss';
import '../LoginPage/vendor/animate/animate.css'
import '../LoginPage/vendor/animsition/css/animsition.min.css'
import background from '../../assets/bg-02.jpg'

export default function RegisterPage() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('mnemonic');
    const [mnemonic, setMnemonic] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [privateKeyPassword, setPrivatePass] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const user = useSelector((state:RootStateOrAny) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handlefirstNameBlur = () => {
        if (!firstName) {
            setError("First name must be filled");
            setShow(true);
        } else if (firstName.length < 3) {
            setError("First name must have at least 3 chars length");
            setShow(true);
        } else {
            setError('');
        }
    }

    const handlelastNameblur = () => {
        if (!lastName) {
            setError("Last name must be filled");
            setShow(true);
        } else if (lastName.length < 3) {
            setError("Last name must have at least 3 chars length");
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleEmailBlur = () => {
        if (!email) {
            setError('Fill the email');
            setShow(true);
        } else if (email.indexOf('@') === -1) {
            setError('You must take a email with @ character');
            setShow(true);
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
            setError('Fill the pasword');
            setShow(true);
        } else if (password.length < 6) {
            setError('Your password must have more or equal 6 characters');
            setShow(true);
        }
    }

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
        if (password.length >= 6) {
            setError('');
        }
    }

    const handleConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setError('Password doesn\'t match');
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleSubmit = () => {
        console.log(error)
        if (firstName && lastName && email && password && error.length === 0) {
            const user = {firstName, lastName, email, password, privateKey, privateKeyPassword}
            dispatch(register(user));
            setfirstName('');
            setlastName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            history.push('/login');
        } else {
            setShow(true);
            if (!email) {
                setError('Invalid Email');
            } else if (!password) {
                setError('Invalid Password');
            } else if (!firstName) {
                setError('Invalid First name');
            } else if (!lastName) {
                setError('Invalid Last name');
            }
        }
    }
    return <div
        style={{ 
            backgroundImage: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
            height: '95vh',
        }}>
        {
            user.authenticate ? <Redirect to='/' /> :
                <div className="limiter">   
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form method='POST' style={{ margin: '10px 0' }} 
                                encType='multipart/form-data' className="login100-form validate-form">
                                <span className="login100-form-title p-b-43">
                                    Register Account
                                </span>
                                                                
                                <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                        value={firstName}
                                        name='firstName'
                                        type="text"
                                        placeholder="First Name"
                                        onBlur={handlefirstNameBlur}
                                        onChange={e => setfirstName(e.target.value)}
                                        required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                        value={lastName}
                                        name='lastName'
                                        type="text"
                                        placeholder="Last Name"
                                        onBlur={handlelastNameblur}
                                        onChange={e => setlastName(e.target.value)}
                                        required />
                                    <span className="focus-input100"></span>
                                </div>
                                
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

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                    value={confirmPassword}
                                    type="password"
                                    placeholder="Comfirm Password"
                                    onBlur={handleConfirmPasswordBlur}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <select className="input100" 
                                    value={type}
                                    onChange={e => setType(e.target.value)} style={{border:"none"}}>
                                        <option value="mnemonic">Mnemonic</option>
                                        <option value="privateKey">Private Key</option>
                                    </select>
                                    <span className="focus-input100"></span>
                                </div>

                                {type === "mnemonic" ? <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                    value={mnemonic}
                                    type="text"
                                    placeholder="Mnemonic (optional)"
                                    onChange={e => setMnemonic(e.target.value)}
                                    />
                                    <span className="focus-input100"></span>
                                </div> : type === "privateKey" ? 
                                <>
                                <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                    value={privateKey}
                                    type="text"
                                    placeholder="Private Key (optional)"
                                    onChange={e => setPrivateKey(e.target.value)}
                                    />
                                    <span className="focus-input100"></span>
                                </div> 
                                <div className="wrap-input100 validate-input">
                                    <input className="input100" 
                                    value={privateKeyPassword}
                                    type="password"
                                    placeholder="Private key Password (optional)"
                                    onChange={e => setPrivatePass(e.target.value)}
                                    />
                                    <span className="focus-input100"></span>
                                </div>
                                </> : <div></div>
                                }



                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" onClick={handleSubmit}>
                                        Sign up
                                    </button>
                                </div>
                                
                                <div className="text-center p-t-46 p-b-20">
                                <a style={{
                                    }} href="/login">
                                        <span>Have an account? </span><span style={{
                                            color: "blue"
                                        }}>Login here!</span>
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
