import React from 'react'
import { Field, reduxForm } from 'redux-form';


const UserDetails = (props) => {
    return (
        <div className="row container" style={{ margin: 'unset', width: '80%' }}>
            <Field
                component="input"
                className="email"
                required="required"
                placeholder="Email"
                name="email"
                type="email"
                aria-label="Email"
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
            <div className="row">
                <div className="col s4"><p>Método de Entrega</p></div>
                <div className="col s4"><p>Entrega estimada</p></div>
                <div className="col s4"><p>Costo de envio</p></div>
            </div>
            <div className="row">
                <div className="col s4">
                    <p>
                        <label>
                            <input name="group1" type="radio" checked />
                            <span>Metodo1</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span>Metodo2</span>
                        </label>
                    </p>
                    <p>
                        <label>
                            <input name="group1" type="radio" />
                            <span>Metodo3</span>
                        </label>
                    </p>
                </div>
                <div className="col s4">
                    <p>
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
                    <p>
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
            <div className="row center">
                <a onClick={props.nextStep} className="btn-small teal ligthen-5">Continuar</a>
            </div>
        </div>
    )
}

export default UserDetails;