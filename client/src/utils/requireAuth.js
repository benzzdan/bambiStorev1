import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {

    class Authenticate extends Component {

        componentWillMount() {
            if (!this.props.isAuthenticated) {
                //TODO: 'Add flash message'
                this.context.router.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.context.router.history.push('/');
            }
        }

        render() {
            return (<ComposedComponent {...this.props} />); //takes all the props from the current context
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }
    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, {})(Authenticate);
}