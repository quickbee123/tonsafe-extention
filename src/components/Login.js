import React, {Component} from 'react';
import { Form ,Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';


class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {password   : '',error:''};
    
        this.checkPass = this.checkPass.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        
    
      }
    
      async checkPass(){
        const { password } = this.state;

        var passValid =await wallet.checkPassword(password);
        
        if (!passValid) {
          this.setState({error:'*Password incorrect'});
        } else {
          this.setState({error:''});
            this.props.history.push({
              pathname: '/wallet',
              state: {
                 password: password
              }
            });
            
        }
        
      }  
    
      handlePasswordChange(e){
        this.state.password=e.target.value;
      }


render(){

    return(
      <div className="vertical-align">
        <Form className="w-100">
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Enter Password"  onChange={this.handlePasswordChange}/>
        </Form.Group>

        <div className="error w-100 text-danger">
          {this.state.error}
        </div>

        <Button variant="secondary" block onClick={this.checkPass}>
          Login
        </Button>
       </Form>
      </div>
    );
}



}

export default Login;