import React from 'react';

const Section = (props) => {
    return (
        <div>
            <div className="row">
                <div className="card-panel grey lighten-4">
                    <h2>{props.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default Section;