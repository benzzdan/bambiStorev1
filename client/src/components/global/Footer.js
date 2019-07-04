import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <footer className="page-footer  white black-text">
                    <div className="container" style={{ maxWidth: 'unset', width: '85%' }}>
                        <div className="row">
                            <div className="col l8 s12">
                                <div className="col s4">
                                    <h6 className="black-text bold">Acerca de Nosotros</h6>
                                    <ul>
                                        <li><a href="#!" className="hover hover-3">Blog</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 2</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 3</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 4</a></li>
                                    </ul>
                                </div>
                                <div className="col s4">
                                    <h6 className="black-text bold">Soporte</h6>
                                    <ul>
                                        <li><a href="#!" className="hover hover-3">Link 1</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 2</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 3</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 4</a></li>
                                    </ul>
                                </div>
                                <div className="col s4">
                                    <h6 className="black-text bold">Anunciate con Nosotros</h6>
                                    <ul>
                                        <li><a href="#!" className="hover hover-3">Link 1</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 2</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 3</a></li>
                                        <li><a href="#!" className="hover hover-3">Link 4</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col l4 s12 center">
                                <div className="col s6">
                                    <span className="ti">
                                        <i className="ti_truck">
                                            <i className="ti_truck__cloud"></i>
                                            <i className="ti_truck-window"></i>
                                            <i className="ti_truck-sticker"></i>
                                            <i className="ti_truck-bumper"></i>
                                            <i className="ti_truck-wheel wheel-left"></i>
                                            <i className="ti_truck-wheel wheel-right"></i>
                                            <i className="ti_truck__road"></i>
                                        </i>
                                    </span>
                                </div>
                                <div className="col s6 center">
                                    <a className="" href="#!"><i className="fa fa-facebook"></i></a>


                                    <a className="" href="#!"><i className="fa fa-twitter"></i></a>



                                    <a className="" href="#!"><i className="fa fa-pinterest"></i></a>




                                    <a className="" href="#!"><i className="fa fa-instagram"></i></a>
                                    <p >
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright black-text teal lighten-5">
                        <div className="container">
                            <div className="row" style={{ marginBottom: '0px' }}>

                                <span className="left" style={{ paddingRight: '3rem' }} href="#!"><i className="fa fa-paypal"></i></span>
                                <span className="left" style={{ paddingRight: '3rem' }} href="#!"><i className="fa fa-cc-visa"></i></span>
                                <span className="left" style={{ paddingRight: '3rem' }} href="#!"><i className="fa fa-cc-mastercard"></i></span>
                                <span className="left" style={{ paddingRight: '3rem' }} href="#!"><i className="fa fa-money"></i></span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;