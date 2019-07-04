import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types'
//access the properties and assign them to variable same name
const TextFieldGroup = ({ name, value, label, error, type, onChange, col, checkUserExists }) => {
    return (
        <div className={col} >
            <input id={name} type={type} className={classnames("validate", { 'invalid': error })} value={value} name={name} onChange={onChange} onBlur={checkUserExists} />
            <label htmlFor={name}>{label}</label>
            {error && <span className="helper-text" data-error={error} data-success="">{error}</span>}
        </div >
    )
}



//The props we are going to pass to this compoment

TextFieldGroup.propTypes = {
    name: PropTypes.string,
    col: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func //no all textfieldsgroups are going go have this
}

//Defining default values for props

TextFieldGroup.defaultProps = {
    type: 'text',
    col: 'input-field col s6'
}

export default TextFieldGroup;