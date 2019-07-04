import React from 'react';
import ReactDOM from "react-dom";


import 'materialize-css/dist/css/materialize.min.css';

import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";

import store, { history } from './store'
// import { composeWithDevTools } from 'redux-devtools-extension';

// import thunk from "redux-thunk";
// import createHistory from 'history/createBrowserHistory';

// const history = createHistory();
// const middleware = routerMiddleware(history);

// import registerReducer from "./reducers/register";

import App from './components/App';

import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './ducks/authActions';
import jwt from 'jsonwebtoken';

// const reducers = combineReducers({ register: registerReducer, router: routerReducer });
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(middleware, thunk)));




//This is to set our authorization token always when the user logins 
//To set the headers Authorization Bearer if there is localStorage saved token 
//only if there is token will execute so we can keep our user from the start on our store 
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  const dToken = jwt.decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(dToken));
}



ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <div>
        <App />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

