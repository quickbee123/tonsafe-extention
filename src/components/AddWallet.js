import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import WalletCard from './WalletCard';


class WalletMainPage extends Component{

    constructor(props) {
        super(props);
        this.importWallet = this.importWallet.bind(this);
        this.createWallet = this.createWallet.bind(this);
    };

    async importWallet(){
        
        this.props.history.push('/wallet/import');
        
    }

    async createWallet(){
        
        this.props.history.push('/wallet/create');
        
    }  


render(){

    return(
        <>
          <Button variant="primary" block onClick={this.importWallet}>Import wallet</Button>
          <Button variant="primary" block onClick={this.createWallet}>Create wallet</Button>
        </>
    );
}
}


export default WalletMainPage;