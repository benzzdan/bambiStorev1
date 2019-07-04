import React from 'react'
import { Field } from 'redux-form';

const Radio = (props) => {
    if (props && props.input && props.options) {
        const renderRadioButtons = (key, index) => {
            return (
                <p key={index}>
                    <label>
                        <input name={props.input.name} type="radio" value={props.options[key]} />
                        <span className='shippingOptions'>{props.options[key]}</span>
                    </label>
                </p>
            )
        };
        return (
            Object.keys(props.options).map(renderRadioButtons)
        )
    }
}

export default Radio;