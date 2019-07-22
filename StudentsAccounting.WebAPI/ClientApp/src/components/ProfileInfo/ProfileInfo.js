import React from 'react';

const profileInfo = props => {
    const file = '/UserProfilePhoto/' + props.photoUrl;
    return (
        <React.Fragment>
            <p>First name: {props.firstName}</p>
            <p>Last name: {props.lastName}</p>
            <p>Age: {props.age}</p>
            <p>Gender: {props.gender}</p>
            <img src={file} alt='its me' />
        </React.Fragment>
    );
}

export default profileInfo;