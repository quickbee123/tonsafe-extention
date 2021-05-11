import React, {Component} from 'react';
import { Form , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import BackButton from './BackButton';



class ImportWallet extends Component{

    constructor(props) {
        super(props);
        this.state={
            input: '',
            password:''
        };

        this.handleSeedChange = this.handleSeedChange.bind(this);
        this.importWallet = this.importWallet.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    };

    async handleSeedChange(e){
        this.state.input = e.target.value;
        
    }
    async handlePasswordChange(e){
        this.state.password = e.target.value;
        
    }

    async importWallet(){

        var passValid =await wallet.checkPassword(this.state.password);
        
        if (!passValid) {
            alert("Passwords incorrect");
        } else {
            var response =await wallet.createNewWallet(this.state.input,this.state.password);
            if(response){             
                 this.props.history.push('/wallet');
             }
             else{
                 alert("Seed incorrect");
             }
            
        }
        
        
    }

render(){

    return(
        <>
        <BackButton history={this.props.history}/>
         <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Enter Seed"  onChange={this.handleSeedChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" placeholder="Enter Master Password"  onChange={this.handlePasswordChange}/>
        </Form.Group>

        <Button variant="primary" onClick={this.importWallet}>
          Create Wallet
        </Button>
      </Form>
        </>
    );
}
}


export default ImportWallet;