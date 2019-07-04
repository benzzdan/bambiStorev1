//This is to test an api request protection
import React, { Component } from 'react';

import UserAccountSettings from './UserAccountSettings'

class AccountInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="container">
                <UserAccountSettings />
            </div>

        );
    }
}

export default AccountInfoPage;