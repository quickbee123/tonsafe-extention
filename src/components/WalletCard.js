import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';



class WalletCard extends Component{

    constructor(props) {
        super(props);
        this.goToSelectedWallet = this.goToSelectedWallet.bind(this);
        this.deleteWallet = this.deleteWallet.bind(this);

      }

      async goToSelectedWallet(){
      
        this.props.wallet.password = this.props.password;
        this.props.history.push({
           pathname: '/wallet/wallet-info',
           state: this.props.wallet
       });
   
      
    }

    async deleteWallet(){
      
        
   this.props.delete(this.props.wallet.id);
      
    }

render(){

    return(
        <Card >
        <Card.Header as="h5" className="bg-dark text-white">Wallet {this.props.wallet.id}</Card.Header>
        <Card.Body>
            <Card.Text className="text-secondary" readOnly>
            {this.props.wallet.address}
            </Card.Text>
            <Button variant="secondary" onClick={this.goToSelectedWallet}>Go to wallet</Button>
            <Button variant="danger" className="float-right" onClick={this.deleteWallet}>Delete</Button>
        </Card.Body>
        </Card>
    );
}



}

export default WalletCard;