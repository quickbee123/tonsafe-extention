import React, {Component} from 'react';
import { Row , Button } from 'react-bootstrap';
import SendTokens from './SendTokens';
import DeployWallet from './DeployWallet';
import BackButton from './BackButton';
import wallet from '../api/walletAPI';
import NetworkDropdown from './NetworkDropdown';
import network from '../api/networkAPI'



class WalletInfo extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          address: '',
          balance: '0.000',
          networkId: '0',
          deployed: false,
          modalShow: false,
          deployShow: false
          
        };

        this.updateData = this.updateData.bind(this);
        this.setModalShow = this.setModalShow.bind(this);
        this.setDeployShow = this.setDeployShow.bind(this);
        this.deployWallet = this.deployWallet.bind(this);
        

      }

      async componentDidMount(){
          
        var networkId = await wallet.getSelectedNetwork();
        console.log(networkId);
        this.setState({networkId:networkId},()=>{

          this.setState({ address :this.props.location.state.address},()=>{
            this.updateData();
            });

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

    async deployWallet(){

            
      this.setState({deployed:true});
      
    
    }

    async setNetwork(id){
      
          
       
          this.setState({networkId:id});
          await wallet.setSelectedNetwork(id);   
    
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
          <Button variant="primary" className="mx-1"  onClick={() => this.setModalShow(true)}>
            Receive
          </Button>
          <Button variant="primary" className="mx-1 px-4" onClick={() => this.setModalShow(true)}>
            Send
          </Button>
          </Row>
          <SendTokens
            show={this.state.modalShow}
            onHide={() => this.setModalShow(false)}
          />
          <DeployWallet
            show={this.state.deployShow}
            onHide={() => this.setDeployShow(false)}
            deploy={this.state.deployWallet}
          />
        </>
    );
}



}

export default WalletInfo;