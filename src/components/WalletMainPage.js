import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import WalletCard from './WalletCard';



class WalletMainPage extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          wallets: [],
          network: ''
        };

        this.goToAddWallet = this.goToAddWallet.bind(this);
        this.deleteWallet = this.deleteWallet.bind(this);
        this.getWallets = this.getWallets.bind(this);
        

      }

      async componentDidMount(){

        
        this.getWallets();

    }

    async getWallets(){
        
      var wallets = await wallet.fetchWallets();
        
      this.setState({wallets:wallets});
      
    } 

    async goToAddWallet(){
        
        this.props.history.push('/wallet/add');
        
      }  
    async deleteWallet(id){
      
      await wallet.deleteWallet(id);
      this.setState({wallets:[]},()=>{
        this.getWallets();
      });
    }    

         

render(){

    const list = this.state.wallets.map((wallet)=>{
        return(
            <div key={wallet.id} className="py-2">
                <WalletCard wallet={wallet} delete={(id)=>{this.deleteWallet(id);}} history={this.props.history} network={this.state.network} password={this.props.location.state.password}/>
            </div>
        );
    });

    return(
        <>
          <Button variant="info" block onClick={this.goToAddWallet} className="mb-2">Add wallet</Button>
          <div>
          {list}
          </div>
        </>
    );
}



}

export default WalletMainPage;