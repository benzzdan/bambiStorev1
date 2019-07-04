import React, { Component } from 'react';
import { connect } from 'react-redux'

import { PropTypes } from 'prop-types';


import TextFieldGroup from '../common/TextFieldGroup';

//action 
import { updatePassword } from '../../ducks/userActions'


class UserAccountSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pass1: '',
            pass2: '',
            isLoading: false,
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    isValid() {
        //TODO: validate that both passwords are the same
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.updatePassword(this.state);
        //TODO: define route for /api/users/updatePassword
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value, errors: {} })
    }

    render() {
        const { errors, pass2, pass1, isLoading } = this.state;

        return (
            <div>
                <h1>Ajustes de Cuenta</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <TextFieldGroup
                            error={errors.identifier}
                            label="Password"
                            name="pass1"
                            type="password"
                            value={pass1}
                            onChange={this.onChange}
                            col="input-field col s12"
                        />
                    </div>
                    <div className="row">
                        <TextFieldGroup
                            error={errors.password}
                            label="Confirm Password"
                            name="pass2"
                            value={pass2}
                            type="password"
                            onChange={this.onChange}
                            col="input-field col s12"

                        />
                    </div>

                    <br />
                    <button disabled={isLoading} type="submit" className="btn-large waves-light waves-effect">Cambiar</button>
                </form>
            </div>
        );
    }
}

UserAccountSettings.propTypes = {
    updatePassword: PropTypes.func.isRequired
}

export default connect(null, { updatePassword })(UserAccountSettings);

