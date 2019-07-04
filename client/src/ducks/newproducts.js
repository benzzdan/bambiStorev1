//Exporting the types we are going to use with this reducer
export const FETCH_NEWPRODUCTS_START = 'newproducts/FETCH_NEWPRODUCTS_START';
//Discover why a collections end type????????
export const FETCH_NEWPRODUCTS_END = 'newproducts/FETCH_NEWPRODUCTS_END';


//We define our initial state 

const initialState = {
    fetching: false,
    fetched: false,
    newProducts: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWPRODUCTS_START:
            return { ...state, fetching: true };
        case FETCH_NEWPRODUCTS_END:
            //this defines the state to return
            return {
                ...state,
                fetching: false,
                fetched: true,
                newProducts: action.payload //updates state properties
            };
        default:
            return { ...state, fetching: false };
    }
};


export const fetchNewProductsStart = () => ({
    type: FETCH_NEWPRODUCTS_START
});

//This function just assigns the data to payload
export const fetchNewProductsEnd = data => ({
    type: FETCH_NEWPRODUCTS_END,
    payload: data
});

export const GetNewProducts = resources => (dispatch, getState, api) => {
    dispatch(fetchNewProductsStart());
    //refers to the Moltin api, gets its method Getcollections() and takes the resources context resources
    return api
        .GetNewProducts(resources)
        .then(newproducts => dispatch(fetchNewProductsEnd(newproducts)));
};
