import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { confirm } from '../../../store/actions/Auth/authActions';

class ResetPassword extends Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        this.props.reset(params.code);
    }

    render() {
        return (
            <h1>You got the code</h1>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset: code => dispatch(reset(code))
    }
}

export default connect(null, mapDispatchToProps)(ResetPassword);