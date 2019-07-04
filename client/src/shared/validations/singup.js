import isEmpty from 'lodash/isEmpty'
import validator from 'validator'

function validateInput(data) {
    let errors = {};

    //validation rules 
    if (validator.isEmpty(data.email)) {
        errors.email = 'Campo requerido';
    }
    if (validator.isEmpty(data.fname)) {
        errors.fname = 'Campo requerido';
    }
    if (validator.isEmpty(data.lname)) {
        errors.lname = 'Campo requerido';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Campo requerido';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export default validateInput
