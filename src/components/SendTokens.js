import { Modal , Button, Form } from 'react-bootstrap';
import React, {Component} from 'react';

class SendTokens extends Component{

    constructor(props) {
        super(props);

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
                <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter amount"  />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control type="text" placeholder="Message" />
            </Form.Group>

            
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button variant="primary">
                Send
            </Button>
        </Modal.Footer>
      </Modal>
    );
}

}

export default SendTokens;

