import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomeHeader from '../Home/HomeHeader';
import Footer from '../global/Footer';
import Loading from '../global/Loading';

import Highlights from './Highlights';
import StoreFeatures from './StoreFeatures';
import NewProducts from './NewProducts';
import CategorySection from './CategorySection';


import { GetProducts } from '../../ducks/products';
import { GetCollections } from '../../ducks/collections';
import { GetCategories } from '../../ducks/categories';
import { GetBackend } from '../../ducks/test';




//Here we are using lifecycles so, we need this component as a class type component instead of an arrow funcion for jsx

class Home extends Component {
  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component did mount')
    const { categories, collections, products } = this.props;

    if (!products.fetched) {
      this.props.GetProducts();
    }
    if (!categories.fetched) {
      this.props.GetCategories();
    }

    if (!collections.fetched) {
      this.props.GetCollections();
    }


  }


  render() {

    const { categories, collections, products } = this.props;

    if (categories.categories !== null && collections.collections !== null && products.products !== null) {
      return (
        <div>
          <HomeHeader />
          <div className="main">
            < Highlights />
            < NewProducts />
            < CategorySection
              imgSide='left'
              titulo='Algo para él'
              imgSrc='https://images.unsplash.com/photo-1451680350250-2ae7d6e00f5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
              id='7548d79e-3cef-4c8c-8659-1db0a52d83be'
            />
            < CategorySection
              imgSide='right'
              titulo='Algo para ella'
              imgSrc='https://images.unsplash.com/photo-1498597531364-5944cd5388f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              id='d093495b-2b08-461b-bdc8-ae17c08cd454'
            />
            < StoreFeatures />
            < Footer />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {/* <HomeHeader /> */}
          <Loading />
        </div>
      )
    }
  }
}


const mapStateToProps = ({ products, backend, categories, collections }) => ({
  products,
  categories,
  collections,
  data: backend.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GetProducts,
      GetBackend,
      GetCategories,
      GetCollections
    },
    dispatch
  );


export default connect(mapStateToProps, mapDispatchToProps)(Home);
