import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import { Menu } from 'semantic-ui-react';

const Toolbar = props => (
    <header>
        <Menu>
            <NavigationItems isAuth={props.isAuth} />
        </Menu>
        {
            props.isAuth === true ? <div>{props.isConfirmed === true ? <span>Hello {props.userName}</span> : <span>Please confirm your email</span>}</div>
            : null
        }
    </header>
);

export default Toolbar;