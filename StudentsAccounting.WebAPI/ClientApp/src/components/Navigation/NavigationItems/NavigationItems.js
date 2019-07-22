import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import { Menu } from 'semantic-ui-react';

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
        <Menu.Menu>
            <NavigationItem exact={true} link='/'>Home</NavigationItem>
            { links }
        </Menu.Menu>
    );
}

export default navigationItems;