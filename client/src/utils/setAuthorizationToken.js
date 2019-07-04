import axios from 'axios'

/* This function is to set our token headers on each ajax request */
export default function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.baseURL = 'http://localhost:5000'
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('This is the token again: ' + token);
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}