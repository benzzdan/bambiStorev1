import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import HomeHeader from '../Home/HomeHeader'

//import the action 
import { userRequestSignup } from '../../ducks/signup';
import { login } from '../../ducks/authActions';

import { isUserExist } from '../../ducks/signup/userCheck';

const style = {
    marginTop: '15vh',
    width: '50%'
}


class SignupPage extends Component {

    render() {
        //We take the function from the props and assign it to a constant, ES15
        const { userRequestSignup, isUserExist, login } = this.props;
        return (
            <div>
                <HomeHeader />
                <div className="row center-align container" style={style}>
                    <h1>Crear Cuenta</h1>
                    <SignUpForm userRequestSignup={userRequestSignup}
                        isUserExist={isUserExist}
                        login={login}
                    />
                </div>
            </div>
        );
    }
}

//We expect this SingUpPage will have it on the props too

//Now this will take it from redux itself, and the SingupForm will take it from here 
SignupPage.propTypes = {
    userRequestSignup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isUserExist: PropTypes.func.isRequired
}


export default connect(null, { userRequestSignup, isUserExist, login })(SignupPage);