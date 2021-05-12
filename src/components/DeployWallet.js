import { Modal , Button, Form } from 'react-bootstrap';
import React, {Component} from 'react';

class DeployWallet extends Component{

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
            You need to deploy your wallet
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button variant="primary" onClick={this.props.deploy}>
                Deploy
            </Button>
        </Modal.Footer>
      </Modal>
    );
}

}

export default DeployWallet;