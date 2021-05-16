import React, {Component} from 'react';
import { Row , Button } from 'react-bootstrap';
import SendTokens from './SendTokens';
import DeployWallet from './DeployWallet';
import BackButton from './BackButton';
import ReceiveTokens from './ReceiveTokens';
import wallet from '../api/walletAPI';
import NetworkDropdown from './NetworkDropdown';
import network from '../api/networkAPI'
import tonAPI from '../api/tonAPI';



class WalletInfo extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          address:this.props.location.state.address,
          keys:this.props.location.state.keys,
          password:this.props.location.state.password,
          transFees: '0.000',
          balance: '0.000',
          networkId: '0',
          deployFee: '0',
          deployed: false,
          modalShow: false,
          deployShow: false,
          addressShow: false
          
        };

        this.updateData = this.updateData.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.setDeployShow = this.setDeployShow.bind(this);
        this.setAddressShow = this.setAddressShow.bind(this);
        this.deployWallet = this.deployWallet.bind(this);
        this.sendTransaction = this.sendTransaction.bind(this);
        this.setTransFee = this.setTransFee.bind(this);
        

      }

      async componentDidMount(){
          
        var networkId = await wallet.getSelectedNetwork();
        
        this.setState({networkId:networkId},()=>{

            this.updateData();
            

        });
        
        
        

     }

     async updateData(){
        
        
        var data = await wallet.getAccountData(network[this.state.networkId].server,this.state.address);
        this.setState(
          {
            balance: data.balance,
            deployed: data.deployed
        }
        );
        
        const fee = await wallet.getDeployFee(network[this.state.networkId].server,this.state.keys,this.state.password);
        this.setState({ deployFee :fee});
        
   }

   async setModalShow(val){

         if(val){
          if(this.state.deployed)
          this.setState({ modalShow :val});
 
          else
          this.setDeployShow(val);
         }
         else
         this.setState({ modalShow :val});
         

   }

   async setDeployShow(val){

         
    this.setState({ deployShow :val});

    }

    async setAddressShow(val){

         
      this.setState({ addressShow :val});
  
      }

    async deployWallet(){

      if(this.state.balance>=this.state.deployFee){
        this.setDeployShow(false);
        await wallet.deployWallet(network[this.state.networkId].server,this.state.keys,this.state.password);
        this.setState({deployed:true},()=>{
            
          this.updateData();
        });
      }
      else{
       alert("Insufficient Balance");
      }
      
      
    
    }

    async setNetwork(id){
      
          await wallet.setSelectedNetwork(id); 
          this.setState({networkId:id},()=>{
            
            this.updateData();
          });
          
    
    }

    async sendTransaction(address,amount,message){
      
      
         if((amount+this.state.transFees)<=this.state.balance){
           this.setAddressShow(false);
            await wallet.sendTransaction(network[this.state.networkId].server,amount,this.state.address,address,message,this.state.keys,this.state.password);
            this.updateData();
         }
         else{
          alert("Insufficient Balance");
         }

}

   async setTransFee(address,amount,message){

    if(address!='' && amount!='0'){
      var fee = await wallet.calcTransactionFee(network[this.state.networkId].server,amount,this.state.address,address,message,this.state.keys,this.state.password);
    this.setState({transFees:fee});
    }
     
   }

    
      
       

render(){

  const walletStyle = {

        balance:{

           paddingTop:"70px",
           fontSize: "30px"

        }

  };

    return(
        <>
          <BackButton history={this.props.history}/>
          <NetworkDropdown networkId={this.state.networkId} setNetwork={(id)=>this.setNetwork(id)}/>
          <Row style={walletStyle.balance} className="justify-content-center font-weight-bold text-center">
          {this.state.balance}  {network[this.state.networkId].coinName}
          </Row>
          <Row className="justify-content-center">
          <Button variant="primary" className="mx-1"  onClick={() => this.setAddressShow(true)}>
            Receive
          </Button>
          <Button variant="primary" className="mx-1 px-4" onClick={() => this.setModalShow(true)}>
            Send
          </Button>
          </Row>
          <SendTokens
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            send={(address,amount,message)=>{this.sendTransaction(address,amount,message)}}
            setFee={(address,amount,message)=>{this.setTransFee(address,amount,message)}}
            fee={this.state.transFees}
          />
          <DeployWallet
            show={this.state.deployShow}
            onHide={() => this.setDeployShow(false)}
            deploy={()=>{this.deployWallet();this.setDeployShow(false);}}
            deployFee={this.state.deployFee}
          />
          <ReceiveTokens
            show={this.state.addressShow}
            onHide={() => this.setAddressShow(false)}
            address={this.state.address}
          />
        </>
    );
}



}

export default WalletInfo;