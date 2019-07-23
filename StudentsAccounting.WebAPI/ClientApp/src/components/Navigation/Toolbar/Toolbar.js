import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Menu } from 'semantic-ui-react';

const Toolbar = props => (
    <header>
        <Menu>
            <NavigationItems isAuth={props.isAuth} userRole={props.userRole} />
            {
                props.isAuth ? <div>{!props.isConfirmed ? <span>Please confirm your email</span> : null}</div>
                    : null
            }
        </Menu>
    </header>
);

export default Toolbar;