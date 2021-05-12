import React, {Component} from 'react';
import { Row , Button } from 'react-bootstrap';
import BackButton from './BackButton';
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
          <BackButton history={this.props.history}/>
          <div className="vertical-align">
          <div className="w-100">    
          <Row>
          <Button variant="secondary" block onClick={this.importWallet} className="m-2">Import wallet</Button>
          </Row>
          <Row>
          <Button variant="secondary" block onClick={this.createWallet} className="m-2">Create wallet</Button>
          </Row>
          </div>
          </div>
        </>
    );
}
}


export default WalletMainPage;