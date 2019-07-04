import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as api from '../../moltin';

import { bindActionCreators } from 'redux';


import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { SUBMIT_PAYMENT, PAYMENT_COMPLETE } from '../../ducks/payments';

import { GetCartItems } from '../../ducks/cart';
import { GetProducts } from '../../ducks/products';

import CartItemsCheckout from '../Cart/CartItemsCheckout';
import UserDetailsForm from '../Checkout/Forms/UserDetailsForm'
import UserDetailsForm2 from '../Checkout/Forms/UserDetailsForm2'
import PaymentForm from '../Checkout/Forms/PaymentForm'

import ResumeDetails from '../Checkout/ResumeDetails'

import Loading from '../global/Loading';


var CheckoutTemplate = {
    customer: {
        name: 'John Doe',
        email: 'john@doe.co'
    },
    shipping_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '2nd Floor British India House',
        line_2: '15 Carliol Square',
        city: 'Newcastle Upon Tyne',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'United Kingdom'
    },
    billing_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '2nd Floor British India House',
        line_2: '15 Carliol Square',
        city: 'Newcastle Upon Tyne',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'United Kingdom'
    }
};


var PaymentTemplate = {
    gateway: 'stripe',
    method: 'purchase',
    first_name: 'John',
    last_name: 'Doe',
    number: '4242424242424242',
    month: '08',
    year: '2020',
    verification_value: '123'
};

class CheckoutForm extends Component {

    state = {
        step: 0,
        showProgress: false
    }

    //Proceed to next step 

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }


    //Previous step 

    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // Handle fields input 

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value
        })
    }

    showProgress = () => {
        const { showProgress } = this.state;
        this.setState({
            showProgress: true
        })
    };



    componentDidMount() {
        this.props.GetCartItems();
        this.props.GetProducts();

    }

    mySubmit = values => {
        CheckoutTemplate.customer.name = values.name;
        CheckoutTemplate.customer.email = values.email;

        CheckoutTemplate.billing_address.first_name = values.billing_firstname;
        CheckoutTemplate.billing_address.last_name = values.billing_lastname;
        CheckoutTemplate.billing_address.line_1 = values.billing_address_1;
        CheckoutTemplate.billing_address.line_2 = values.billing_address_2;
        CheckoutTemplate.billing_address.city = values.billing_state;
        CheckoutTemplate.billing_address.county = values.billing_postcode;
        CheckoutTemplate.billing_address.country = values.billing_country;

        CheckoutTemplate.shipping_address.first_name = values.shipping_firstname;
        CheckoutTemplate.shipping_address.last_name = values.shipping_lastname;
        CheckoutTemplate.shipping_address.line_1 = values.shipping_address_1;
        CheckoutTemplate.shipping_address.line_2 = values.shipping_address_2;
        CheckoutTemplate.shipping_address.city = values.shipping_state;
        CheckoutTemplate.shipping_address.county = values.shipping_postcode;
        CheckoutTemplate.shipping_address.country = values.shipping_country;

        this.props.dispatch(dispatch => {
            dispatch({ type: SUBMIT_PAYMENT });
        });

        api
            .Checkout(CheckoutTemplate)

            .then(order => {
                api.OrderPay(order.data.id, PaymentTemplate);
                api.DeleteCart();
            })

            .then(() => {
                this.props.dispatch(dispatch => {
                    dispatch({ type: PAYMENT_COMPLETE });
                    dispatch(push('/order-confirmation'));
                });
            })

            .catch(e => {
                console.log(e);
            })

            .catch(e => {
                console.log(e);
            })

            .catch(e => {
                console.log(e);
            });
    };

    render() {
        const { cart, products } = this.props;

        const step1 = {
            width: '50%'
        }
        const step2 = {
            width: '100%'
        }

        if (cart.fetched === true && cart.fetching === false && products.fetched === true) {

            let progressBar = (
                <div></div>
            )

            if (this.state.step == 1) {
                progressBar = (
                    <div className="determinate" style={step1}></div>
                )
            }
            if (this.state.step == 2) {
                progressBar = (
                    <div className="determinate" style={step2}></div>
                )
            }


            return (

                <div className="container">
                    <div className="row">
                        <div className="col s6">
                            <div className="progress" style={{ width: '93%' }}>
                                {progressBar}
                            </div>

                            <UserDetailsForm2 step={this.state.step} showProgress={this.showProgress} nextStep={this.nextStep} prevStep={this.prevStep} />

                            {
                                this.state.step == 1 ? <ResumeDetails /> : null
                            }
                            <hr />
                            <PaymentForm />
                            <hr />

                        </div>
                        <div className="col s6 grey lighten-4" style={{ paddingLeft: '5rem' }}>
                            <h2>Pedido</h2>
                            <div className="row">
                                <div className="col s6">
                                    <p>Articulos:</p>
                                </div>
                                <div className="col s6">
                                    <p>{parseFloat(cart.cart.meta.display_price.with_tax.amount / 100).toFixed(2)}</p>
                                </div>

                                <div className="col s6">
                                    <p>Envio:</p>
                                </div>
                                <div className="col s6">
                                    <p>{parseFloat(cart.cart.meta.display_price.with_tax.amount / 100).toFixed(2)}</p>
                                </div>

                                <div className="col s6">
                                    <p>Impuestos:</p>
                                </div>
                                <div className="col s6">
                                    <p>{parseFloat(cart.cart.meta.display_price.with_tax.amount / 100).toFixed(2)}</p>
                                </div>
                                <div className="col s6">
                                    <h4>TOTAL</h4>
                                </div>
                                <div className="col s6">
                                    <p>{parseFloat(cart.cart.meta.display_price.with_tax.amount / 100).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="row center">
                                <a href="#" className="btn teal ligthen-5 waves-effect">Checkout</a>
                            </div>
                            <div className="sep" style={{ height: '15vh' }}></div>
                            <div className="row">
                                <CartItemsCheckout />
                            </div>
                        </div>
                    </div>
                </div >
            );

        } else {
            return (
                <div>
                    <Loading />
                </div>
            )
        }
    }
}

CheckoutForm = reduxForm({
    form: 'CheckoutForm'
})(CheckoutForm);


const mapStateToProps = ({ cart, push, products }) => ({
    cart,
    push,
    products
});


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetCartItems,
            GetProducts
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);