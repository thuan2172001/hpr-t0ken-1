import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {TradingPage} from "./page/TradingPage/TradingPage";
import {GetCoinPage} from "./page/GetCoinPage/GetCoinPage";
import {TransactionPage} from './page/TransactionPage/TransactionPage';  
import LoginPage from './page/LoginPage/LoginPage';
import {NavBar} from './component/nav-bar/navbar'
import { isUserLoggedIn } from './actions';
import RegisterPage from './page/RegisterPage/RegisterPage';
import ProfilePage from './page/ProfilePage/ProfilePage';


function App() {
  const dispatch = useDispatch();
  const user = useSelector((state:RootStateOrAny) => state.user);
  useEffect(() => {
    if (!user.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, user.authenticate]);
  return (
    <div className="App">
      <Router>
        {user.authenticate && 
        <>
          <NavBar />
          <div className="pt-5"></div>
        </>}
        <Switch>
          <Route path='/' exact component={TradingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/get-coin' component={GetCoinPage} />
          <Route path='/transaction' component={TransactionPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
