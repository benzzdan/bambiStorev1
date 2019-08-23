export const SET_LOADING = 'SET_LOADING';

const initialState = {
    isLoading: false
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: //we need to define this action on authActions.js
            return { ...state, isLoading: true }
        default:
            return state;
    }
};
