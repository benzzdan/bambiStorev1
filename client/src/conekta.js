import axios from 'axios'
import {
    SET_LOADING
} from '../src/ducks/checkout';

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.post['Content-Type'] = 'application/json'


export function setLoadingState() {
    return {
        type: SET_LOADING
    }
}

export function setLoading() {
    return dispatch => {
        dispatch(setLoadingState());
    }
}


export function processPayment(data) {

    return axios.post('/api/processPayment', data).then(res => {
        console.log('test from conekta.js')
        console.log(res);
    })
}