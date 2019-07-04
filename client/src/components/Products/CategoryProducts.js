import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductImage from './ProductImage';
import CategoryHeader from '../Products/CategoryHeader';



const mapStateToProps = state => {
    return state;
};

class CategoryProducts extends Component {

    render() {

        let categories = this.props.categories.categories.data;

        let ID = this.props.router.location.pathname.slice(10, 100);


        let CategoryProductsToMap = [];

        let productData = this.props.products.products.data;

        let categoryProducts;

        const currentCategory = categories.find(categories => {
            return categories.id === ID
        });

        try {
            categoryProducts = categories.find(categories => {
                return categories.id === ID
            })
        }
        catch (e) {
            categoryProducts = categories[0]
        }

        let categoryProductsIDs;

        try {
            categoryProductsIDs = categoryProducts.relationships.products.data;
            categoryProductsIDs.forEach(function (item) {
                let catprodItem = productData.find(function (product) {
                    return product.id === item.id;
                });
                CategoryProductsToMap.push(catprodItem);
            });

            let products = this.props.products.products; //to use with ProductImage component


            let arrays = [], size = 5;
            let content = [];


            while (CategoryProductsToMap.length > 0) {
                arrays.push(
                    CategoryProductsToMap.splice(0, size)
                );
            };

            if (arrays.length > 0) {
                for (let index = 0; index < arrays.length; index++) {
                    content.push(
                        <div className="row" key={index}>
                            {
                                arrays[index].map(function (catProd) {
                                    return (
                                        <div className="col m5ths s6" key={catProd.id}>
                                            <div className="card newprod" >
                                                <div className="card-image">

                                                    <a
                                                        href={'http://localhost:3000/product/' + catProd.id}
                                                        key={catProd.id}
                                                    >
                                                        <span>
                                                            <i className="material-icons favorite">
                                                                favorite_border
                                                            </i>
                                                        </span>
                                                        <ProductImage product={catProd} products={products} />

                                                    </a>

                                                </div>
                                                <div className="card-content" style={{ padding: '1rem' }}>
                                                    <a href="#" className="card-title bold" style={{ fontSize: '16px', marginBottom: 'unset' }}>

                                                        {catProd.name}
                                                    </a>
                                                    <p style={{ fontSize: '15px' }}>
                                                        {'MX $' + catProd.meta.display_price.with_tax.amount / 100}
                                                    </p>
                                                    <div className="row">
                                                        <div className="col s12" style={{ paddingLeft: '6px' }}>
                                                            <i className="material-icons">
                                                                star_border
                                                            </i>
                                                            <i className="material-icons">
                                                                star_border
                                                            </i>
                                                            <i className="material-icons">
                                                                star_border
                                                            </i>
                                                            <i className="material-icons">
                                                                star_border
                                                            </i>
                                                            <i className="material-icons">
                                                                star_border
                                                            </i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                return (
                    <div>
                        <CategoryHeader
                            catTitle={currentCategory.name}
                            imgUrl={setImage(currentCategory.name)}
                        />
                        {content}
                    </div>
                );

            } else {

                return (
                    <div>
                        <CategoryHeader
                            catTitle={currentCategory.name}
                            imgUrl={setImage(currentCategory.name)}
                        />
                        <p>No hay productos</p>
                    </div>
                );

            }





        } catch (e) {
            console.log('Error encountered!');
        }

    }

}

function setImage(catName) {
    console.log('testing');
    switch (catName) {
        case 'Hombre':
            return 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
        case 'Mujer':
            return 'https://images.unsplash.com/photo-1496817763416-2f4494189b95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2864&q=80'
        default:
            return 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
    }
}

export default connect(mapStateToProps)(CategoryProducts);