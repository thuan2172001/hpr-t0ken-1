import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import avatar from '../../assets/logo.svg';
import { updateProfile } from '../../actions';
import Loading from '../LoadingPage/Loading';

export default function ProfilePage() {
    const user = useSelector((state:RootStateOrAny) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user)
        setName(`${user.user.firstname} ${user.user.lastname}`);
        setEmail(user.user.email);
        setPassword(user.user.password);
    }, [user.user]);

    const reset = () => {
        setName(`${user.user.firstname} ${user.user.lastname}`);
        setEmail(user.user.email);
        setPassword(user.user.password);
        setShowPassword(false);
        setError('');
    }

    const update = () => {
        if (name.trim().indexOf(' ') < 0) {
            setError('You need provide last name');
            setShow(true);
            return;
        }
        if (email.indexOf('@') < 0) {
            setError('Invalid Email');
            setShow(true);
            return;
        }
        if (password.length < 6) {
            setError('Your password must have at least 6 chars');
            setShow(true);
            return;
        }
        if (name.trim().indexOf(' ') > 0 && email.indexOf('@') > 0 && password.length >= 6) {
            setError('');
        }
        if (!error) {
            if (
                name.trim() === `${user.user.firstname} ${user.user.lastname}` &&
                email === user.user.email &&
                password === user.user.password
            ) {
                setError('No thing change');
                setShow(true);
            } else {
                const form = new FormData();
                form.append('name', name.trim());
                form.append('email', email.trim());
                form.append('password', password);
                form.append('_id', user.user._id);
                setShowPassword(false);
                setError('');
                setShow(false);
                dispatch(updateProfile(form));
            }
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-md-center mt-5">
                <Col lg={8}>
                    {
                        error && show && <Alert style={{ width: '100%' }} onClose={() => setShow(false)} variant="danger" dismissible>
                            {error}
                        </Alert>
                    }
                </Col>
                <Col lg={11}>
                    {
                        user.loading ? <Loading /> :
                            <Row>
                                <Col sm={5}>
                                    <div className='user-avt-container'>
                                        {
                                            <img className='user-avatar' src={avatar} alt='Avatar' />
                                        }
                                    </div>
                                </Col>
                                <Col sm={7}>
                                    <Form method="POST" style={{ margin: '10px 0' }}>
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Full name</Form.Label>
                                            <Form.Control
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                type="email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password <i className="fas fa-eye" onClick={() => setShowPassword(showPassword => !showPassword)}></i>
                                            </Form.Label>
                                            <Form.Control
                                                value={showPassword ? password :
                                                    password && password.split('').map(char => '*').join('')}
                                                onChange={e => setPassword(e.target.value)}
                                                type="text" />
                                        </Form.Group>
                                    </Form>
                                    <div className='user-button-list'>
                                        <Button variant="primary" onClick={update}>Save</Button>
                                        <Button variant="danger" onClick={reset}>Cancel</Button>{' '}
                                    </div>
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container >
    )
}