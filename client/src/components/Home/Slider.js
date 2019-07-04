import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import slide1 from '../../../assets/img/artesanos.jpg'
import slide2 from '../../../assets/img/artesanos1.jpg'
import slide3 from '../../../assets/img/artesanias2.jpg'



class Slider extends Component {

    componentWillMount() {
        $(document).ready(function () {
            let elems = $('.slider');
            M.Slider.init(elems, {});
        })
    }
    render() {
        return (
            <div>
                <div className="slider">
                    <ul className="slides">
                        <li>
                            <img src={slide1} alt="carusel1" />
                        </li>
                        <li>
                            <img src={slide2} alt="carusel2" />
                        </li>
                        <li>
                            <img src={slide3} alt="carusel3" />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default Slider;