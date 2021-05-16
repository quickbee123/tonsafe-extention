import React, {Component} from 'react';
import { Form ,Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';


class MasterPassword extends Component{

  constructor(props) {
    super(props);
    this.state = {password   : '', confirmPassword: '' ,error:''};

    this.passSubmit = this.passSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
    

  }

  async passSubmit(){
    const { password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
        alert("Passwords don't match");
    } else {
        await wallet.setPassword(this.state.password);
        this.props.history.push('/login');
    }
    
  }  

  handlePasswordChange(e){
    this.state.password=e.target.value;
  }
  handleConfirmPassChange(e){
    this.state.confirmPassword=e.target.value;
  }

render(){

    return(
      <div className="vertical-align">
        <Form>
        <Form.Group controlId="formBasicPassword"  className="w-100">
          <Form.Control type="password" placeholder="Enter Password"  onChange={this.handlePasswordChange}/>
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword"  className="w-100">
          <Form.Control type="password" placeholder="Confirm Password"  onChange={this.handleConfirmPassChange}/>
        </Form.Group>

        <Button variant="primary" onClick={this.passSubmit}  className="w-100">
          Submit
        </Button>
        </Form>
      </div>
    );
}



}

export default MasterPassword;