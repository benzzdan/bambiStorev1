import React from 'react';
import Filter from '../Products/ProductFilter';

const CategoryHeader = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <div className="catImage" style={{ backgroundImage: "url(" + props.imgUrl + ")" }}>
                        <div className="catTitle">
                            {props.catTitle}
                        </div>
                    </div>
                </div>
            </div>
            <Filter />
        </div>
    )
}

export default CategoryHeader;  