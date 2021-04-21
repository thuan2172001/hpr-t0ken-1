import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';
import './RegisterPage.scss';

export default function RegisterPage() {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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

    const handlePhoneBlur = () => {
        if (!phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) || phone.length < 9) {
            setError('Phone number is invalid!');
            setShow(true);
        } else {
            setError('');
        }
    }

    const handleSubmit = () => {
        console.log(error)
        if (firstName && lastName && email && password && phone && error.length === 0) {
            const user = {firstName, lastName, email, password}
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
                <Container fluid>
                    <Row className="justify-content-md-center pt-3">
                        <Col className="form-sign-up register-box" sm={10} lg={4}>
                            <h2 className="login-title"><i className="fa fa-key" aria-hidden="true" /> Sign up</h2>
                            <hr />
                            <Form method='POST' style={{ margin: '10px 0' }} encType='multipart/form-data'>
                                <Form.Group className="row">
                                    <Col>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            value={firstName}
                                            name='firstName'
                                            type="text"
                                            placeholder="First Name"
                                            onBlur={handlefirstNameBlur}
                                            onChange={e => setfirstName(e.target.value)}
                                            required />
                                    </Col>
                                    <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            value={lastName}
                                            name='lastName'
                                            type="text"
                                            placeholder="Last Name"
                                            onBlur={handlelastNameblur}
                                            onChange={e => setlastName(e.target.value)}
                                            required />
                                    </Col>
                                </Form.Group>
                                <Form.Group className="row">
                                    <Col sm={12}>
                                        <Form.Label>Phone number</Form.Label>
                                        <Form.Control
                                            value={phone}
                                            name='phone'
                                            type="tel"
                                            placeholder="Phone number"
                                            onBlur={handlePhoneBlur}
                                            onChange={e => setPhone(e.target.value)}
                                            required />
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        value={email}
                                        name='email'
                                        type="email"
                                        placeholder="Enter email"
                                        onBlur={handleEmailBlur}
                                        onChange={handleEmailChange}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        name='password'
                                        type="password"
                                        placeholder="Password"
                                        onBlur={handlePasswordBlur}
                                        onChange={handlePasswordChange}
                                        required />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        value={confirmPassword}
                                        type="password"
                                        placeholder="Comfirm Password"
                                        onBlur={handleConfirmPasswordBlur}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required />
                                </Form.Group>
                                <Button className="btn btn-outline-primary" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                {error && <span style={{fontSize:"18px", position:"absolute", right:"15px"}} className="text-danger" >{error}</span>}
                            </Form>
                        </Col>
                    </Row>
                </Container>}
    </div>
}
