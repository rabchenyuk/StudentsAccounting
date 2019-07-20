import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
    let links = (
        <React.Fragment>
            <NavigationItem link='/logout'>Logout</NavigationItem>
            <NavigationItem link='/profile'>Profile</NavigationItem>
        </React.Fragment>
    );

    if (!props.isAuth) {
        links = <NavigationItem link='/auth'>Authorize</NavigationItem>
    }

    return (
        <ul>
            <NavigationItem exact={true} link='/'>Home</NavigationItem>
            { links }
        </ul>
    );
}

export default navigationItems;