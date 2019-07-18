import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => (
    <header>
        <nav>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;