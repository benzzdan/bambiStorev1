//type

export const GET_BACKEND = 'GET_BACKEND';

//defines initial state 

const initialState = {
    data: null,
    checking: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_BACKEND:
            return { ...state, data: action.payload, checking: true }
        default:
            return state;
    }
};


//export the action 
export const getBackend = data => ({
    type: GET_BACKEND,
    payload: data
});


export const GetBackend = () => dispatch => {
    fetch('/backend')
        .then(response => response.json()) //transforms response to get prettier output to json
        .then(data => dispatch({
            type: GET_BACKEND,
            payload: data.express
        }))
};