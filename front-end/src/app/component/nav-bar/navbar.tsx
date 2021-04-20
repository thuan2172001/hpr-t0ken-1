import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import './navbar.scss'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import { useHistory } from "react-router-dom";

export const NavBar = () => {
    const user = useSelector((state:RootStateOrAny) => state.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = () => {
        history.push('/login');
        dispatch(logout());
    }
    console.log(user)
    return (
        user.authenticate ? 
        (<>
            <Navbar className="custom-nav navbar-expand-lg body_font fixed-top"
                    expand="lg">
                <NavbarBrand id="nav-brand" href="/">Blockchain Wallet</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarcollapse">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color: "white"}} href="information" >Information</Nav.Link>
                        <Nav.Link style={{color: "white"}} onClick={handleLogout} >Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>) : (<>
            <Navbar className="custom-nav navbar-expand-lg body_font fixed-top"
                    expand="lg">
                <NavbarBrand id="nav-brand" href="/">Blockchain Wallet</NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarcollapse">
                    <Nav className="ml-auto">
                        <Nav.Link style={{color: "white"}} href="login">Sign in</Nav.Link>
                        <Nav.Link style={{color: "white"}} href="register">Sign up</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>)
    )
};