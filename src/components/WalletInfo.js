import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import SendTokens from './SendTokens';
import BackButton from './BackButton';
import wallet from '../api/walletAPI';



class WalletInfo extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          address: '',
          balance: '0.000',
          modalShow: false
        };

        this.updateBalance = this.updateBalance.bind(this);
        this.setModalShow = this.setModalShow.bind(this);

      }

      async componentDidMount(){
          
        this.setState({ address :this.props.location.state.address},()=>{
        this.updateBalance();
        });
        

     }

     async updateBalance(){
        
        await wallet.getBalance('https://net.ton.dev',this.state.address);

   }

   async setModalShow(val){

         this.setState({ modalShow :val});

   }

    
      
       

render(){

    return(
        <>
          <BackButton history={this.props.history}/>
          {this.state.balance}
          <Button variant="primary" onClick={() => this.setModalShow(true)}>
            Send
          </Button>

          <SendTokens
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
          />
        </>
    );
}



}

export default WalletInfo;