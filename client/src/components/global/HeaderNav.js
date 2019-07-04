import React from 'react';
import logo from '../../../assets/img/logo.png'
// import { Link } from 'react-router-dom';


const HeaderNav = () => (

    <nav className="grey lighten-5">
        <div className="nav-wrapper grey lighten-5 container">
            <a href="#" className="brand-logo">
                <img className="logoImg" src={logo} alt={"logo"} />
            </a>
            <nav>
                <div className="input-field search white">
                    <input id="search" type="search" />
                    <label className="label-icon" for="search"><i className="material-icons searchIcon">search</i></label>
                    <i className="material-icons closeIcon">close</i>
                </div>
            </nav>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {/* <li>
                    <div className="input-field search white">
                        <input id="search" type="search" />
                        <label className="label-icon" for="search"><i className="material-icons searchIcon">search</i></label>
                        <i className="material-icons closeIcon">close</i>
                    </div>
                </li> */}
                <li><a href="#">Sass</a></li>
                <li><a href="#">Components</a></li>
                <li><a href="#"><i className="material-icons closeIcon">shopping_basket</i></a></li>
            </ul>
        </div>
    </nav>
);

export default HeaderNav;