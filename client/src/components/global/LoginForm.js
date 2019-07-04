
import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { Link } from 'react-router-dom';
import validateInput from '../../shared/validations/login';
import { connect } from 'react-redux'
//import the login action
import { login } from '../../ducks/authActions';
import { PropTypes } from 'prop-types';
// import 'materialize-css';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import isEmpty from 'lodash/isEmpty';

const style = {
    marginTop: '5em'
}

const marginBottom = {
    marginBottom: '3em'
}



// function closeAllMods() {
//     let elem = $('#modal1');
//     let instance = M.Modal(getInstance(elem));
//     instance.close();
// }

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
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
            this.props.login(this.state).then(
                (res) => this.context.router.history.push('/'),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            )
        }

        setTimeout(() => {
            if (isEmpty(this.state.errors)) {
                let elem = $('#modal1');
                let instance = M.Modal.getInstance(elem);
                instance.close();
            }
            this.setState({ isLoading: false })
        }, 1500);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value, errors: {} })
    }

    closeModal() {
        let elem = $('#modal1');
        let instance = M.Modal.getInstance(elem);
        instance.close();
    }


    render() {
        const { errors, email, password, isLoading } = this.state;
        return (

            <div id="modal1" className="modal">
                <h5 className="modal-close">&#10005;</h5>
                <div className="modal-content center container">
                    <h1>Ingresa</h1>
                    {errors.form && <p className="red">{errors.form}</p>}

                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <TextFieldGroup
                                error={errors.email}
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={this.onChange}
                                col="input-field col s12"
                            />
                        </div>
                        <div className="row">
                            <TextFieldGroup
                                error={errors.password}
                                label="Password"
                                name="password"
                                value={password}
                                type="password"
                                onChange={this.onChange}
                                col="input-field col s12"

                            />
                        </div>

                        <button disabled={isLoading} type="submit" className="btn-large teal ligthen-1 waves-effect">Iniciar</button>
                    </form>
                    <a href="#" className="t-color">¿Olvidaste tu contraseña?</a>

                    <hr />
                    <div className="modal-footer container" style={style}>
                        <span className="t-color left">¿Eres Nuevo?</span>
                        <Link to={`/signup`} onClick={this.closeModal} className="btn-large teal ligthen-1 waves-effect" style={marginBottom}>Crear Cuenta</Link>
                    </div>

                </div>
            </div>
        )
    }
};


LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, { login })(LoginForm);