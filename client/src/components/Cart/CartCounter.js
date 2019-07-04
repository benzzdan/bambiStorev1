import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { GetCartItems } from '../../ducks/cart';

class CartCounter extends Component {

    componentDidMount() {
        this.props.GetCartItems();
    }

    render() {
        let quantity = 0;
        if (this.props.cart.fetched === true) {
            var items = this.props.cart.cart.data;
            quantity = items.reduce((sum, item) => sum + item.quantity, 0);//sums all items quantities ont the cart
        }
        if (quantity > 0) {
            return (
                <li><a href="#"><span className="badge teal ligthen-2">{quantity}</span></a></li>
            );
        } else {
            return (
                // TODO: Determinar que va a aparecer cuando no haya productos
                <li></li>
            );
        }

    }
}

const mapStateToProps = ({ cart }) => ({
    cart
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetCartItems
        },
        dispatch
    );


export default connect(mapStateToProps, mapDispatchToProps)(CartCounter);