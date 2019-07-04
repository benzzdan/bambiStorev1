import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomeHeader from '../Home/HomeHeader';
import Footer from '../global/Footer'
import CartItems from './CartItems';
import { Link } from 'react-router-dom';


import { GetProducts } from '../../ducks/products';
import { GetCartItems } from '../../ducks/cart';
import { GetCategories } from '../../ducks/categories';
import Loading from '../global/Loading';


class Cart extends Component {
    componentDidMount() {
        this.props.GetCategories();
        this.props.GetProducts();
        this.props.GetCartItems();
    }

    render() {
        const { cart, products, categories } = this.props;

        if (categories.fetched === true && categories.categories !== null) {
            if (cart.fetched === true && cart.fetching === false && products.fetched === true) {
                if (cart.cart.data[0]) {
                    var subtotal = '$' + parseFloat(cart.cart.meta.display_price.with_tax.amount / 100).toFixed(2);
                    return (
                        <div>
                            <HomeHeader />
                            <div className="container">
                                <div className="row">
                                    <h1 className="center">Carrito</h1>
                                </div>
                                <div className="row center">
                                    <div className="col s3"><p>Producto</p></div>
                                    <div className="col s3"><p>Cantidad</p></div>
                                    <div className="col s3"><p>Precio</p></div>
                                    <div className="col s3"><p></p></div>
                                </div>
                                <div className="sep grey lighten-4"></div>
                                <CartItems />
                                <div className="sep grey lighten-4"></div>
                                <div className="row">
                                    <p className="right" style={{ fontSize: '27px' }}><b>Subtotal:</b> {subtotal}</p>
                                </div>
                                <div className="sep grey lighten-4"></div>
                                <br />
                                <div className="row" style={{ margin: '0 30vh' }}>
                                    <Link to="/checkout" className="btn-large btn-flat teal ligthen-1 waves-effect right" style={{ fontSize: '27px' }}>
                                        <i className="material-icons lock">lock</i>
                                        Comprar
                                    </Link>
                                </div>
                            </div>
                            <br />
                            <div className="card-panel grey lighten-4"></div>
                            <Footer />
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <HomeHeader />
                            <h1>No hay nada en tu carrito.</h1>
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        <HomeHeader />
                        <Loading />
                    </div>
                )
            }

        } else {
            return (
                <div>

                </div>
            )
        }
    }
}



const mapStateToProps = ({ products, cart, categories }) => ({
    products,
    cart,
    categories
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetProducts,
            GetCartItems,
            GetCategories
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Cart);