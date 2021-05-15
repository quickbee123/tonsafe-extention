import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';


class Header extends Component{

render(){

    return(
        <Navbar bg="dark" variant="dark" className="navbar-fixed-top" style={{postion:"absolute"}}>
        <Navbar.Brand >
        TON Safe
        </Navbar.Brand>
    </Navbar>
    );
}



}

export default Header;