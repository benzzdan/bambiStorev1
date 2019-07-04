//Exporting the types we are going to use with this reducer
export const FETCH_PRODUCTS_START = 'products/FETCH_PRODUCTS_START';
//Discover why a products end type????????
export const FETCH_PRODUCTS_END = 'products/FETCH_PRODUCTS_END';


//We define our initial state 

const initialState = {
    fetching: false,
    fetched: false,
    products: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_START:
            return { ...state, fetching: true };
        case FETCH_PRODUCTS_END:
            //this defines the state to return
            return {
                ...state,
                fetching: false,
                fetched: true,
                products: action.payload //updates state properties
            };
        default:
            return { ...state, fetching: false };
    }
};


export const fetchProductsStart = () => ({
    type: FETCH_PRODUCTS_START
});

//This function just assigns the data to payload
export const fetchProductsEnd = data => ({
    type: FETCH_PRODUCTS_END,
    payload: data
});

export const GetProducts = resources => (dispatch, getState, api) => {
    dispatch(fetchProductsStart());
    //refers to the Moltin api, gets its method GetProducts() and takes the resources context resources
    return api
        .GetProducts(resources)
        .then(products => dispatch(fetchProductsEnd(products)));
};
