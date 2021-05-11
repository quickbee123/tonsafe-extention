import {  Button} from 'react-bootstrap';
import React, {Component} from 'react';

class SendTokens extends Component{

    constructor(props) {
        super(props);
      }


    

render(){

    return(
        
        <Button onClick={this.props.history.goBack}>Back</Button>
        
    );
}

}

export default SendTokens;