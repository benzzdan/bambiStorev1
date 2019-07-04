import React, { Component } from 'react';
import Slider from './Slider';

class Highlights extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {


        const style = {
            'height': '400px',
            'margin': 'unset',
            'boxShadow': 'unset'
        }

        const noMargin = {
            'margin': '0px',
            'boxShadow': 'unset'
        }

        const style2 = {
            'margin': '0px',
            'height': '287px'
        }


        return (
            <div>
                <div id="highlights" className="row container">
                    <div className="col s8" style={{ padding: 'unset' }}>
                        <div className="col s4" style={{ padding: 'unset' }}>
                            <div className="card  teal lighten-5" style={style}>
                                <div className="card-content">
                                    <p className="promo-caption" style={{ 'marginBottom': '5vh' }}>
                                        Regala algo original
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </p>
                                    <br />
                                    <a className="showmore" href="#" >Ver más <i className="material-icons" style={{ top: '7px', position: 'relative', fontWeight: '700' }}>arrow_forward</i></a>

                                </div>



                            </div>
                        </div>
                        <div className="col s8">
                            <Slider />
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="row">
                            <div className="col s12">
                                <div className="card teal lighten-5" style={noMargin}>
                                    <div className="card-content">
                                        <span className="promo-caption">
                                            Artesanos Mexicanos
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <div className="card" >
                                    <div className="card-image">
                                        <img style={style2} src="https://static1.squarespace.com/static/53a75636e4b01786c9219098/t/5956e9cc20099e8019993682/1498868217113/" alt="imag1" />
                                        {/* <p className="card-title">Nuestra tienda</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Highlights;