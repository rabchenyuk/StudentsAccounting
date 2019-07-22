import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const navigationItem = props => (
    <Menu.Item>
        <NavLink exact={props.exact} activeStyle={{ color: 'red' }} to={props.link}>{props.children}</NavLink>
    </Menu.Item>
);

export default navigationItem;