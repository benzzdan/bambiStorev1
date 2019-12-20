import React from 'react';
import {
    reduxForm,
    Field
} from 'redux-form';
import isEmpty from 'lodash/isEmpty';

import Radio from './Radio'




const validate = values => {
    const errors = {}
    if (!values.nombre) {
        errors.nombre = 'Campo requerido.'
    }
    if (!values.apellido) {
        errors.apellido = 'Campo requerido.'
    }
    if (!values.address1) {
        errors.address1 = 'Campo requerido.'
    }
    if (!values.ciudad) {
        errors.ciudad = 'Campo requerido.'
    }
    if (!values.cp) {
        errors.cp = 'Campo requerido.'
    }
    if (!values.email) {
        errors.email = 'Campo requerido'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Direccion de correo invalida.'
    }

    //Delivery validation 
    if (!values.envio) {
        errors.envio = "Campo requerido"
    }

    if (isEmpty(errors)) {
        console.log("No hay error!");

    } else {
        console.log("Errors!");
        console.log(errors.envio)
    }
    return errors
}

const onSubmit = ({ values }) => {
    console.log("This are the values for the user form")
    // console.log(values)
    // values = JSON.stringify(values);
    // console.log(values);
};

const renderField = ({ input, defaultValue, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <input {...input} placeholder={label} type={type} value={defaultValue} className={error && touched ? 'invalid' : null} />
            {touched && ((error && <span className="red-text">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const UserDetailsForm2 = ({ handleSubmit, step, nextStep, prevStep, showProgress, submitting, pristine, invalid }) => (
    < div >
        <h4 className="bold">Envio  <span><a onClick={prevStep} className={step == 0 ? 'hide' : 'default-anchor'}>Cambiar</a></span></h4>
        <form onSubmit={handleSubmit} className={step != 0 ? 'hide' : null} style={{ width: '93%' }}>

            <Field name="email" type="email" component={renderField} label="Email" />

            <div className="row">
                <div className="col s6">
                    <Field name="nombre" type="text" component={renderField} label="Nombre" />

                </div>
                <div className="col s6">
                    <Field name="apellido" type="text" component={renderField} label="Apellido" />

                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <Field name="address1" type="text" component={renderField} label="Dirección" />

                </div>
            </div>
            <div className="row">
                <div className="col s4">
                    <Field name="cp" type="text" component={renderField} label="C.P" />
                </div>
                <div className="col s4">
                    <Field name="ciudad" type="text" component={renderField} label="Ciudad" />
                </div>
                {/* TODO: Hacer multiselect de estado */}
                <div className="col s4">
                    <Field name="estado" type="text" component={renderField} label="Estado" />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <Field name="tel" type="text" component={renderField} label="Telefono" />

                </div>

                <div className="col s6">
                    <Field name="pais" type="text"  component={renderField} label="Pais" />
                </div>
            </div>
            <div className="row" style={{ marginBottom: 'unset' }}>
                <div className="col s4"><p className="bold">Método de Entrega</p></div>
                <div className="col s4"><p className="bold">Entrega estimada</p></div>
                <div className="col s4"><p className="bold">Costo de envio</p></div>
            </div>
            <div className="row">
                <div className="col s4">
                    <p style={{ marginTop: 'unset' }}>
                        <label><Field name="envio" component="input" type="radio" value="metodo1" /> <span className="shippingOptions">Metodo 1</span></label><br />
                    </p>
                    <p>
                        <label><Field name="envio" component="input" type="radio" value="metodo2" /> <span className="shippingOptions">Metodo 2</span></label>
                    </p>
                    <p>
                        <label><Field name="envio" component="input" type="radio" value="metodo3" /> <span className="shippingOptions">Metodo 3</span></label>
                    </p>
                </div>
                <div className="col s4">
                    <p style={{ marginTop: 'unset' }}>
                        1-2 dias
                                    </p>
                    <p>
                        2-3 dias
                                    </p>
                    <p>
                        4-5 dias
                                    </p>
                </div>
                <div className="col s4">
                    <p style={{ marginTop: 'unset' }}>
                        MXN 150.00
                                    </p>
                    <p>
                        MXN 180.00
                                    </p>
                    <p>
                        MXN 200.00
                                    </p>
                </div>
            </div>
            {/* <button onClick={(e) => { nextStep(); showProgress(); }} className="btn-large teal" type="submit">Continuar</button> */}
            {/* <button onClick={(e) => { showProgress(); }} className="btn-large t9eal" type="submit">Continuar</button> */}
            <button id="the-button" onClick={(e) => { invalid ? null : nextStep(); showProgress(); }} type="submit" disabled={pristine || submitting}>Submit</button>
        </form>
    </div >
)


export default reduxForm({
    form: 'myTestForm',
    onSubmit,
    validate,
    destroyOnUnmount: false
})(UserDetailsForm2);