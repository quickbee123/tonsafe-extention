import { Modal , Button, Form } from 'react-bootstrap';
import React, {Component} from 'react';

class DeployWallet extends Component{

    constructor(props) {
        super(props);

      }

    

render(){
  var load = '';
  if(this.props.loading){
    load='button--loading';
  }
    return(
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deploy
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You need to deploy your wallet first.<br/>
            Fee &#8776; {this.props.deployFee} 
        </Modal.Body>
        <div className="error w-100 text-danger">
          {this.props.error}
        </div>
        <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
        <Button variant="primary" className={load} disabled={this.props.loading} onClick={this.props.deploy} style={{position:"relative"}}>
        <span class="button__text">Deploy</span>
            </Button>
        </Modal.Footer>
      </Modal>
    );
}

}

export default DeployWallet;