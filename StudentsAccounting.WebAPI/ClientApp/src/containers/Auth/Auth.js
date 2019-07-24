import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, register } from '../../store/actions/Auth/authActions';
import { Button, Form, Message } from 'semantic-ui-react';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {
    state = { 
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Password must be at least 6 symbols',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    }

    loginHandler = (e) => {
        e.preventDefault();
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value
        );
    }

    registerHandler = (e) => {
        e.preventDefault();
        this.props.register(
            this.state.formControls.email.value,
            this.state.formControls.password.value
        );
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Form.Input
                    key={controlName + index}
                    label={control.label}
                    type={control.type}
                    onChange={event => this.onChangeHandler(event, controlName)}
                    error={!this.state.formControls[controlName].valid
                            && this.state.formControls[controlName].touched ? this.state.formControls[controlName].errorMessage : null}
                />
            );
        });
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({ formControls });
    }

    render() {
        return (
            <Form error={this.props.error != null}>
                {this.renderInputs()}
                <Message
                    error
                    header='Someting went wrong'
                    content={this.props.error}
                />
                <Button disabled={!this.state.formControls.email.valid || !this.state.formControls.password.valid} onClick={this.loginHandler}>Login</Button>
                <div>Don't have account? Register</div>
                <Button onClick={this.registerHandler}>Register</Button>
            </Form>
        );
    }
};

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password) => dispatch(auth(email, password)),
        register: (email, password) => dispatch(register(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);