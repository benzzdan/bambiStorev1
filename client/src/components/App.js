import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home/home';
import SingupPage from './Signup/SignupPage'
import LoginPage from './Login/LoginPage'
import Cart from './Cart/Cart'
import CheckoutContainer from './Checkout/CheckoutContainer'
import AccountInfoPage from './Account/AccountInfoPage'
import SingleProductContainer from './Products/SingleProductContainer'
import CategoryProductsContainer from './Products/CategoryProductsContainer'
import OrderSummary from './Checkout/OrderSummary'
//applying authentication at the client route level
import requireAuth from '../utils/requireAuth'


// import Nav from './Navigation'


// import '../App.css';
import '../index.css';




const App = props => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SingupPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/carrito" component={Cart} />
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/accountInfo" component={requireAuth(AccountInfoPage)} />
      <Route path="/product/:id" component={SingleProductContainer} />
      <Route path="/category/:name" component={CategoryProductsContainer} />
      <Route path="/ordersummary" component={OrderSummary} />
    </Switch>
  </div>
)

export default App;
