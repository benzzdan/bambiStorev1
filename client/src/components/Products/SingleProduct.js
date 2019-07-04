import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from './ProductImage';
import * as api from '../../moltin';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import { Facebook, Twitter, Pinterest } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

import { UPDATE_QUANTITY } from '../../ducks/product';
import {
    FETCH_CART_START,
    FETCH_CART_END,
    CART_UPDATED
} from '../../ducks/cart';

const mapStateToProps = state => {
    return state;
};


class SingleProduct extends Component {

    constructor(props) {
        super(props);


        $(document).ready(function () {
            let elems = document.querySelectorAll('select');
            M.FormSelect.init(elems, {});
        });

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        let value = e.target.value;
        console.log(value, " was selected");
        this.setState({ quantity: event.target.value });
    }

    render() {
        var products = this.props.products.products;

        var ID = this.props.router.location.pathname.slice(9, 100);

        var productArray = this.props.products.products.data.filter(function (
            product
        ) {
            return product.id === ID;
        });

        var product = productArray[0];

        var updateQuantity = quantity => {
            console.log('updating quantity');
            this.props.dispatch(dispatch => {
                dispatch({ type: UPDATE_QUANTITY, payload: quantity });
            });
        };

        var addToCart = id => {
            this.props.dispatch(dispatch => {
                api
                    .AddCart(id, this.props.product.quantity)

                    .then(cart => {
                        console.log(cart);
                        dispatch({ type: CART_UPDATED, gotNew: false });
                    })

                    .then(() => {
                        dispatch({ type: FETCH_CART_START, gotNew: false });

                        api
                            .GetCartItems()

                            .then(cart => {
                                dispatch({ type: FETCH_CART_END, payload: cart, gotNew: true });
                            });
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        };

        // var background = product.background_colour;

        function isThereACurrencyPrice() {
            try {
                return (
                    <p className="price">
                        {'$' + product.meta.display_price.with_tax.amount / 100}
                    </p>
                );
            } catch (e) {
                return <div className="price">Price not available</div>;
            }
        }

        return (
            <div>


                <div className="container" style={{ marginTop: '16vh' }}>
                    <div className="row">
                        <div className="col s6">
                            <ProductImage
                                product={product}
                                products={products}
                            />
                        </div>
                        <div className="col s6">
                            <h2>{product.name}</h2>
                            {isThereACurrencyPrice()}
                            <p>{product.description}</p>
                            <div className="row">
                                <div className="col s6">
                                    <div className="input-field col s12">
                                        <select defaultValue={this.props.product.quantity} onChange={
                                            event => { updateQuantity(event.target.value) }
                                        }>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        <label>Cantidad</label>
                                    </div>
                                </div>
                                <div className="col s6">
                                    <button style={{ marginTop: '1vh' }} className="btn-large waves-effect teal lighten-2 center" type="submit" name="action"
                                        onClick={e => {
                                            addToCart(product.id);
                                            console.log(this.props.product.quantity);
                                            e.preventDefault();
                                        }}
                                    >agregar al carrito
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <Twitter url="https://google.com" shareText="This is a test" />
                                    <Facebook url="https://google.com" shareText="This is a test" />
                                    <Pinterest url="https://google.com" shareText="This is a test" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Description of product */}
                <div className="row teal lighten-4">
                    <h1>Descripcion del Producto</h1>
                    <div className="content-ghost"> </div>
                </div>
                {/* Ends  */}
                <main role="main" id="container" className="main-container push">
                    <section className="product">
                        <div className="content">
                            <div className="product-listing">

                                {/* <div className="product-description">
                                    <form className="product" noValidate>
                                        <div className="quantity-input">
                                            <p className="hide-content">Product quantity.</p>
                                            <p className="hide-content">
                                                Change the quantity by using the buttons, or alter the
                                                input directly.
                                            </p>
                                            <button
                                                type="button"
                                                className="decrement number-button"
                                            // onClick={() => {
                                            //     updateQuantity(this.props.product.quantity - 1);
                                            // }}
                                            >
                                                <span className="hide-content">Decrement quantity</span>
                                                <span aria-hidden="true">-</span>
                                            </button>
                                            <input
                                                className="quantity"
                                                name="number"
                                                type="number"
                                                min="1"
                                                max="10"
                                                // value={this.props.product.quantity}
                                                value=""
                                                size="2"
                                            // onChange={event => {
                                            //     updateQuantity(event.target.value);
                                            // }}
                                            />
                                            <button
                                                type="button"
                                                className="increment number-button"
                                            // onClick={() => {
                                            //     updateQuantity(this.props.product.quantity + 1);
                                            // }}
                                            >
                                                <span className="hide-content">Increment quantity</span>
                                                <span aria-hidden="true">+</span>
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className="submit"
                                        // onClick={e => {
                                        //     addToCart(product.id);
                                        //     console.log(this.props.product.quantity);
                                        //     e.preventDefault();
                                        // }}
                                        >
                                            Add to cart
                  </button>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SingleProduct);
