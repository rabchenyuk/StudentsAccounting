import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'semantic-ui-react';
import { forgotPassword } from '../../../store/actions/Auth/authActions';

class RecoverPassword extends Component {
    state = {
        email: ''
    };

    submit = () => {
        this.props.forgotPassword(this.state.email);
    }

    handleChange = e => {
        this.setState({ email: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Input onChange={this.handleChange} />
                <Button secondary onClick={this.submit}>Submit</Button>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        forgotPassword: (email) => dispatch(forgotPassword(email))
    }
}

export default connect(null, mapDispatchToProps)(RecoverPassword);