import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../../store/actions/Profile/profileActions';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';

class Profile extends Component {
    componentDidMount() {
        this.props.getProfile(this.props.token);
    }

    render() {
        return (
            <React.Fragment>
                <ProfileInfo
                    firstName={this.props.firstName}
                    lastName={this.props.lastName}
                    age={this.props.age}
                    gender={this.props.gender}
                    photoUrl={this.props.photoUrl}
                    registered={this.props.registered}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        firstName: state.profile.firstName, 
        lastName: state.profile.lastName, 
        age: state.profile.age, 
        photoUrl: state.profile.photoUrl,
        gender: state.profile.gender,
        token: state.auth.token,
        registered: state.profile.registered
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: token => dispatch(fetchUserData(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);