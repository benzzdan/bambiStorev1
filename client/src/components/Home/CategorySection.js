import React from 'react';


const CategorySection = props => {
    const containerStyle = {
        'border': '2px dashed #80cbc4',
        'marginTop': '20vh'
    }

    const superMargin = {
        'margin': '-4.5rem -1.5rem -0.5rem 1.5rem'
    }
    const superMarginRight = {
        'margin': '-4.5rem 1.5rem -0.5rem -1.5rem'
    }

    if (props.imgSide === 'left') {
        return (
            < div className="container" style={containerStyle} >
                <div className="row">
                    <div className="col s7">
                        <div style={superMargin}>
                            <a href="#">
                                <div className="card">
                                    <div className="card-image">
                                        <img src={props.imgSrc} alt="test" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="col s5 center">
                        <h3>{props.titulo}</h3>
                        <p className="flow-text" style={{ paddingRight: '1vh' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, tempora? Enim assumenda porro dicta pariatur distinctio ipsa.
                            </p>
                        <div className="row center">
                            <a href={'category/' + props.id} className="btn-flat teal ligthen-1 waves-effect">
                                Ver más
                            </a>
                        </div>
                    </div>
                </div>

            </div >
        );
    } else {
        return (
            < div className="container" style={containerStyle} >
                <div className="row">
                    <div className="col s5 center">
                        <h3>{props.titulo}</h3>
                        <p className="flow-text" style={{ paddingRight: '1vh' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, tempora? Enim assumenda porro dicta pariatur distinctio ipsa.
                        </p>
                        <div className="row center">
                            <a href={'category/' + props.id} className="btn-flat teal ligthen-1 waves-effect">
                                Ver más
                            </a>
                        </div>
                    </div>
                    <div className="col s7">
                        <div style={superMarginRight}>
                            <a>
                                <div className="card">
                                    <div className="card-image">
                                        <img src={props.imgSrc} alt="test" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div >
        )
    }

}

export default CategorySection;