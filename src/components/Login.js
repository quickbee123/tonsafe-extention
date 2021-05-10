import React, {Component} from 'react';
import { Form ,Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';


class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {password   : ''};
    
        this.checkPass = this.checkPass.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        
    
      }
    
      async checkPass(){
        const { password } = this.state;

        var passValid =await wallet.checkPassword(password);
        
        if (!passValid) {
            alert("Passwords incorrect");
        } else {
            this.props.history.push('/wallet');
            
        }
        
      }  
    
      handlePasswordChange(e){
        this.state.password=e.target.value;
      }


render(){

    return(
        <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password"  onChange={this.handlePasswordChange}/>
        </Form.Group>

        <Button variant="primary" onClick={this.checkPass}>
          Login
        </Button>
      </Form>
    );
}



}

export default Login;