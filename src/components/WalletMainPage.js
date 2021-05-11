import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import WalletCard from './WalletCard';


class WalletMainPage extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          wallets: []
        };

        this.goToAddWallet = this.goToAddWallet.bind(this);
        

      }

      async componentDidMount(){

        const wallets = await wallet.fetchWallets();
        this.setState({wallets:wallets});

    }

    async goToAddWallet(){
        
        this.props.history.push('/wallet/add');
        
      }  

         

render(){

    const list = this.state.wallets.map((wallet)=>{
        return(
            <div key={wallet.id}>
                <WalletCard wallet={wallet} history={this.props.history} />
            </div>
        );
    });

    return(
        <>
          {list}
          <Button variant="primary" block onClick={this.goToAddWallet}>Add wallet</Button>
        </>
    );
}



}

export default WalletMainPage;