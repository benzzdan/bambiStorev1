import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import * as api from '../../moltin';
import PaypalExpressBtn from 'react-paypal-express-checkout';

import isEmpty from 'lodash/isEmpty';

import { bindActionCreators } from 'redux';

import { processPayment, setLoading } from '../../conekta';

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

import $ from 'jquery';


class CheckoutForm extends Component {

    state = {
        step: 0,
        showProgress: false,
        showPaymentForm: false,
        showPaypalButton: false,
        isLoading: false,
        processPaymentErrors: false,
        cardErrors: null,
        cartProducts: []
    }


    showPaymentForm = () => {
        this.setState({
            showPaymentForm: true,
            showPaypalButton: false
        });
    }

    hidePaymentForm = () => {
        this.setState({
            showPaymentForm: false,
            showPaypalButton: true
        });
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

    //TODO: set the loading part for the charge
    handleSubmit = (values, dispatch) => {

        console.log('Values from CheckoutForm: ');

        console.log(values);
        const e = this
        this.setState({ cardErrors: null, isLoading: true });

        //tokenizar tarjeta
        window.Conekta.setPublicKey('key_A8durRfXXqjBKMmqxypZzBA');

        let conektaSuccessResponseHandler = function (token) {
            let form = $('#card-form');
            form.append($('<input type="hidden" name="conektaTokenId" id="conektaTokenId">').val(token.id));
            localStorage.setItem('token', token.id);
            console.log('This is local storage: ' + localStorage.getItem('token'));
            console.log('This is the token: ' + token.id);
        }
        let conektaErrorResponseHandler = function (response) {
            let form = $('#card-form');
            form.find(".card-errors").text(response.message_to_purchaser);
            form.find("button").prop("disabled", false);
            if (response) {
                console.log(response);
                e.setState({ cardErrors: response.message_to_purchaser })
            }
        }

        let form = $('#card-form');
        window.Conekta.Token.create(form, conektaSuccessResponseHandler, conektaErrorResponseHandler)

        setTimeout(() => {
            if (this.state.cardErrors != null) {
                this.setState({ isLoading: false })
                console.log("Estos son los errores al querer tokenizar")
                console.log(this.state.cardErrors)
            }
        }, 2000);

        // Testing with fake data
        const { tel, email, address1, ciudad, estado, cp, pais, envio, cart, products } = this.props;

        let cartItems = cart.cart.data;
        let storeProducts = products.products;

        let productArray = [];
        let filteredItems = [];

        cartItems.map(function (item) {
            productArray = storeProducts.data.filter(function (product) {
                // return product.id === item.product_id;
                if (product.id === item.product_id) {
                    filteredItems.push(
                        {
                            "name": product.name,
                            "unit_price": product.price[0].amount,
                            "quantity": item.quantity
                        }
                    )
                }
            });
        });

        const token = localStorage.getItem('token');

        let data = {
            "currency": "MXN",
            "customer_info": {
                "name": values.card_name,
                "phone": tel,
                "email": email
            },
            "line_items": filteredItems,
            "charges": [{
                "payment_method": {
                    "type": "card",
                    "token_id": token
                }
            }],
            // TODO: Figure this part out at last
            "shipping_lines": [{
                "amount": 0,
                "carrier": envio,
                "method": "Airplane",
                // "tracking_number" : "TRACK123",
                // "object" : "shipping_line",
                // "id" : "ship_lin_2fw8gEEVAKtJVq7ZV",
                // "parent_id" : "ord_2fw8gDVfe8KdxBtsd"
            }],
            "shipping_contact": {
                "receiver": values.card_name,
                "phone": tel,
                "between_streets": "No aplica",
                "address": {
                    "street1": address1,
                    "city": ciudad,
                    "state": estado,
                    "postal_code": cp,
                    "country": "MX",
                    "residential": true,
                    "object": "shipping_address"
                }
            }
        }

        const customerId = 'a1856486-bfa3-403a-8ea2-b1ed920b7939'


        //TODO: Moltin clear cart after order completed and process order too.

        setTimeout(() => {
            if (this.state.cardErrors == null) {
                let CheckoutTemplate = {
                    customer: {
                        name: 'Test Customer',
                        email: 'ttest@gmail.com'
                    },
                    billing_address: {
                        first_name: 'John',
                        last_name: 'Benson',
                        line_1: '123 Sunny St',
                        line_2: 'Sunnycreek',
                        county: 'California',
                        postcode: 'CA94040',
                        country: 'US'
                    },
                    shipping_address: {
                        first_name: 'John',
                        last_name: 'Benson',
                        line_1: '123 Sunny St',
                        line_2: 'Sunnycreek',
                        county: 'California',
                        postcode: 'CA94040',
                        country: 'US'
                    }
                };

                const customer = {
                    email: 'john@moltin.com',
                    name: 'John Doe'
                }

                const billing_address = {
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
                }

                const shipping_address = {
                    shipping_address: {
                        first_name: 'John',
                        last_name: 'Doe',
                        line_1: '2nd Floor British India House',
                        line_2: '15 Carliol Square',
                        city: 'Newcastle Upon Tyne',
                        postcode: 'NE1 6UF',
                        county: 'Tyne & Wear',
                        country: 'United Kingdom'
                    }
                }

                //TODO: define if condition if paypal or credit card 

                let PaymentTemplate = {
                    gateway: 'manual',
                    method: 'authorize',
                    status: 'complete'
                };

                /*
                    Performs the checkout which generates an order object that is used to fulfill the request in Moltin.
                */
                api.Checkout(CheckoutTemplate).then(
                    order => {
                        console.log('this is the order: ' + order);
                        api.OrderPay(order.data.id, PaymentTemplate);
                        api.UpdateOrder(order.data.id, {
                            data: {
                                "status": "complete"
                            }
                        })
                        api.DeleteCart();
                    }
                )
                    .catch(e => {
                        console.log('Something happened!');
                        console.log(e);
                    })

                    .catch(e => {
                        console.log(e);
                    })

                    .catch(e => {
                        console.log(e);
                    })



                processPayment(data).then(res => {
                    console.log('This is a success response, redirecting to order summary');
                    dispatch(push('/ordersummary'));
                }).catch(err => {
                    console.log('Valio chitzuuu');
                    console.log(err.response);
                    this.setState({ processPaymentErrors: true, isLoading: false })
                })
            }
        }, 1500);
    }

    render() {

        //TODO: fix and test paypal

        const paypal_client = {
            sandbox: 'H8X4X2D5PE6SS',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        const { cart, products } = this.props;

        const step1 = {
            width: '50%'
        }
        const step2 = {
            width: '100%'
        }

        if (cart.fetched === true && cart.fetching === false && products.fetched === true && this.state.isLoading != true) {

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

            const { processPaymentErrors } = this.state;

            return (
                <div className="container">
                    <div className="row">
                        <div className={processPaymentErrors ? 'row' : 'hide'} id="alert_box">
                            <div className="col s12 m10">
                                <div className="card-content white-text red">
                                    <p>Hubo un error, intenta de nuevo mas tarde.</p>
                                </div>
                            </div>
                            <div className="col s12 m2">
                                <i onClick={this.closeErrorBox} className="fa fa-times icon_style white-text" id="alert_close" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="progress" style={{ width: '93%' }}>
                                {progressBar}
                            </div>

                            <UserDetailsForm2 step={this.state.step} showProgress={this.showProgress} nextStep={this.nextStep} prevStep={this.prevStep} />

                            {
                                this.state.step == 1 ? <ResumeDetails /> : null
                            }
                            <hr />
                            <h4 className="bold">Pago</h4>
                            <p className="red">{this.state.cardErrors}</p>
                            <label className={this.state.step === 1 ? 'show' : 'hide'}>
                                <Field onClick={this.hidePaymentForm} name="payment_method" component="input" type="radio" value="paypal" />
                                <span className="shippingOptions">Paypal</span>
                            </label>
                            <br />
                            <div className={this.state.showPaypalButton && this.state.step === 1 ? 'show' : 'hide'}>
                                <PaypalExpressBtn client={paypal_client} currency={'USD'} total={1.00} />
                            </div>

                            <p style={{ marginTop: 'unset' }} className={this.state.step === 1 ? 'show' : 'hide'}>
                                <label><Field onClick={this.showPaymentForm} name="payment_method" component="input" type="radio" value="tarjeta" /> <span className="shippingOptions">Tarjeta credito/debito</span></label><br />
                            </p>
                            <PaymentForm onSubmit={this.handleSubmit} step={this.state.step} showPaymentForm={this.state.showPaymentForm} isLoading={this.state.isLoading} changeLoading={this.changeLoading} />
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


const mapStateToProps = state => ({
    cart: state.cart,
    push: state.push,
    products: state.products,
    tel: formValueSelector("myTestForm")(state, "tel"),
    email: formValueSelector("myTestForm")(state, "email"),
    address1: formValueSelector("myTestForm")(state, "address1"),
    ciudad: formValueSelector("myTestForm")(state, "ciudad"),
    cp: formValueSelector("myTestForm")(state, "cp"),
    estado: formValueSelector("myTestForm")(state, "estado"),
    pais: formValueSelector("myTestForm")(state, "pais"),
    envio: formValueSelector("myTestForm")(state, "envio"),
});


const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetCartItems,
            GetProducts,
            processPayment
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);