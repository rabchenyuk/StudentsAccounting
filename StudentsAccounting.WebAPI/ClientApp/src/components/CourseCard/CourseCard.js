import React from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';

const courseCard = props => {
    return (
        <Grid.Column width={8} stretched>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {props.header}
                    </Card.Header>
                    <Button
                        disabled={!props.confirmed}
                        content={props.confirmed ? 'Subscribe' : 'Confirm email'}
                        primary
                        onClick={() => props.subscribe(props.courseId)} />
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default courseCard;