import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';



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
         {this.state.seed}
         <Button variant="primary" onClick={this.gotToConfirmSeed}>
          Next
        </Button>
        </>
    );
}
}


export default CreateWallet;