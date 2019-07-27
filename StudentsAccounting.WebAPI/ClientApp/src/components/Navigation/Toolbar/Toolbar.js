import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Menu } from 'semantic-ui-react';

const toolbar = props => (
    <Menu size='large'>
        <NavigationItems isAuth={props.isAuth} userRole={props.userRole} />
        {
            props.isAuth ? <div>{!props.isConfirmed ? <span>Please confirm your email</span> : null}</div>
                : null
        }
    </Menu>
);

export default toolbar;