import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HomeHeader from '../Home/HomeHeader';
import Footer from '../global/Footer';
import SingleProduct from './SingleProduct';
// import CartHeader from '../Cart/CartHeader';
// import ProductHeader from './ProductHeader';
// import Loading from '../global/Loading';
// import MobileNav from '../global/Mobile/MobileNav';

import { GetProducts } from '../../ducks/products';
import { GetCategories } from '../../ducks/categories';
import Loading from '../global/Loading';



class Product extends Component {
    componentDidMount() {
        const { fetched, categories } = this.props;

        if (!fetched) {
            this.props.GetProducts();
        }
        if (!categories.fetched) {
            this.props.GetCategories();
        }

    }


    render() {
        const { products, categories } = this.props;

        if (products && categories.categories !== null) {
            return (
                <div>
                    {/* <MobileNav /> */}
                    <HomeHeader />
                    <SingleProduct />
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
                    {/* <MobileNav /> */}
                    {/* <CartHeader /> */}
                    <Loading />
                </div>
            );
        }

    }

}

const mapStateToProps = ({ products: { fetched, products }, categories }) => ({
    fetched,
    products,
    categories
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetProducts,
            GetCategories,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
