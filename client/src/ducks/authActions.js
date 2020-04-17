import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken'
//importing the type of SET_CURRENT_USER to be used on our actions
import { SET_CURRENT_USER } from './auth';


if (process.env.NODE_ENV) {
    axios.defaults.baseURL = process.env.GCP_URL
} else {
    axios.defaults.baseURL = 'http://localhost:5000'
}
// axios.defaults.proxy = 'http://localhost'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json'
// export const userRequestSignup = (userData) => (dispatch) => {
//     return axios.post('/api/users', userData);
// }

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user //this is what you send to the reducer user: user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser(jwt.decode({})))
    }
}

export function login(data) {
    return dispatch => {
        return axios.post('/api/auth', data).then(res => {
            const token = res.data.token;
            //saving token to local storage
            localStorage.setItem('jwtToken', token);
            //the following will set the token to the headers
            setAuthorizationToken(token);
            //we need to decode token to store it on our redux store
            //add a reducer
            //then we just dispatch the action
            dispatch(setCurrentUser(jwt.decode(token)))
        });
    };
};
