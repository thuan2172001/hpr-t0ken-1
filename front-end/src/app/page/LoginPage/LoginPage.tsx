import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import Loading from '../LoadingPage/Loading';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginPage.scss'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);
    const [error, setError] = useState('');
    const user = useSelector((state:RootStateOrAny) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEmailBlur = () => {
        if (!email) {
            setError('Please fill the email');
            setShow(true);
        } else if (email.indexOf('@') === -1) {
            setError('You must take an email with @ character');
            setShow(true);
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
            setShow(true);
        } else if (password.length < 3) {
            setError('Your password must have more or equal 3 characters');
            setShow(true);
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
            const username = email;
            dispatch(login({ username, password }));
            console.log(user)
            if (!user.error) {
                setEmail('');
                setPassword('');
                setError('');
                history.push('/');
            }
        } else {
            setShow(true);
            if (!email) {
                setError('Invalid Email');
            } else if (!password) {
                setError('Invalid Password');
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
                user.loading ? <Loading /> :
                    <Container fluid>
                        <Row className="justify-content-md-center pt-3">
                            <Col className="login-box" sm={10} lg={4}>
                                <Form method="POST" style={{ margin: '10px 0' }}>
                                    <h2 className="login-title"><i className="fa fa-key" aria-hidden="true" /> Sign in</h2>
                                    <Form.Group className="form-group" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control className="form-control"
                                            value={email}
                                            onBlur={handleEmailBlur}
                                            onChange={handleEmailChange}
                                            name='email'
                                            type="email"
                                            placeholder="Enter email"
                                            required />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        {error && <span style={{fontSize:"18px"}} className="text-danger" >{error}</span>}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            value={password}
                                            onBlur={handlePasswordBlur}
                                            onChange={handlePasswordChange}
                                            name='password'
                                            type="password"
                                            placeholder="Password"
                                            required
                                        />
                                        {error && <span style={{fontSize:"18px"}} className="text-danger" >{error}</span>}
                                    </Form.Group>
                                    <Button className="btn btn-outline-primary" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <a style={{
                                        fontSize: "16px",
                                        lineHeight: "inherit",
                                        textTransform: "none",
                                        fontStyle: "normal",
                                        color: "gray",
                                        cursor: "inherit",
                                        position: "absolute",
                                        right: "16px",
                                    }} href="/register">
                                        <span>Don't have an account? </span><span style={{
                                            color: "blue"
                                        }}>Register now !</span>
                                    </a>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
        }
    </div>
}