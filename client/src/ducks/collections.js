//Exporting the types we are going to use with this reducer
export const FETCH_COLLECTIONS_START = 'collections/FETCH_COLLECTIONS_START';
//Discover why a collections end type????????
export const FETCH_COLLECTIONS_END = 'collections/FETCH_COLLECTIONS_END';


//We define our initial state 

const initialState = {
    fetching: false,
    fetched: false,
    collections: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START:
            return { ...state, fetching: true };
        case FETCH_COLLECTIONS_END:
            //this defines the state to return
            return {
                ...state,
                fetching: false,
                fetched: true,
                collections: action.payload //updates state properties
            };
        default:
            return { ...state, fetching: false };
    }
};


export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START
});

//This function just assigns the data to payload
export const fetchCollectionsEnd = data => ({
    type: FETCH_COLLECTIONS_END,
    payload: data
});

export const GetCollections = resources => (dispatch, getState, api) => {
    dispatch(fetchCollectionsStart());
    //refers to the Moltin api, gets its method Getcollections() and takes the resources context resources
    return api
        .GetCollections(resources)
        .then(collections => dispatch(fetchCollectionsEnd(collections)));
};
