import {Dropdown, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import './navbar.scss'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import { useHistory } from "react-router-dom";
import avatar from '../../assets/avatar.png'; 

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
                <NavbarBrand id="nav-brand" href="/"><i style={{fontSize: "28px"}} className="fas fa-dice-d20" /><span className="ml-3">Blockchain Wallet</span></NavbarBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="navbarcollapse">
                    <Nav className="ml-auto">
                    <div className="nav-item dropdown show">
                        <Dropdown style={{color: "white"}}>
                            <Dropdown.Toggle id="dropdown-basic">
                                <img className="avatar" src={avatar} alt="avatar" /><span className="ml-2">Account</span>
                            </Dropdown.Toggle> 
                            <Dropdown.Menu>
                                <Dropdown.Item style={{backgroundColor: "transparent"}} href="/profile">
                                    <i className="far fa-address-card" /> Profile</Dropdown.Item>
                                <Dropdown.Item style={{backgroundColor: "transparent"}} onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt" /> Log out</Dropdown.Item> 
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                        {/* <Nav.Link style={{color: "white"}} onClick={handleLogout} ><i className="fas fa-sign-out-alt" /> Log out</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>) : (<>
            <Navbar className="custom-nav navbar-expand-lg body_font fixed-top"
                    expand="lg">
                <NavbarBrand id="nav-brand" href="/"><i style={{fontSize: "28px"}} className="fas fa-dice-d20" /><span className="ml-3">Blockchain Wallet</span></NavbarBrand>
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