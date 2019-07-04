import React from 'react';
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'



let ResumeDetails = ({ email, nombre, apellido, cp, address1, envio }) => (

    <div>
        <div className="row" style={{ padding: '1rem' }}>
            <div className="col s6">
                <b><p className="bold">ENVIAR A:</p></b>
                <p>{nombre + ' ' + apellido}</p>
                <p>{email}</p>
                <p>{address1 + ' ' + cp}</p>
            </div>
            <div className="col s6">
                <b><p className="bold">METODO ENTREGA:</p></b>
                {envio == 'metodo1' ?
                    <div>
                        <p>Metodo 1</p>
                        <p>1-2 dias habiles</p>
                    </div>
                    : null}
                {envio == 'metodo2' ?
                    <div>
                        <p>Metodo 2</p>
                        <p>3-4 dias habiles</p>
                    </div>
                    : null}
                {envio == 'metodo3' ?
                    <div>
                        <p>Metodo 3</p>
                        <p>5-6 dias habiles</p>
                    </div>
                    : null}
            </div>
        </div>
    </div>
)

const selector = formValueSelector('myTestForm')

ResumeDetails = connect(
    state => {
        const { email, nombre, apellido, address1, cp, envio } = selector(state, 'email', 'nombre', 'apellido', 'address1', 'cp', 'envio')
        return {
            email,
            nombre,
            apellido,
            address1,
            cp,
            envio
        }
    }
)(ResumeDetails)

export default ResumeDetails;