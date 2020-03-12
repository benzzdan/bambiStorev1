import React, { Component } from 'react';
import CheckoutForm from './CheckoutForm';
// import CartHeader from '../Cart/CartHeader';
// import MobileNav from '../global/Mobile/MobileNav';
import Loading from '../global/Loading';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';



class CheckoutContainer extends Component {

    componentDidMount() {
        console.log("Current state")
        console.log(this.props.cart);
   
    }

    componentDidUpdate() {
        const {cart} = this.props;

        if (cart.fetched === true && cart.fetching === false) {
            if(!cart.cart.data.length){
                this.context.router.history.push('/');
            }
        }
    }

    render() {
        if (this.props.payments.processing === false) {
            return (
                <div>
                    <CheckoutForm />
                </div>
            );
        } 
    }
}

function mapStateToProps(state) {
    return state;
}

CheckoutContainer.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(CheckoutContainer);