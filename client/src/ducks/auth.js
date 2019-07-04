import isEmpty from 'lodash/isEmpty'


//type
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

//defines initial state 

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: //we need to define this action on authActions.js
            return { ...state, isAuthenticated: !isEmpty(action.user), user: action.user }
        default:
            return state;
    }
};
