import React, {Component} from 'react';
import { Navbar } from 'react-bootstrap';


class Header extends Component{

render(){

    return(
        <Navbar bg="dark" variant="dark" style={{postion:"absolute"}}>
        <Navbar.Brand >
        TON Safe
        </Navbar.Brand>
    </Navbar>
    );
}



}

export default Header;