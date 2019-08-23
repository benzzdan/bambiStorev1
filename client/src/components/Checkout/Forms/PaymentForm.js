import React from 'react';
import { reduxForm, Field } from 'redux-form';
import conekta from 'conekta';
import $ from 'jquery';
import { processPayment, setLoading } from '../../../conekta';
import { push } from 'react-router-redux'
import Loading from '../../global/Loading';



const onSubmit = (values, dispatch) => {
    //TODO: set the loading part...

    // tokenization of card 
    window.Conekta.setPublicKey('key_A8durRfXXqjBKMmqxypZzBA');

    let conektaSuccessResponseHandler = function (token) {
        let form = $('#card-form');
        form.append($('<input type="hidden" name="conektaTokenId" id="conektaTokenId">').val(token.id));
        localStorage.setItem('token', JSON.stringify(token.id));
        console.log('This is local storage: ' + localStorage.getItem('token'));
        console.log('This is the token: ' + token.id);
    }
    let conektaErrorResponseHandler = function (response) {
        let form = $('#card-form');
        form.find(".card-errors").text(response.message_to_purchaser);
        form.find("button").prop("disabled", false);
    }

    let form = $('#card-form');
    window.Conekta.Token.create(form, conektaSuccessResponseHandler, conektaErrorResponseHandler);

    // Cargar al cliente 

    let data = {
        "currency": "MXN",
        "customer_info": {
            "name": "Jul Ceballos",
            "phone": "+5215555555555",
            "email": "jul@conekta.io"
        },
        "line_items": [{
            "name": "Box of Cohiba S1s",
            "unit_price": 35000,
            "quantity": 1
        }],
        "charges": [{
            "payment_method": {
                "type": "card",
                "token_id": "tok_test_visa_4242"
            }
        }],
        "shipping_lines": [{
            "amount": 0,
            "carrier": "Fedex",
            "method": "Airplane",
            // "tracking_number" : "TRACK123",
            // "object" : "shipping_line",
            // "id" : "ship_lin_2fw8gEEVAKtJVq7ZV",
            // "parent_id" : "ord_2fw8gDVfe8KdxBtsd"
        }],
        "shipping_contact": {
            "receiver": "Juan Jose",
            "phone": "+5218181818181",
            "between_streets": "Morelos y Campeche",
            "address": {
                "street1": "250 Alexis St",
                "city": "Red Deer",
                "state": "Alberta",
                "postal_code": "T4N 0B8",
                "country": "ca",
                "residential": true,
                "object": "shipping_address"
            }
        }
    }

    // setLoading();

    // processPayment(data).then(
    //     // TODO: PROCESS THE RESPONSE how?????
    //     (res) => dispatch(push('/ordersummary')),
    //     (err) => console.log(err.response.data.errors),
    // )

}


const PaymentForm = ({ handleSubmit, step, nextStep, prevStep, showPaymentForm, isLoading, changeLoading }) => (
    <div>
        {
            !isLoading ?
                <form onSubmit={handleSubmit} method="POST" id="card-form" className={step === 1 && showPaymentForm ? 'show' : 'hide'}>
                    <span className="card-errors"></span>
                    <div>

                        <Field
                            component="input"
                            required="required"
                            placeholder="Nombre del Tarjetahabiente"
                            name="card_name"
                            type="text"
                            data-conekta="card[name]"
                        />
                    </div>
                    <div>

                        <Field
                            component="input"
                            required="required"
                            placeholder="Número de tarjeta de crédito"
                            name="card_number"
                            type="text"
                            data-conekta="card[number]"
                        />
                    </div>
                    <div>

                        <Field
                            component="input"
                            required="required"
                            placeholder="CVC"
                            name="card_cvc"
                            type="text"
                            data-conekta="card[cvc]"
                        />
                    </div>
                    <div className="row">
                        <p className="no-margin" style={{ paddingLeft: '2%', color: 'rgb(202, 202, 202)' }}>Fecha de expiración (MM/AAAA)</p>

                    </div>
                    <div className="row">
                        <div className="col s6">
                            <Field
                                component="input"
                                required="required"
                                placeholder="Mes"
                                name="card_exp_month"
                                type="text"
                                data-conekta="card[exp_month]"
                                label="test"
                            />
                        </div>
                        <div className="col s6">
                            <Field
                                component="input"
                                required="required"
                                placeholder="Año"
                                name="card_exp_year"
                                type="text"
                                data-conekta="card[exp_year]"
                            />
                        </div>


                    </div>
                    <button className="btn-large teal" type="submit">Crear Orden</button>
                </form>
                : <Loading />
        }

    </div>
)




export default reduxForm({
    form: 'paymentForm',
    onSubmit,
    processPayment,
    setLoading
})(PaymentForm);