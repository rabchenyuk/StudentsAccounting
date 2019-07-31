import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData, fetchUserCourses, updateProfileInfo } from '../../store/actions/Profile/profileActions';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import MyCourses from '../../components/Profile/MyCourses';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import UpdateProfile from '../../components/Profile/UpdateProfile';
import { Container } from 'semantic-ui-react';

const convertDate = date => {
    const dateString = new Date(Date.parse(date)).toLocaleDateString();
    const timeString = new Date(Date.parse(date)).toLocaleTimeString();
    return dateString + ' ' + timeString;
}

class Profile extends Component {
    state = { visible: false }

    componentDidMount() {
        console.log('from mount');
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
                        render={() =>
                            <Container>
                                <ProfileInfo
                                    token={this.props.token}
                                    getProfile={this.props.getProfile}
                                    loading={this.props.profileLoading}
                                    photoUrl={this.props.photoUrl}
                                    registered={convertDate(this.props.registered)}
                                    firstName={this.props.firstName}
                                    lastName={this.props.lastName}
                                    age={this.props.age}
                                    gender={this.props.gender}
                                />
                            </Container>} />
                    <Route
                        path={this.props.match.path + '/my-courses'}
                        render={() =>
                            <Container>
                                <MyCourses token={this.props.token} />
                            </Container>} />
                    <Route
                        path={this.props.match.path + '/update-profile'}
                        render={() =>
                            <Container>
                                <UpdateProfile
                                    loading={this.props.profileLoading}
                                    update={this.props.updateProfileInfo}
                                    token={this.props.token} />
                            </Container>} />
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
        userCourses: state.profile.userCourses,
        userCoursesLoading: state.profile.userCoursesLoading,
        profileLoading: state.profile.profileLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: token => dispatch(fetchUserData(token)),
        getUserCourses: token => dispatch(fetchUserCourses(token)),
        updateProfileInfo: (token, userData) => dispatch(updateProfileInfo(token, userData))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));