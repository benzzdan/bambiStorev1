import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import UserDetails from './UserDetails'
import UserDetailsResumed from './UserDetailsResumed'

function mapStateToProps(state) {
    return state;
}

class UserDetailsForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            step: 1,
        };
    }
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    render() {
        const { step } = this.state;
        return (
            <div className="col s6">
                <h2>Información del Cliente</h2>
                {step == 1 ? <UserDetails nextStep={this.nextStep} /> : null}
                {step == 2 ? <UserDetailsResumed details={this.props.form.CheckoutForm.values} /> : null}
            </div>
        );
    }
}

export default connect(mapStateToProps)(UserDetailsForm);