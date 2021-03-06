import React, {Component} from 'react';
import { Row , Button } from 'react-bootstrap';
import SendTokens from './SendTokens';
import DeployWallet from './DeployWallet';
import BackButton from './BackButton';
import ReceiveTokens from './ReceiveTokens';
import wallet from '../api/walletAPI';
import NetworkDropdown from './NetworkDropdown';
import Transactions from './Transactions';
import network from '../api/networkAPI'
import tonAPI from '../api/tonAPI';



class WalletInfo extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          address:this.props.location.state.address,
          keys:this.props.location.state.keys,
          password:this.props.location.state.password,
          trans:[],
          transFees: '0.000',
          balance: '0.000',
          networkId: '0',
          deployFee: '0',
          deployed: false,
          modalShow: false,
          deployShow: false,
          addressShow: false,
          loading: false,
          error:''
          
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
        
        var trans = await wallet.getTransactions(network[this.state.networkId].server,this.state.address);
        this.setState({trans:trans});
       
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

         this.setState({error:''});
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

    this.setState({error:''});
    this.setState({ deployShow :val});

    }

    async setAddressShow(val){

      
      this.setState({ addressShow :val});
  
      }

    async deployWallet(){

      this.setState({loading:true});
      if(this.state.balance>=this.state.deployFee){
        
        const response = await wallet.deployWallet(network[this.state.networkId].server,this.state.keys,this.state.password);
        if(response){
          this.setState({deployed:true},()=>{
            this.setState({loading:false});
            this.setDeployShow(false);
            this.updateData();
            
          });
        }
        else{
          this.setState({error:'*Error occured'});
          this.setState({loading:false});
        }
        
      }
      else{
        this.setState({error:'*Insufficient Balance'});
        this.setState({loading:false});
      }
      
      
    
    }

    async setNetwork(id){
      
          await wallet.setSelectedNetwork(id); 
          this.setState({balance:'0.000'});
          this.setState({trans:[]});
          this.setState({networkId:id},()=>{
            
            this.updateData();
          });
          
    
    }

    async sendTransaction(address,amount,message){
      
      this.setState({loading:true});
         if((amount+this.state.transFees)<=this.state.balance){
           
           const response = await wallet.sendTransaction(network[this.state.networkId].server,amount,this.state.address,address,message,this.state.keys,this.state.password);
           if(response){    
            this.setState({loading:false});
            this.setModalShow(false);
              this.updateData();
              
          }
          else{
            this.setState({error:'*Error occured'});
            this.setState({loading:false});
          }
         }
         else{
          this.setState({error:'*Insufficient Balance'});
          this.setState({loading:false});
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
          <Row className="justify-content-center">
            <Transactions trans={this.state.trans} explorer={network[this.state.networkId].explorer}/>
          </Row>
          <SendTokens
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
            send={(address,amount,message)=>{this.sendTransaction(address,amount,message)}}
            setFee={(address,amount,message)=>{this.setTransFee(address,amount,message)}}
            fee={this.state.transFees}
            error={this.state.error}
            loading={this.state.loading}
          />
          <DeployWallet
            show={this.state.deployShow}
            onHide={() => this.setDeployShow(false)}
            deploy={()=>{this.deployWallet();}}
            deployFee={this.state.deployFee}
            error={this.state.error}
            loading={this.state.loading}
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