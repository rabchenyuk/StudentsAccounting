import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Icon, Menu, Sidebar } from 'semantic-ui-react';

const menuToggle = props => {
    return (
        <React.Fragment>
            <Button disabled={props.visible} onClick={props.handleShowClick}>
                <Icon name='server' />
            </Button>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={props.handleSidebarHide}
                vertical
                visible={props.visible}>
                <Link onClick={props.handleSidebarHide} className='item' to={props.match.path + '/my-courses'}>
                    <Icon name='tasks' />
                    My courses
                </Link>
                <Link onClick={props.handleSidebarHide} className='item' to={props.match.path + '/update-profile'}>
                    <Icon name='edit' />
                    Update profile
                </Link>
            </Sidebar>
        </React.Fragment>
    );
}

export default withRouter(menuToggle);