import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, register } from '../../store/actions/Auth/authActions';
import { Button, Form, Message, Grid } from 'semantic-ui-react';
import Loader from '../../components/UI/Loader/Loader';

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {
    state = {
        formTouched: false,
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
        this.setState({ formTouched: false });
        e.preventDefault();
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value
        );
    }

    registerHandler = (e) => {
        this.setState({ formTouched: false });
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
        this.setState({ formTouched: true });
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        {this.props.loading ? <Loader /> :
                            <Form style={{ marginTop: '2em' }} error={this.props.error != null && !this.state.formTouched}>
                                {this.renderInputs()}
                                <Message
                                    error
                                    header='Someting went wrong'
                                    content={this.props.error}
                                />
                                <Grid>
                                    <Grid.Row centered>
                                        <Grid.Column stretched>
                                            <Button primary disabled={!this.state.formControls.email.valid || !this.state.formControls.password.valid} onClick={this.loginHandler}>Login</Button>
                                            <div>Don't have account? Register</div>
                                            <Button secondary disabled={!this.state.formControls.email.valid || !this.state.formControls.password.valid} onClick={this.registerHandler}>Register</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
};

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password) => dispatch(auth(email, password)),
        register: (email, password) => dispatch(register(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);