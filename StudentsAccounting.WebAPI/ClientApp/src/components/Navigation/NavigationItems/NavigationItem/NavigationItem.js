import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const navigationItem = props => (
    <Menu.Item position={props.position}>
        <NavLink exact={props.exact} activeStyle={{ borderBottom: '3px solid #fff', borderRadius: '2px' }} to={props.link}>
                {props.children}
        </NavLink>
    </Menu.Item>
);

export default navigationItem;