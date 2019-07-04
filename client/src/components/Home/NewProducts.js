import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from '../Products/ProductImage'

function mapStateToProps(state) {
    return state;
}


class NewProducts extends Component {

    render() {

        var NewProductsToMap = [];

        var collections = this.props.collections.collections.data;

        var productData = this.props.products.products.data;

        let NewProducts;

        try {
            NewProducts = collections.find(collections => {
                return collections.slug === 'nuevos_productos';
            });
        }
        catch (e) {
            NewProducts = collections[0];
        }

        let NewProductsIDs;

        try {
            NewProductsIDs = NewProducts.relationships.products.data;

            NewProductsIDs.forEach(function (newprodref) {
                var NewProductsItem = productData.find(function (product) {
                    return product.id === newprodref.id;
                });
                NewProductsToMap.push(NewProductsItem);
            });

            var products = this.props.products.products;

            return (
                <div>
                    <div className="card-panel grey lighten-4" >
                        <h2 className="center">Productos Nuevos</h2>
                        <div className="row container" style={{ width: '85%' }}>

                            {
                                NewProductsToMap.map(function (new_product) {


                                    return (
                                        <div className="col m5ths s6" key={new_product.id}>
                                            <div className="card newprod" >
                                                <div className="card-image">
                                                    {/* <img src="https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" /> */}
                                                    <div>
                                                        <a
                                                            href={'product/' + new_product.id}
                                                            key={new_product.id}
                                                        >
                                                            <ProductImage product={new_product} products={products} />
                                                        </a>
                                                    </div>
                                                    {/* <span className="card-title">{new_product.data.name}</span> */}
                                                </div>
                                            </div>
                                        </div>



                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            );
        } catch (e) {

        }

    }
}

export default connect(mapStateToProps)(NewProducts)