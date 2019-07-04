import React from 'react';
import { reduxForm, Field } from 'redux-form';


const onSubmit = values => {
    values = JSON.stringify(values);
    console.log(values);
    // alert(JSON.stringify(values))
};


const PaymentForm = ({ handleSubmit, step, nextStep, prevStep }) => (
    <div>
        <h4 className="bold">Pago</h4>
        <form onSubmit={handleSubmit}>
        </form>
    </div>
)

export default reduxForm({
    form: 'paymentForm',
    onSubmit
})(PaymentForm);