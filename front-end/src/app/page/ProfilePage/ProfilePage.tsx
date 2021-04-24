import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button, Form, Alert, Modal} from 'react-bootstrap';
import avatar from '../../assets/avatar.png';
import { getProfile, updateProfile, getWallet, getPrivateKey, checkAuth, getLogs} from '../../actions';
import Loading from '../LoadingPage/Loading'; 
import './ProfilePage.scss'

export default function ProfilePage() {
    const user = useSelector((state:RootStateOrAny) => state.user);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [wallet, setWallet] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [typeOfPrivateKey, setTypeOfPrivateKey] = useState('password')
    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const [balance, setBalance] = useState('');
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true)
    const handleClose = () => {
        setShowDialog(false);
        setError("")
    }
    const handleShow = () => setShowDialog(true);
    const handleExport = () => {
        checkAuth({email, password}).then(t => {
            console.log(t)
            if (t.token) {
                setTypeOfPrivateKey('text')
                setError("")
                setShowDialog(false)
            } else {
                setError('Password is incorrect')
            }
        })
    }

    useEffect(() => {
        console.log(user)
        const res = dispatch(getProfile(user.user._id))
        console.log(res)
        console.log(user)
        getWallet().then(t => {
            console.log(t)
            setBalance(`${t.balance} HPR`);
        }).then(() => setLoading(false)).catch(() => setLoading(false));
        getPrivateKey({privateKeyPassword: "temp"}).then(t => {
            console.log(t)
            setPrivateKey(t.privateKey)
        }).then(() => setLoading(false)).catch(() => setLoading(false));
        setfirstName(user.user.firstName);
        setlastName(user.user.lastName);
        setEmail(user.user.email);
        setPhone(user.user.phone);
        setWallet(user.user.wallet);
    }, [user.user]);

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
                alert('Change successfully')
                console.log(user)
                // window.location.reload()
            }
        }
    }

    if (loading) return <Loading />
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
                                        <Form.Group controlId="formBasicKey">
                                            <Form.Label>Private Key <span onClick={handleShow} className="fa fa-fw fa-eye"></span>
                                                </Form.Label>
                                            <Form.Control
                                                value={privateKey}
                                                disabled={true}
                                                type={typeOfPrivateKey} />
                                                <Modal show={showDialog} onHide={handleClose} style={{marginTop: "25vh"}}>
                                                    <Modal.Header closeButton>
                                                    <Modal.Title>Export your Private Key</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p>Enter your password to export Private Key</p>
                                                        <Form.Group controlId="formBasicEmail">
                                                            <Form.Control
                                                                value={password}
                                                                onChange={e => setPassword(e.target.value)}
                                                                type="password" />
                                                        </Form.Group>
                                                        {error && 
                                                        <Alert style={{ width: '100%' }} onClose={() => setError("")} variant="danger" dismissible>
                                                            {error}
                                                        </Alert>}
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                    <Button variant="success" onClick={handleExport}>
                                                        Export
                                                    </Button>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicWallet">
                                            <Form.Label>Wallet's Address</Form.Label>
                                            <Form.Control
                                                value={wallet}
                                                disabled={true}
                                                type="text" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicWallet">
                                            <Form.Label>Wallet's Balance</Form.Label>
                                            <Form.Control
                                                value={balance}
                                                disabled={true}
                                                type="text" />
                                        </Form.Group>
                                    </Form>
                                    <div className='user-button-list'>
                                        <Button className="mr-3" variant="success" onClick={update}>Save</Button>
                                        <Button className="mr-3" variant="secondary" onClick={reset}>Reset</Button>{' '}
                                    </div>
                                </Col>
                            </Row>
                    }
                </Col>
            </Row>
        </Container >
    )
}