import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';


//importing the products reducer
import products from './products';
import product from './product';
import cart from './cart';
import categories from './categories';
import collections from './collections';
import payments from './payments';
import newproducts from './newproducts';
import backend from './test'; //this name dataFromBackEnd, is the name of the variable to use on mapToStateProps
import auth from './auth'; //this name dataFromBackEnd, is the name of the variable to use on mapToStateProps
// import registerReducer from './products';




const rootReducer = combineReducers({
    products,
    product,
    cart,
    backend,
    categories,
    collections,
    newproducts,
    payments,
    auth, //adding auth reducer to store data from our decoded token 
    // register: registerReducer,
    router: routerReducer,
    form: formReducer
});

export default rootReducer;