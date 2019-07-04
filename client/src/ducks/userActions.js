import axios from 'axios';


export function updatePassword(data) {
    return dispatch => {
        return axios.post('/api/users/updatePassword', data)
    }
}