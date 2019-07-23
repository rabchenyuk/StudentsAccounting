import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import { Menu } from 'semantic-ui-react';

const renderLinks = (links) => {
    return links.map((val, index) => {
        return <NavigationItem key={index} link={val.to}>{val.label}</NavigationItem>
    });
}

const navigationItems = props => {
    const links = [];
    
    if (props.isAuth && props.userRole === 'admin') {
        links.push({ to: '/admin', label: 'Admin' });
        links.push({ to: '/logout', label: 'Logout' })
    }
    if (props.isAuth && props.userRole === 'student') {
        links.push({ to: '/profile', label: 'Profile' });
        links.push({ to: '/logout', label: 'Logout' });
    }
    if (props.isAuth && props.userRole !== 'admin') {
        links.push({ to: '/logout', label: 'Logout' });
    }
    if (!props.isAuth) {
        links.push({ to: '/auth', label: 'Authorize' });
    }

    return (
        <Menu.Menu>
            <NavigationItem exact={true} link='/'>Home</NavigationItem>
            { renderLinks(links) }
        </Menu.Menu>
    );
}

export default navigationItems;