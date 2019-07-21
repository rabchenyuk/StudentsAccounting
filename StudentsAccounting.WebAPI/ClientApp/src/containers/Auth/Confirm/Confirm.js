import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { confirm } from '../../../store/actions/Auth/authActions';

class Confirm extends Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        this.props.confirm(params.token);
    }

    render() {
        return (
            <h1>Confirmation successfull</h1>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        confirm: token => dispatch(confirm(token))
    }
}

export default connect(null, mapDispatchToProps)(Confirm);