import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/Auth/authActions';

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
            this.state.formControls.password.value,
            true
        );
    }

    registerHandler = (e) => {
        e.preventDefault();
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index} 
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)} />
            )
        })
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
        formControls[controlName] = control
        this.setState({formControls});
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    { this.renderInputs() }
                    <button onClick={this.loginHandler}>Login</button>
                    <button onClick={this.registerHandler}>Register</button>
                </form>
            </React.Fragment>
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
        auth: (email, password, isLoggedIn) => dispatch(auth(email, password, isLoggedIn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);