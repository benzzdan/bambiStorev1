import axios from "axios";

export function isUserExist(identifier) {
    return dispatch => {
        return axios.get(`api/users/${identifier}`);
    }
}