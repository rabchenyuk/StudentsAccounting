import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserData } from '../../store/actions/Profile/profileActions';
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
                        component={ProfileInfo} />
                    <Route
                        path={this.props.match.path + '/my-courses'}
                        component={MyCourses} />
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
        registered: state.profile.registered
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: token => dispatch(fetchUserData(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));