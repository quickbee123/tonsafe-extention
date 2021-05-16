import React, {Component} from 'react';
import { Card , Button } from 'react-bootstrap';
import wallet from '../api/walletAPI';
import WalletCard from './WalletCard';




class Transactions extends Component{

    constructor(props) {
        super(props);      

      }

      async componentDidMount(){

        

    }

         

render(){

    const transStyle = {

        borderTop: "1px solid #d4d4d4",
        cursor: "pointer"

     };

    const transactions = this.props.trans.map((transaction)=>{
       var value,sign=1;
        if(transaction.balance_delta>0)
        value=transaction.balance_delta;
        else{
            sign=-1;
            value=transaction.balance_delta*sign;
        }
        value = (wallet.convertFromNano(value))*sign;
        return(
            <div key={transaction.id} onClick={()=>{window.open(this.props.explorer+"/transactions/transactionDetails?id="+transaction.id, "_blank");}}  className="text-secondary p-3" style={transStyle}>
                <div className="w-100 p-2">
                
                        <div className="d-inline-block">
                        {"ID: "+transaction.id.substr(0,20)+"..."}
                        </div>
                        <div className="float-right font-weight-bold">
                        {value}
                        </div>
                    
                </div>
            </div>
        );
    });

    return(
        <>
          <div className="w-90 p-2 pt-3">
          {transactions}
          </div>
        </>
    );
}



}

export default Transactions;