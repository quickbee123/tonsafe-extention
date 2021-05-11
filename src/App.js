import { useEffect } from 'react';

import { Router, Route, Switch} from "../node_modules/react-router";
import Login from './components/Login';
import MasterPassword from './components/MasterPassword';
import WalletMainPage from './components/WalletMainPage';
import Header from './components/Header';
import CreateWallet from './components/CreateWallet';
import ImportWallet from './components/ImportWallet';
import ConfirmSeed from './components/ConfirmSeed';
import AddWallet from './components/AddWallet';
import WalletInfo from './components/WalletInfo';
import { Container } from 'react-bootstrap';
import { createBrowserHistory } from "../node_modules/react-router/node_modules/history";


import wallet from './api/walletAPI';


const history =createBrowserHistory();

function App() {

  useEffect(() => {

    async function checkPassSetBefore(){

      var passSet =await wallet.isPasswordSet();
      console.log(passSet);

    if(!passSet){

    console.log("pass not set");
    history.push('/set-password');
    
    
    }
    else{
    console.log("pass set");
    history.push('/login');
    }
  }
  checkPassSetBefore();
  },[]);
  
  return (
    <>
    <Header/>
    <Container>
    <Router history={history}>
            <Switch>
            <Route exact path='/wallet/wallet-info' component={WalletInfo} />
            <Route exact path='/wallet/import' component={ImportWallet} />
            <Route exact path='/wallet/create' component={CreateWallet} />
            <Route exact path='/wallet/confirm-seed' component={ConfirmSeed} />
            <Route exact path='/wallet/add' component={AddWallet} /> 
            <Route exact path='/wallet' component={WalletMainPage} /> 
            <Route exact path='/login' component={Login} /> 
            <Route exact path='/set-password' component={MasterPassword} /> 
            </Switch>
  
    </Router>
    </Container>
    </>
  );
}

export default App;
