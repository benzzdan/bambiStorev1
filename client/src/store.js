import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './ducks';
import thunk from 'redux-thunk';

// import { createLogger } from 'redux-logger';


// import the ability to modify browser history within our router
import createHistory from 'history/createBrowserHistory';

// import the middleware for using react router with redux
import { routerMiddleware } from 'react-router-redux';

//Moltin configuration
import * as api from './moltin';

// create and export history for router
export const history = createHistory();


const middleware = [thunk.withExtraArgument(api), routerMiddleware(history)];

//We create this enhancers array constant that will include additional tools or extensions for Redux debug.
const enhancers = [];

// use Redux devtools if available in development
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }

    // middleware.push(createLogger());
}


//compose our middleware

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, composedEnhancers);

export default store;
