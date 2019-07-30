import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import { Container } from 'semantic-ui-react';

const renderLinks = (links) => {
    return links.map((val, index) => {
        return <NavigationItem position={val.position} key={index} link={val.to}>{val.label}</NavigationItem>
    });
}

const navigationItems = props => {
    const links = [];
    
    if (props.isAuth && props.userRole === 'admin') {
        links.push({ to: '/admin', label: 'Admin', position: 'left' });
        links.push({ to: '/logout', label: 'Logout', position: 'right' })
    }
    if (props.isAuth && props.userRole === 'student') {
        links.push({ to: '/profile', label: 'Profile', position: 'left' });
        links.push({ to: '/logout', label: 'Logout', position: 'right' });
    }
    if (props.isAuth && props.userRole === 'No role') {
        links.push({ to: '/logout', label: 'Logout', position: 'right' });
    }
    if (!props.isAuth) {
        links.push({ to: '/auth', label: 'Authorize', position: 'right' });
    }

    return (
        <Container>
            <NavigationItem exact={true} link='/'>Home</NavigationItem>
            {renderLinks(links)}
        </Container>
    );
}

export default navigationItems;