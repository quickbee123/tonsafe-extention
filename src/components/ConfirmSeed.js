import React, {Component} from 'react';
import { Form , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import BackButton from './BackButton';



class ConfirmSeed extends Component{

    constructor(props) {
        super(props);
        this.state={
            input: '',
            password:''
        };

        this.handleSeedChange = this.handleSeedChange.bind(this);
        this.checkSeed = this.checkSeed.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    };

    async handleSeedChange(e){
        this.state.input = e.target.value;
        
    }
    async handlePasswordChange(e){
        this.state.password = e.target.value;
        
    }

    async checkSeed(){

        var passValid =await wallet.checkPassword(this.state.password);
        
        if (!passValid) {
            alert("Passwords incorrect");
        } else {
            if(this.state.input === this.props.location.state.seed){
                await wallet.createNewWallet(this.state.input,this.state.password);
                 this.props.history.push(
                    {
                        pathname: '/wallet',
                        state: {
                           password: this.state.password
                        }
                      }
                 );
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
        <div className="vertical-align">
         <Form className="w-100">
        <Form.Group>
          <Form.Control as="textarea" rows={3} placeholder="Enter Seed"  onChange={this.handleSeedChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Enter Master Password"  onChange={this.handlePasswordChange}/>
        </Form.Group>

        <Button variant="secondary" block onClick={this.checkSeed}>
          Create Wallet
        </Button>
        </Form>
        </div>
        </>
    );
}
}


export default ConfirmSeed;