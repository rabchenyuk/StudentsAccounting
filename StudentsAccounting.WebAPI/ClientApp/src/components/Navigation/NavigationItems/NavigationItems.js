import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul>
        <NavigationItem exact={true} link='/'>Home</NavigationItem>
        { !props.isAuth
            ? <NavigationItem link='/auth'>Authorize</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem> }
    </ul>
);

export default navigationItems;