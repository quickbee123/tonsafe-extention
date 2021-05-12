import React, {Component} from 'react';
import { Form , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import BackButton from './BackButton';



class CreateWallet extends Component{

    constructor(props) {
        super(props);
        this.state={
            seed: ''
        }
        this.gotToConfirmSeed = this.gotToConfirmSeed.bind(this);
    };

    async componentDidMount(){

        const seed = await wallet.getNewSeed();
        this.setState({seed:seed});

    }

    async gotToConfirmSeed(){
        this.props.history.push({
            pathname: '/wallet/confirm-seed',
            state: this.state
        });
    }

render(){

    return(
        <>
        <BackButton history={this.props.history}/>
        <div className="vertical-align">
         <Form className="w-100">
        <Form.Group>
          <Form.Control as="textarea" rows={3}  placeholder={this.state.seed} readOnly/>
        </Form.Group>

        <Button variant="secondary" block onClick={this.gotToConfirmSeed}>
          Next
        </Button>
         </Form>
         
        </div>
        </>
    );
}
}


export default CreateWallet;