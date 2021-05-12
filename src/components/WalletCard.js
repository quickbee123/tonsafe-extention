import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';



class WalletCard extends Component{

    constructor(props) {
        super(props);
        this.goToSelectedWallet = this.goToSelectedWallet.bind(this);

      }

      async goToSelectedWallet(){
      
        this.props.history.push({
           pathname: '/wallet/wallet-info',
           state: this.props.wallet
       });
   
      
    }

render(){

    return(
        <Card>
        <Card.Header as="h5" variant="secondary">Wallet {this.props.wallet.id}</Card.Header>
        <Card.Body>
            <Card.Text>
            {this.props.wallet.address}
            </Card.Text>
            <Button variant="secondary" onClick={this.goToSelectedWallet}>Go to wallet</Button>
        </Card.Body>
        </Card>
    );
}



}

export default WalletCard;