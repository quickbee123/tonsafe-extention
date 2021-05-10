import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import WalletCard from './WalletCard';


class WalletMainPage extends Component{

    constructor(props) {
        super(props);

      }

render(){

    return(
        <Card>
        <Card.Header as="h5">Wallet {this.props.wallet.id}</Card.Header>
        <Card.Body>
            <Card.Text>
            With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go to wallet</Button>
        </Card.Body>
        </Card>
    );
}



}

export default WalletMainPage;