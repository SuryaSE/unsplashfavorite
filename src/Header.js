import React from 'react';
import './App.css';
import logo from './logo.svg';
import { NavLink, Navbar, NavbarBrand, Collapse, Nav, NavItem } from 'reactstrap';
import App from './App';
import LoginUser from './LoginUser';
import Favorite from './Favorite';
import {Router, Route, browserHistory } from 'react-router';

class Header extends React.Component {
    constructor (props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        const imagesFav = [];
        localStorage.setItem("isUserLoggedIn", false);
        localStorage.setItem("favorite", JSON.stringify(imagesFav));
        browserHistory.push('/');
    }
  
    render () {
        return(
            <div className="App">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/"><img src={logo} className="img-fluid logo" alt="logo" /></NavbarBrand>
                    <Collapse isOpen={true} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#" onClick={this.logout}>Logout</NavLink>
                            </NavItem>              
                        </Nav>
                    </Collapse>
                </Navbar>
                <Router history={browserHistory}>
                    <Route path="/" component={App}></Route>
                    <Route path="/login" component={LoginUser}></Route>
                    <Route path="/favorite" component={Favorite}></Route>
                </Router>
            </div>
        )
    };
}

export default Header;
