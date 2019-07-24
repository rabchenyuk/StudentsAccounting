import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const profileInfo = props => {
    const file = '/UserProfilePhoto/' + props.photoUrl;
    return (
        <Card>
            <Image src={file} wrapped ui={false} />
            <Card.Content>
                <Card.Header>My profile</Card.Header>
                <Card.Meta>Joined {props.registered}</Card.Meta>
                <Card.Description>
                    <p>First name: {props.firstName}</p>
                    <p>Last name: {props.lastName}</p>
                    <p>Age: {props.age}</p>
                    <p>Gender: {props.gender}</p>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default profileInfo;