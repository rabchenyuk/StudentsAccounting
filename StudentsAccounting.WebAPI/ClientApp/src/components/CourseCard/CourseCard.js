import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Button, Grid } from 'semantic-ui-react';

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
                        props.isAuth && props.userRole !== 'admin' && !props.match.path + '/update-profile' ?
                            <Button
                                disabled={!props.confirmed}
                                content={props.confirmed ? 'Subscribe' : 'Confirm email'}
                                primary
                                onClick={() => props.subscribe(props.courseId)} /> : null
                    }
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default withRouter(courseCard);