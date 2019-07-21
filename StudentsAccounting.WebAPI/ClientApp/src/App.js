import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { autoLogin } from './store/actions/Auth/authActions';
import Courses from './containers/Courses/Courses';
import Profile from './containers/Auth/Profile/Profile';
import Confirm from './containers/Auth/Confirm/Confirm';

class App extends Component {
    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/confirm' component={Confirm} />
                <Route path='/' exact component={Courses} />
                <Redirect to='/' />
            </Switch>
        );

        if (this.props.isLoggedIn) {
            routes = (
                <Switch>
                    <Route path='/logout' component={Logout} />
                    <Route path='/confirm' component={Confirm} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/' exact component={Courses} />
                    <Redirect to='/' />
                </Switch>
            );
        }

        return (
           <Layout>
                { routes }
           </Layout>
         )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        autoLogin: () => dispatch(autoLogin())
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));