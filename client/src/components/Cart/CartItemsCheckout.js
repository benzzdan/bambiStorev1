import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from '../Products/ProductImage';
import { FETCH_CART_START, FETCH_CART_END } from '../../ducks/cart';

var api = require('../../moltin.js');

function mapStateToProps(state) {
    return state;
}

class CartItemsCheckout extends Component {
    render() {

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
                            <div className="col s6 m6">
                                <ProductImage
                                    alt="item.description"
                                    products={products}
                                    product={product}
                                    size="80%"
                                />
                            </div>
                            <div className="col s6 m6">
                                <p className="productName bold" style={{fontSize: '15px'}}>
                                    {item.name}
                                </p>
                                <p className="priceCart" style={{fontSize: '15px'}}>$ {parseFloat(item.unit_price.amount / 100 * item.quantity).toFixed(2)} MXN</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(mapStateToProps)(CartItemsCheckout);
