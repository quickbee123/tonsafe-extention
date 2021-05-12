import {  Button} from 'react-bootstrap';
import React, {Component} from 'react';

class SendTokens extends Component{

    constructor(props) {
        super(props);
      }


    

render(){
    const backStyle = {
        display: "inline-block",
        padding: "1px 15px 5px 15px",
        position: "absolute",
        fontSize: "20px",
        backgroundColor: "#6c757d",
        color: "white",
        borderRadius: "50%",
        cursor: "pointer"
      };

    return(
        
        <div onClick={this.props.history.goBack} style={backStyle}>&#8249;</div>
        
    );
}

}

export default SendTokens;