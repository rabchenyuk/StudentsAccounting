import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';

const courseCard = props => {
    return (
        <Grid.Column width={6} style={{ paddingBottom: '3em', paddingTop: '5em' }}>
            <Card centered>
                <Card.Content textAlign='center'>
                    <Card.Header textAlign='center'>
                        {props.header}
                    </Card.Header>
                    <div>
                        {props.desc}
                    </div>
                    {
                        props.match.path !== '/profile/my-courses' ? null :
                            <div>
                                {props.date}
                            </div>
                    }
                    <NavLink to={'/course/' + props.courseId}>Watch</NavLink>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

export default withRouter(courseCard);