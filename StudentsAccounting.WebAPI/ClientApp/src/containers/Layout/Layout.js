import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isConfirmed={this.props.isConfirmed}
                    isAuth={this.props.isAuth}
                    userName={this.props.userName}
                />
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        isConfirmed: state.auth.emailConfirmed,
        userName: state.auth.userName
    }
}

export default connect(mapStateToProps)(Layout);