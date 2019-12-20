import React from 'react';
import { reduxForm, Field } from 'redux-form';
import conekta from 'conekta';
import $ from 'jquery';
import { processPayment, setLoading } from '../../../conekta';
import { push } from 'react-router-redux'
import Loading from '../../global/Loading';


const PaymentForm = ({ handleSubmit, step, nextStep, prevStep, showPaymentForm, isLoading, changeLoading }) => (
    <div> {!isLoading ? <form onSubmit={handleSubmit} method="POST" id="card-form" className={step === 1 && showPaymentForm ? 'show' : 'hide'}>
        <span className="card-errors"> </span>
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
                data-conekta="card[number]" />
        </div>
        <div>

            <Field
                component="input"
                required="required"
                placeholder="CVC"
                name="card_cvc"
                type="text"
                data-conekta="card[cvc]" />
        </div>
        <div className="row">
            <p className="no-margin" style={{ paddingLeft: '2%', color: 'rgb(202, 202, 202)' }}> Fecha de expiración(MM / AAAA) </p>

        </div>
        <div className="row">
            <div className="col s6" >
                <Field
                    component="input"
                    required="required"
                    placeholder="Mes"
                    name="card_exp_month"
                    type="text"
                    size="2"
                    data-conekta="card[exp_month]"
                    label="test" />
            </div>
            <div className="col s6">
                <Field
                    component="input"
                    required="required"
                    placeholder="Año"
                    size="4"
                    name="card_exp_year"
                    type="text"
                    data-conekta="card[exp_year]" />
            </div>


        </div>

        <button className="btn-large teal" type="submit"> Crear Orden </button>

    </form > : <Loading />}

    </div>
)




export default reduxForm({ form: 'paymentForm', processPayment, setLoading })(PaymentForm);