import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = props => (
    <header>
        <nav>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
        {
            props.isAuth === true ? <div>{props.isConfirmed === true ? <span>Hello {props.userName}</span> : <span>Please confirm your email</span>}</div>
            : null
        }
    </header>
);

export default Toolbar;