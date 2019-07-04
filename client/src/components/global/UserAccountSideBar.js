
import React, { Component } from 'react';
// import TextFieldGroup from '../common/TextFieldGroup';
// import { Link } from 'react-router-dom';
// import validateInput from '../../shared/validations/login';
import { connect } from 'react-redux'
//import the login action
import { logout } from '../../ducks/authActions';
import { PropTypes } from 'prop-types';
// import 'materialize-css';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';


class UserAccountSideBar extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();

        let elem = $('#slide-out');
        let instance = M.Sidenav.getInstance(elem);
        instance.close();

    }

    render() {
        return (
            <div>
                <ul id="slide-out" className="sidenav">
                    <a onClick={this.logout.bind(this)} className="btn red">Logout</a>
                </ul>
            </div>
        )

    }
}

UserAccountSideBar.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(UserAccountSideBar);