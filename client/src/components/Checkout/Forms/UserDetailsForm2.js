import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Radio from './Radio'


const values = {}

const onSubmit = values => {
    values = JSON.stringify(values);
    console.log(values);
    // alert(JSON.stringify(values))
};




const UserDetailsForm2 = ({ handleSubmit, step, nextStep, prevStep, showProgress }) => (
    < div >
        <h4 className="bold">Envio  <span><a onClick={prevStep} className={step == 0 ? 'hide' : 'default-anchor'}>Cambiar</a></span></h4>
        <form onSubmit={handleSubmit} className={step != 0 ? 'hide' : null} style={{ width: '93%' }}>
            <Field
                component="input"
                name="email"
                type="email"
                aria-label="Email"
                placeholder="Email"
            />
            <div className="row">
                <div className="col s6">
                    <Field
                        component="input"
                        className="nombre"
                        required="required"
                        placeholder="Nombre"
                        name="nombre"
                        type="text"
                        aria-label="Nombre"
                    />
                </div>
                <div className="col s6">
                    <Field
                        component="input"
                        className="apellido"
                        required="required"
                        placeholder="Apellido"
                        name="apellido"
                        type="text"
                        aria-label="Apellido"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <Field
                        component="input"
                        className="address1"
                        required="required"
                        placeholder="Dirección"
                        name="address1"
                        type="text"
                        aria-label="Dirección"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <Field
                        component="input"
                        className="cp"
                        required="required"
                        placeholder="C.P."
                        name="cp"
                        type="text"
                        aria-label="Codigo Postal"
                    />
                </div>
                <div className="col s6">
                    <Field
                        component="input"
                        className="ciudad"
                        required="required"
                        placeholder="Ciudad"
                        name="ciudad"
                        type="text"
                        aria-label="Ciudad"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col s6">
                    <Field
                        component="input"
                        className="tel"
                        required="required"
                        placeholder="Telefono"
                        name="tel"
                        type="text"
                        aria-label="Telefono"
                    />
                </div>
                <div className="col s6">
                    <Field
                        component="input"
                        className="pais"
                        required="required"
                        placeholder="Pais"
                        name="pais"
                        type="text"
                        aria-label="Pais"
                    />
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
            <button onClick={(e) => { nextStep(); showProgress(); }} className="btn-large teal" type="submit">Continuar</button>
        </form>
    </div >
)


export default reduxForm({
    form: 'myTestForm',
    onSubmit
})(UserDetailsForm2);