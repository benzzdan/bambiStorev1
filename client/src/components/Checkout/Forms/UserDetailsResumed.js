import React from 'react'


const UserDetailsResumed = (props) => {
    return (
        <div>
            <div className="row">
                <div className="col s6">
                    <h5>INFORMACION DE ENVIO</h5>
                    {
                        props.details.map((item) => {
                            <p>{item}</p>
                        })
                    }
                </div>
                <div className="col s6">

                </div>
            </div>
        </div>
    )
}

export default UserDetailsResumed;