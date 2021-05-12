import { Modal , Button, Dropdown ,ButtonGroup} from 'react-bootstrap';
import React, {Component} from 'react';
import network from '../api/networkAPI'

class NetworkDropdown extends Component{

    constructor(props) {
        super(props);
        this.changeNetwork = this.changeNetwork.bind(this);
      }

      changeNetwork(e){
        
        if(e!=this.props.networkId){
            this.props.setNetwork(e);
        }
    }
    

render(){

    const dropdownStyle = {
        
        position:"absolute",
        right: "15px"
        
      };

    return(
    
        <Dropdown onSelect={this.changeNetwork} style={dropdownStyle}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {network[this.props.networkId].name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey={network[0].id}>{network[0].name}</Dropdown.Item>
                <Dropdown.Item eventKey={network[1].id}>{network[1].name}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    
    );
}

}

export default NetworkDropdown;