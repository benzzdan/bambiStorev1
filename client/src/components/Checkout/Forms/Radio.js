import React from 'react'
import { Field } from 'redux-form';

const Radio = (props) => {


    const renderRadioButtons = (key, index) => {
        // return (
        //     <p key={index} style={{ marginTop: 'unset' }}>
        //         <label>
        //             <input name={props.input.name} type="radio" value={props.options[key].replace(/\s/g, "").toLowerCase()} defaultChecked={props.options[key] == 'Metodo 1'}/>
        //             <span className='shippingOptions'>{props.options[key]}</span>
        //         </label>
        //     </p>
        // )
        
    };
    return (
        // Object.keys(props.options).map(renderRadioButtons)
        <label>
            <input name={props.input.name} type="radio" value={props.input.value} defaultChecked={props.input.value == 'metodo1'}/>
            <span className='shippingOptions'>{props.input.value}</span>
        </label> 
    )
}

export default Radio;