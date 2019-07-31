import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button, Grid } from 'semantic-ui-react';
import Select from '../UI/Select/Select';

const createControl = (config, validation) => {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

const createFormControls = () => {
    return {
        firstName: createControl({
            label: 'First name',
            type: 'text',
            errorMessage: 'Field could not be empty'
        }, { required: true }),
        lastName: createControl({
            label: 'Last name',
            type: 'text',
            errorMessage: 'Field could not be empty'
        }, { required: true }),
    }
}

const createFileControl = () => {
    return {
        file: createControl({
            label: 'Choose photo',
            type: 'file',
            errorMessage: 'Not supported format. Only .jpeg, .jpg, .png'
        }, { format: true })
    }
}

const validateForm = (formControls) => {
    let isFormValid = true;

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid;
        }
    }
    return isFormValid;
}

let loadedFile;

class UpdateProfile extends Component {
    state = {
        isFormValid: false,
        formControls: createFormControls(this.props.firstName, this.props.lastName),
        fileControl: createFileControl(),
        genderValue: 'Male',
        birthValue: 1900,
        submitted: false
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

    renderFileInput = () => {
        return Object.keys(this.state.fileControl).map((controlName, index) => {
            const errorMsg = <span style={{color: 'red'}}>Not supported format. Only .jpeg, .jpg, .png</span>
            return (
                <div key={index}>
                    <input
                        type="file"
                        id="file"
                        onChange={e => this.fileChange(e, controlName)}
                    />
                    {
                        !this.state.fileControl[controlName].valid
                            && this.state.fileControl[controlName].touched ? errorMsg : null
                    }
                </div>
            );
        });
    }

    fileChange = (event, controlName) => {
        const fileControl = { ...this.state.fileControl };
        const control = { ...fileControl[controlName] };
        control.value = event.target.files[0];
        control.touched = true;
        control.valid = this.validateControl(control.value.name, control.validation);
        if (control.valid) {
            loadedFile = control.value;
        }
        fileControl[controlName] = control;
        this.setState({fileControl});
    }

    updateHandler = e => {
        e.preventDefault();
        const { firstName, lastName } = this.state.formControls;
        const userData = {
            firstName: firstName.value,
            lastName: lastName.value,
            gender: this.state.genderValue,
            age: this.state.birthValue,
            file: loadedFile
        }
        this.props.update(this.props.token, userData);
        this.setState({ submitted: true });
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validation.format) {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileExtension = value.split('.').pop();
            if (this.isInArray(allowedExtensions, fileExtension)) {
                isValid = true;
            } else {
                isValid = false;
            }
        }
        return isValid;
    }

    isInArray = (array, word) => {
        return array.indexOf(word.toLowerCase()) > -1;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        });
    }

    genderChangeHandler = e => {
        this.setState({
            genderValue: e.target.value
        })
    }

    birthChangeHandler = e => {
        this.setState({
            birthValue: e.target.value
        })
    }

    yearCreator = () => {
        const age = [];
        for (let i = 1900; i < new Date().getFullYear(); i++) {
            age.push({ key: `${i}`, text: `${i}`, value: `${i}` });
        }
        return age;
    }

    render() {
        const gender = <Select
            label='Gender'
            value={this.state.genderValue}
            onChange={this.genderChangeHandler}
            options={[
                { text: 'Male', value: 'Male' },
                { text: 'Female', value: 'Female' }
            ]}
        />

        const age = <Select
            label='Birth date'
            options={this.yearCreator()}
            value={this.state.birthValue}
            onChange={this.birthChangeHandler}
        />
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to='/profile' />;
        }

        return (
            <Grid>
                {redirect}
                <Grid.Row centered>
                    <Grid.Column width={10}>
                        <Form>
                            {this.renderInputs()}
                            {this.renderFileInput()}
                            {age}
                            {gender}
                            <Grid>
                                <Grid.Row centered>
                                    <Grid.Column stretched>
                                        <Button secondary style={{ marginTop: '1em' }} disabled={!this.state.isFormValid} onClick={this.updateHandler}>Update</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default UpdateProfile;