import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import validateInput from '../../shared/validations/singup';
import TextFieldGroup from '../common/TextFieldGroup';



class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }

        //we need to define the onChange function ast part of our constructor
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }
    //Here we define onChange to handle our inputs 

    //we use this function to not create a function for each input [e.target.name], this part refers to the name
    //identifier that each input will need to have, that will then get the value and assign it to the sate.
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            //request to server 
            this.props.isUserExist(val).then(res => { //We need to setup isUserExist on our props
                let errors = this.state.errors;
                let invalid = this.state.invalid;
                if (res.data.user) {
                    errors[field] = 'Ya existe un usuario con ese correo';
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid })
            });
        }
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            //function to be defined and map to the props of this component, and it takes the user data from the form above, the whole state
            this.props.userRequestSignup(this.state).then(
                () => {
                    console.log('User created!');
                    setTimeout(() => {
                        console.log('Logging in user...')
                        this.props.login(this.state).then(
                            (res) => this.context.router.history.push('/'),
                            (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
                        )
                    }, 1500)
                },
                (err) => this.setState({ errors: err.response.data, isLoading: false })
            );





        }
    }



    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="row">
                    <form className="col s12" onSubmit={this.onSubmit}>
                        <div className="row">

                            <TextFieldGroup
                                error={errors.fname}
                                label="Nombre"
                                name="fname"
                                value={this.state.fname}
                                onChange={this.onChange}

                            />
                            <TextFieldGroup
                                error={errors.lname}
                                label="Apellidos"
                                name="lname"
                                value={this.state.lname}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="row">
                            <TextFieldGroup
                                error={errors.email}
                                label="Email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                col="input-field col s12"
                                checkUserExists={this.checkUserExists}

                            />
                        </div>
                        <div className="row">
                            <TextFieldGroup
                                error={errors.password}
                                label="Password"
                                name="password"
                                value={this.state.password}
                                type="password"
                                onChange={this.onChange}
                                col="input-field col s12"

                            />
                        </div>
                        <button disabled={this.state.isLoading || this.state.invalid} type="submit" className="btn-large waves-light waves-effect">Crear</button>
                    </form>
                </div>
            </div>
        );
    }
}


SignUpForm.propTypes = {
    userRequestSignup: PropTypes.func.isRequired,
    isUserExist: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
}

SignUpForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignUpForm;