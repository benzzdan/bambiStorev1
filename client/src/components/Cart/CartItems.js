import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from '../Products/ProductImage';
import { FETCH_CART_START, FETCH_CART_END } from '../../ducks/cart';

var api = require('../../moltin.js');

function mapStateToProps(state) {
    return state;
}

class CartItems extends Component {
    render() {
        var cart_decrement = (ID, quantity) => {
            this.props.dispatch(dispatch => {
                dispatch({ type: FETCH_CART_START });

                api
                    .UpdateCartMinus(ID, quantity)

                    .then(cart => {
                        console.log('cart quantity updated');
                        dispatch({ type: FETCH_CART_END, payload: cart, gotNew: true });
                    })

                    .catch(e => {
                        console.log(e);
                    });
            });
        };

        var cart_increment = (ID, quantity) => {
            this.props.dispatch(dispatch => {
                dispatch({ type: FETCH_CART_START });

                api
                    .UpdateCartPlus(ID, quantity)

                    .then(cart => {
                        console.log('cart quantity updated');

                        dispatch({ type: FETCH_CART_END, payload: cart, gotNew: true });
                    })

                    .catch(e => {
                        console.log(e);
                    });
            });
        };

        var cart_edit = (ID, quantity) => {
            this.props.dispatch(dispatch => {
                dispatch({ type: FETCH_CART_START });

                api
                    .UpdateCart(ID, quantity)

                    .then(cart => {
                        console.log('cart quantity updated');
                        dispatch({ type: FETCH_CART_END, payload: cart });
                    })

                    .catch(e => {
                        console.log(e);
                    });
            });
        };

        var items = this.props.cart.cart.data;

        var products = this.props.products.products;

        return (
            <div>
                {items.map(function (item) {
                    var productArray = products.data.filter(function (product) {
                        return product.id === item.product_id;
                    });

                    var product = productArray[0];

                    return (
                        <div className="row" key={item.id}>
                            <div className="col s3 m3">
                                <div className="col s8 m8">
                                    <ProductImage
                                        alt="item.description"
                                        products={products}
                                        product={product}
                                    />
                                </div>
                                <div className="col s4 m4" style={{ marginTop: '5vh' }}>
                                    <p className="productName center">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                            <div className="col s3 m3 center" style={{ marginTop: '8%' }}>
                                <button className="btn teal waves-effect"
                                    onClick={() => {
                                        cart_decrement(item.id, item.quantity);
                                    }}
                                >-</button>
                                <input className="cartQuantity grey lighten-5" type="text" style={{ 'maxWidth': '13%' }}
                                    defaultValue={item.quantity}
                                    onBlur={event => {
                                        cart_edit(item.id, event.target.value);
                                        console.log(event.target.value);
                                    }}
                                />
                                <button className="btn teal waves-effect"
                                    onClick={() => {
                                        cart_increment(item.id, item.quantity);
                                    }}
                                >+</button>
                            </div>
                            <div className="col s3 m3 center" style={{ marginTop: '8%' }}>
                                <p className="priceCart">$ {parseFloat(item.unit_price.amount / 100 * item.quantity).toFixed(2)} MXN</p>
                            </div>
                            <div className="col s3 m3 center" style={{ marginTop: '8%' }}>
                                <a href="#"
                                    onClick={() => {
                                        cart_edit(item.id, 0);
                                    }}
                                >
                                    <i className="material-icons">close</i>
                                </a>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CartItems);
