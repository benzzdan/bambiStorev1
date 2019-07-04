import React, { Component } from 'react';
import logo from '../../../assets/img/logo.png'

import LoginForm from './LoginForm';
import UserAccountSideBar from './UserAccountSideBar';
import 'materialize-css';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GetProducts } from '../../ducks/products';
import { GetCategories } from '../../ducks/categories';
import { GetBackend } from '../../ducks/test';
import { bindActionCreators } from 'redux';
import CartCounter from '../Cart/CartCounter';



class HeaderNav2 extends Component {



    constructor(props) {
        super(props);


        this.state = {
            activeTags: [],
        };


        $(document).ready(function () {
            let elems = $('.modal');
            M.Modal.init(elems, {});

            //sidenav

            let sidenav = document.querySelectorAll('.sidenav');
            M.Sidenav.init(sidenav, {})

            //enables the user sidenav to go to the right

            let elem = $('#slide-out');
            M.Sidenav.init(elem, {
                edge: 'right'
            });


            let drops = $('.dropdown-trigger');
            M.Dropdown.init(drops, {});


            $('.subcatmenu').hover(
                function () {

                },
                function () {
                    $('#submenu1 li').removeClass('active');
                    $('.subcatmenu').slideUp('slow');
                }
            )
        });

    }



    handler(index) {
        const array = [];

        // this.props.categories.categories.data.map((category, index) => {
        //     array.push(false);
        // });

        this.props.categories.categories.data.forEach((cat, index) => {
            array.push(false);
        })

        array[index] = !this.state.activeTags[index];
        this.setState({
            activeTags: array
        })

        $('.subcatmenu').slideDown('slow');
    }

    componentDidMount() {
        const array = []
        this.props.categories.categories.data.forEach((cat, index) => {
            array.push(false);
        })

        this.setState({
            activeTags: array
        })

    }

    render() {

        const navStyle = {
            'borderBottom': '1px solid lightgray',
            'boxShadow': 'unset'
        }

        const { categories } = this.props;
        //getting constat to check if user is authenticated
        const { isAuthenticated } = this.props.auth;

        const guestLinks = (
            <a href="#modal1" className="modal-trigger">
                <i className="material-icons closeIcon">face</i>
            </a>
        );
        const userLinks = (
            <a id="userlinks" href="#" data-target="slide-out" className="sidenav-trigger">
                <i className="material-icons closeIcon">face</i>
            </a>
        );

        return (
            <div>

                <header>

                    <nav className="grey lighten-5 nav-extended show-on-large" style={navStyle}>
                        <div className="nav-wrapper grey lighten-5 container">
                            <Link to={`/`}><img className="brand-logo logoImg" src={logo} alt={"logo"} /></Link>
                            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                            <div className="brand-logo center">
                                <div className="center row">
                                    <div className="col s12">
                                        <div className="row hide-on-small-only" id="topbarsearch">
                                            {/* <div className="input-field col s6 s12 searchbar" >
                                                <i className="material-icons prefix t-color">search</i>
                                                <input type="text" placeholder="  search" id="autocomplete-input" className="autocomplete" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="hide-on-med-and-down right">
                                <li><a href="/carrito"><i className="material-icons closeIcon">shopping_basket</i> </a></li>
                                <CartCounter />
                                <li>
                                    {/* Setup condition in case user is logged in to show wich modal */}
                                    {isAuthenticated ? userLinks : guestLinks}
                                </li>
                            </ul>

                            <LoginForm />
                            <UserAccountSideBar />

                            {/* For Mobile */}
                            <ul className="hide-on-med-and-up right">
                                <li><a href="/carrito"><i className="material-icons closeIcon">shopping_basket</i></a></li>
                            </ul>
                        </div>

                        <div className="nav-wrapper grey lighten-5 container">
                            <ul id="submenu1">
                                {categories.categories.data.map((category, index) => <li onClick={() => this.handler(index)} className={this.state.activeTags[index] ? 'active' : null} key={index} ><span>{category.name}</span></li>)}
                                {/* Pushing elements active */}

                            </ul>
                        </div>
                    </nav>
                    <ul className="sidenav" id="mobile-demo">
                        <li className="center teal lighten-2"><i className="center material-icons iconCenter">card_giftcard</i><span>Regalos</span></li>
                        <li><a href="badges.html">Categoria1</a></li>
                        <li><a href="collapsible.html">Categoria2</a></li>
                        <li><a href="mobile.html">Categoria3</a></li>
                    </ul>
                    <div className="container">
                        <div className="row subcatmenu">
                            <div className="col s12">
                                <p className="flow-text">This is a submenu</p>
                            </div>
                        </div>
                    </div>
                </header>
            </div>

        )
    }
} //end of class

HeaderNav2.propTypes = {
    auth: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
}

const mapStateToProps = ({ products, categories, auth, collections }) => ({
    auth,
    products,
    categories,
    collections
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            GetProducts,
            GetBackend,
            GetCategories
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav2);
