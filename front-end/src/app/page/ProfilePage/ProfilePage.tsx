import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import avatar from '../../assets/avatar.png';
import { getProfile, updateProfile } from '../../actions';
import Loading from '../LoadingPage/Loading';
import './ProfilePage.scss'

export default function ProfilePage() {
    const user = useSelector((state:RootStateOrAny) => state.user);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [wallet, setWallet] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user)
        const res = dispatch(getProfile(user.user._id))
        console.log(res)
        console.log(user)
        setfirstName(user.user.firstName);
        setlastName(user.user.lastName);
        setEmail(user.user.email);
        setPhone(user.user.phone);
        setWallet(user.user.wallet);
    }, [user]);

    const reset = () => {
        setfirstName(user.user.firstName);
        setlastName(user.user.lastName);
        setPhone(user.user.phone);
        setEmail(user.user.email);
        setPhone(user.user.phone);
        setWallet(user.user.wallet);
        setError('');
    }

    const update = () => {
        if (!firstName) {
            setError('You need provide first name');
            setShow(true);
            return;
        }
        if (!lastName) {
            setError('You need provide last name');
            setShow(true);
            return;
        }
        if (!phone.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) || phone.length < 9) {
            setError('Invalid phone number');
            setShow(true);
            return;
        }
        if (firstName && lastName) {
            setError('');
        }
        if (!error) {
            if (
                firstName === user.user.firstName &&
                lastName === user.user.lastName &&
                phone === user.user.phone
            ) {
                setError('Nothing change');
                setShow(true);
            } else {
                console.log(user)
                const userInfo = {...user.user, firstName, lastName, phone}
                const newUser = {...user, user: userInfo}
                console.log(newUser)
                setError('');
                setShow(false);
                dispatch(updateProfile(newUser));
                console.log(user)
                alert('Change successfully!')
            }
        }
    }

    return (
        <Container fluid className="pt-5">
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    {
                        error && show && <Alert style={{ width: '100%' }} onClose={() => setShow(false)} variant="danger" dismissible>
                            {error}
                        </Alert>
                    }
                </Col>
                <Col lg={8}>
                    <h2 style={{textAlign: "center"}}>User's information</h2>
                    {
                        user.loading ? <Loading /> :
                            <Row>
                                <Col sm={2}>
                                    <div className='user-avt-container'>
                                        {
                                            <img width="100%" height="auto" className='user-avatar' src={avatar} alt='Avatar' />
                                        }
                                    </div>
                                </Col>
                                <Col sm={10}>
                                    <Form method="POST" style={{ margin: '10px 0' }}>
                                        <Form.Group className="row">
                                            <Col>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    value={firstName}
                                                    name='firstName'
                                                    type="text"
                                                    onChange={e => setfirstName(e.target.value)}
                                                    />
                                            </Col>
                                            <Col>
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control
                                                    value={lastName}
                                                    name='lastName'
                                                    type="text"
                                                    onChange={e => setlastName(e.target.value)}
                                                    />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                type="phone" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                value={email}
                                                disabled={true}
                                                type="email" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicWallet">
                                            <Form.Label>Wallet's Address</Form.Label>
                                            <Form.Control
                                                value={wallet}
                                                disabled={true}
                                                type="text" />
                                        </Form.Group>
                                    </Form>
                                    <div className='user-button-list'>
                                        <Button className="mr-3" variant="success" onClick={update}>Save</Button>
                                        <Button className="mr-3" variant="danger" onClick={reset}>Cancel</Button>{' '}
                                    </div>
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container >
    )
}