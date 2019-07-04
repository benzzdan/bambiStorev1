import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.proxy = 'http://localhost'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// export const userRequestSignup = (userData) => (dispatch) => {
//     return axios.post('/api/users', userData);
// }

export function userRequestSignup(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    };
};
