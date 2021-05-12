import { Modal , Button, Form } from 'react-bootstrap';
import React, {Component} from 'react';

class ReceiveTokens extends Component{

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
          <Modal.Title id="contained-modal-title-vcenter ">
            Receive Tokens
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-muted">
            {this.props.address.substr(0,25 )+"...."}<Button variant="success" onClick={() => {navigator.clipboard.writeText(this.props.address);this.props.onHide()}}>copy</Button>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

}

export default ReceiveTokens;