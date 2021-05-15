import { Modal , Button, Form } from 'react-bootstrap';
import React, {Component} from 'react';

class SendTokens extends Component{

    constructor(props) {
        super(props);
        this.state = {
          address:'',
          amount:'0',
          message:''

        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.send = this.send.bind(this);
      }

      handleAddressChange(e){
        this.state.address=e.target.value;
        this.props.setFee(this.state.address,this.state.amount,this.state.message);
      }
      handleAmountChange(e){
        this.state.amount=e.target.value;
        this.props.setFee(this.state.address,this.state.amount,this.state.message);
      }
      handleMessageChange(e){
        this.state.message=e.target.value;
        this.props.setFee(this.state.address,this.state.amount,this.state.message);
      }
      async send(){
        
        this.props.send(this.state.address,this.state.amount,this.state.message)
      }

render(){

    return(
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Send Tokens
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter address" onChange={this.handleAddressChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter amount"  onChange={this.handleAmountChange}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Fee</Form.Label>
                <Form.Control type="text" placeholder={this.props.fee} readOnly/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" placeholder="Message" onChange={this.handleMessageChange}/>
            </Form.Group>
            

            
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button variant="primary" onClick={this.send}>
                Send
            </Button>
        </Modal.Footer>
      </Modal>
    );
}

}

export default SendTokens;

