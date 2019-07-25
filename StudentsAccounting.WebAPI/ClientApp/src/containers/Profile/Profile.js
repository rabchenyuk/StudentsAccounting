﻿import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData, fetchUserCourses } from '../../store/actions/Profile/profileActions';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import MyCourses from '../../components/Profile/MyCourses';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import UpdateProfile from '../../components/Profile/UpdateProfile';


class Profile extends Component {
    state = { visible: false }

    componentDidMount() {
        this.props.getProfile(this.props.token);
    }

    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    getUserCourses = (token) => {
        this.props.getUserCourses(token);
    }

    render() {
        return (
            <div>
                <MenuToggle
                    visible={this.state.visible}
                    handleShowClick={this.handleShowClick}
                    handleSidebarHide={this.handleSidebarHide}
                />
                <Switch>
                    <Route
                        exact
                        path={this.props.match.path}
                        render={() => (<ProfileInfo
                            photoUrl={this.props.photoUrl}
                            registered={this.props.registered}
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            age={this.props.age}
                            gender={this.props.gender}
                        />)} />
                    <Route
                        path={this.props.match.path + '/my-courses'}
                        render={() => <MyCourses
                            getUserCourses={() => this.getUserCourses(this.props.token)}
                            userCourses={this.props.userCourses}
                        />} />
                    <Route
                        path={this.props.match.path + '/update-profile'}
                        component={UpdateProfile} />
                </Switch>
            </div>
        );
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
        registered: state.profile.registered,
        userCourses: state.profile.userCourses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: token => dispatch(fetchUserData(token)),
        getUserCourses: token => dispatch(fetchUserCourses(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));