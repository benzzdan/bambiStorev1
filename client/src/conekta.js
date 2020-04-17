import axios from 'axios'
import {
    SET_LOADING
} from '../src/ducks/checkout';

if (process.env.NODE_ENV) {
    axios.defaults.baseURL = process.env.GCP_URL
} else {
    axios.defaults.baseURL = 'http://localhost:5000'
}

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


// export function processPayment(data) {

//     return axios.post('/api/processPayment', data).then(res => {
//         console.log('test from conekta.js')
//         console.log(res);
//     })
// }

export function processPayment(data) {
    return axios.post('/api/processPayment', data).then(res => {
        console.log('test from conekta.js')
        const orderData = res.data;
        localStorage.setItem('orderID', orderData.id);
        localStorage.setItem('orderAmount', orderData.amount / 100);
        localStorage.setItem('orderAuthCode', orderData.charges.data[0].payment_method.auth_code);
    });
}