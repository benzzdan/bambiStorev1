import isEmpty from 'lodash/isEmpty'
import validator from 'validator'

export default function validateInput(data) {
    let errors = {};

    //Add validations we just want the fields required 

    if (validator.isEmpty(data.email)) {
        errors.email = 'Campo requerido';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Campo requerido';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}